import { app, Menu, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import fs from 'fs';
import path from 'path';
import { Client as FireBusinessApiClient, Components, Paths } from './types/fire-business-api';
import sha256 from 'sha256';
import { OpenAPIClientAxios, Server } from 'openapi-client-axios';
import Store from 'electron-store';
import updater from 'update-electron-app';
import isDev from 'electron-is-dev';
import Bugsnag from '@bugsnag/js'
const { XMLParser } = require('fast-xml-parser');
import { version } from './../package.json';
import reader from 'xlsx';
import os from 'os';
import { createDiffieHellmanGroup } from 'crypto';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix : "@",
  parseTagValue: false
});

Bugsnag.start({
  apiKey: '9ba5a7c5d6ad414a1134ee105de42e52',
  appVersion: version
})

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let accessToken: string = "";
let accessTokenExpiryDate: Date;
let mainWindow : BrowserWindow;
let _fireBusinessApiClient : FireBusinessApiClient;
let mAccounts : Components.Schemas.Account[] = [];
let fileType: string = "";
let numPayments:number = 0;
let valuePayments:number = 0;
let sourceAccountIBAN:string = "";
let fileCurrency:string = "";
let payments: any = [];
let batchName: string = "";
let errors:string[] = [];

updater();

const store = new Store({
  migrations: {
    '1.0.0': store => {
      store.set('version', '1.0.0');
    }
  },
  defaults: {
    clientId: '',
    clientKey: '',
    refreshToken: '',
    betaAgreementDate: null,
    testClientId: '',
    testClientKey: '',
    testRefreshToken: '',
    useTest: false
  }
});



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.

  mainWindow = new BrowserWindow({
    height: 500,
    width: 1000,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      // In a sandbox
      sandbox: true,
      // Allow Ipc to/from sandbox
      contextIsolation: true,
      // enableRemoteModule: false, // turn off remote
      // No insecure code.
      webSecurity: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  Bugsnag.notify("Loaded");
  
  // Open the DevTools.
  if (isDev) { setTimeout(() => { mainWindow.webContents.openDevTools();}, 5000); }

};



// Create the Application's main menu
const template: any = [{
  label: "Fire Report Utility",
  submenu: [
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { type: "separator" },
      { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}
];

if (process.platform == 'darwin') {
  // MacOS needs to have the copy/paste menu items, otherwise Cmd-C/Cmd-V don't work. 
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
} else {
  Menu.setApplicationMenu(null);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const initialiseApiClient = function() {
  let server = "https://api.fire.com/business";
  if (store.get("useTest")) { 
    server = "https://api-preprod.fire.com/business";
  }

  console.log("Fire-Batch-Upload-Utility/" + version + " (" + os.platform() + " " + os.arch() + ")");

  let api = new OpenAPIClientAxios({ 
    definition: path.join(__dirname, "static/fire-business-api-v1.yaml"), 
    axiosConfigDefaults: { headers: { "User-Agent": "Fire-Batch-Upload-Utility/" + version + " (" + os.platform() + " " + os.arch() + ")" }},
    withServer: { url: server }
  });
  
  return api.init<FireBusinessApiClient>();
}

const loadAccounts = function(client: FireBusinessApiClient) {
  return client.getAccounts(null, null,  { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }});
}



const getClient = function() {
  console.log("Getting client....");
  // console.log(store.get("clientId"));

  return new Promise<FireBusinessApiClient>((resolve, reject) => {
    // do we have a client already?
    if (_fireBusinessApiClient != null) {
      // check the expiry on the accessToken
      if (new Date() > accessTokenExpiryDate) {
        getAccessToken(_fireBusinessApiClient).then(result => { 
          resolve(_fireBusinessApiClient); 
        });

      }

      resolve(_fireBusinessApiClient);

    } else if (store.get("useTest") && store.get("testClientId").length == 36) {
      // if we have client API tokens, initialise a new client.
      initialiseApiClient().then((client : FireBusinessApiClient) => { 
        // console.log(client);
        _fireBusinessApiClient = client;
        resolve(_fireBusinessApiClient);
      });

    } else if (!store.get("useTest") && store.get("clientId").length == 36) {
      // if we have client API tokens, initialise a new client.
      initialiseApiClient().then((client : FireBusinessApiClient) => { 
        // console.log(client);
        _fireBusinessApiClient = client;
        resolve(_fireBusinessApiClient);
      });

    } else {
      // what we doing here dude?
      reject(new Error("No Client available - have you set the API Token?"));
    }
  });
}

const getAccessToken = function(client: FireBusinessApiClient) {
  return new Promise<string>((resolve, reject) => {
    let clientId, clientKey, refreshToken;
    if (store.get("useTest")) {
      clientId = store.get("testClientId");
      clientKey = store.get("testClientKey");
      refreshToken = store.get("testRefreshToken");

    } else {
      clientId = store.get("clientId");
      clientKey = store.get("clientKey");
      refreshToken = store.get("refreshToken");

    }

    const nonce = Math.floor(new Date().getTime()/1000.0);
    const clientSecret = sha256(nonce + clientKey);

    client.authenticate(
        null, 
        {
          clientId: clientId, 
          clientSecret:  clientSecret, 
          refreshToken: refreshToken, 
          nonce: nonce, 
          grantType: "AccessToken"
        }, 
        { headers: { "Accept-encoding": "identity" }}
    ).then((gatres: any) => { 
      accessToken = gatres.data.accessToken;
      accessTokenExpiryDate = new Date(gatres.data.expiry);
      
      resolve("ok");
    
    });
  });
}

// try to initialise a new client - don't worry if we don't have API tokens. 
getClient()
  .then(client => { 
    getAccessToken(client).then(result => {});
  }).catch(err => {
    // no problems here. 
  });

  

const parsePacsFile = function(strSelectedFile: string) {
  let errors:string[] = [];

  try {
    const fxpSelectedFile = parser.parse(strSelectedFile);

    let numPaymentsInHeader:number = Math.round(parseInt(fxpSelectedFile["Document"]["CstmrCdtTrfInitn"]["GrpHdr"]["NbOfTxs"]));
    let valuePaymentsInHeader:number = Math.round(parseFloat(fxpSelectedFile["Document"]["CstmrCdtTrfInitn"]["GrpHdr"]["CtrlSum"]) * 100);

    let pmtInfXml: any = fxpSelectedFile["Document"]["CstmrCdtTrfInitn"]["PmtInf"];

    batchName = pmtInfXml["PmtInfId"];
    sourceAccountIBAN = pmtInfXml["DbtrAcct"]["Id"]["IBAN"];
    if (!mAccounts.some(account => account.ciban == sourceAccountIBAN)) { 
      errors.push("The Source Account IBAN in file is not one of your Fire accounts");
      console.error("The Source Account IBAN in file is not one of your Fire accounts");
    }

    fileCurrency = pmtInfXml["DbtrAcct"]["Ccy"];
    if (fileCurrency != "EUR") {
      errors.push("The file currency must be EUR");
      console.error("The file currency must be EUR");
    }

    if (parseInt(pmtInfXml["NbOfTxs"]) != numPaymentsInHeader) {
      errors.push(`Number of payments in header [${numPaymentsInHeader}] doesn't match number of payments in PmtInf block [${pmtInfXml["NbOfTxs"]}]`);
      console.error(`Number of payments in header [${numPaymentsInHeader}] doesn't match number of payments in PmtInf block [${pmtInfXml["NbOfTxs"]}]`);
    }

    if (Math.round(parseFloat(pmtInfXml["CtrlSum"]) * 100) != valuePaymentsInHeader) {
      errors.push("Value of payments in header doesn't match value of payments in PmtInf block");
      console.error("Value of payments in header doesn't match value of payments in PmtInf block");
    }

    let paymentsXml:any = pmtInfXml["CdtTrfTxInf"];
    let sumPaymentValue: number = 0;

    if (Array.isArray(paymentsXml)) {
      // more than one payment.

      if (paymentsXml.length != numPaymentsInHeader) {
        errors.push(`Number of payments in header [${numPaymentsInHeader}] doesn't match number of payments [${paymentsXml.length}]`);
        console.error(`Number of payments in header [${numPaymentsInHeader}] doesn't match number of payments [${paymentsXml.length}]`);
      }

      paymentsXml.forEach((paymentXml:any) => {
        // console.log(paymentXml);

        let amount:number = Math.round(parseFloat(paymentXml["Amt"]["InstdAmt"]["#text"]) * 100);
        let ref:string = paymentXml["PmtId"]["EndToEndId"];
        let name:string = paymentXml["Cdtr"]["Nm"];
        let iban:string = paymentXml["CdtrAcct"]["Id"]["IBAN"];
        let bic:string = paymentXml["CdtrAgt"]["FinInstnId"]["BIC"];

        sumPaymentValue += amount;

        payments.push({
          name: name, 
          iban: iban, 
          ref: ref, 
          amount: amount
        });
        
      });
    } else {
      // only one payment
      
      if (numPaymentsInHeader != 1) {
        errors.push(`Number of payments in header [${numPaymentsInHeader}] doesn't match number of payments [1]`);
        console.error(`Number of payments in header [${numPaymentsInHeader}] doesn't match number of payments [1]`);
      }

      // console.log(paymentsXml);

      let amount:number = Math.round(parseFloat(paymentsXml["Amt"]["InstdAmt"]["#text"]) * 100);
      let ref:string = paymentsXml["PmtId"]["EndToEndId"];
      let name:string = paymentsXml["Cdtr"]["Nm"];
      let iban:string = paymentsXml["CdtrAcct"]["Id"]["IBAN"];
      let bic:string = paymentsXml["CdtrAgt"]["FinInstnId"]["BIC"];

      sumPaymentValue += amount;

      payments.push({
        name: name, 
        iban: iban, 
        ref: ref, 
        amount: amount
      });
      

    }

    if (sumPaymentValue != valuePaymentsInHeader) {
      errors.push(`Value of payments in header [${valuePaymentsInHeader / 100}] doesn't match value of payments [${sumPaymentValue / 100}]`);
      console.error(`Value of payments in header [${valuePaymentsInHeader / 100}] doesn't match value of payments [${sumPaymentValue / 100}]`);
    }

    numPayments = numPaymentsInHeader;
    valuePayments = valuePaymentsInHeader;
      
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }


  return errors;

}  

// -----

const parseFireEurTemplateCSVFile = function(strSelectedFile: string) {
  let errors:string[] = [];

  batchName = "Batch " + new Date().toISOString().split('T')[0];

  try {
    let arraySelectedFileLines = strSelectedFile.split(/\r?\n/);
    arraySelectedFileLines.shift(); // I don't need the header line. 
    fileCurrency = "EUR";

    arraySelectedFileLines.forEach(function(selectedFileLine: string) {
      const arrayPaymentDetails = selectedFileLine.split(/,/);
      if (arrayPaymentDetails.length != 6) { return; }

      console.log(arrayPaymentDetails);

      let amount:number = Math.round(parseFloat(arrayPaymentDetails[5]) * 100);
      let myRef:string = arrayPaymentDetails[4]
      let payeeRef:string = arrayPaymentDetails[3]
      let name:string = arrayPaymentDetails[2];
      let iban:string = arrayPaymentDetails[1];
      
      valuePayments += amount;
      numPayments ++;

      payments.push({
        name: name, 
        iban: iban,
        ref: payeeRef, 
        myRef: myRef,
        amount: amount
      });
    });

      
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  return errors;

}  

// -----

const parseFireGbpTemplateCSVFile = function(strSelectedFile: string) {
  let errors:string[] = [];

  batchName = "Batch " + new Date().toISOString().split('T')[0];

  try {
    let arraySelectedFileLines = strSelectedFile.split(/\r?\n/);
    arraySelectedFileLines.shift(); // I don't need the header line. 
    fileCurrency = "GBP";

    arraySelectedFileLines.forEach(function(selectedFileLine: string) {
      const arrayPaymentDetails = selectedFileLine.split(/,/);
      if (arrayPaymentDetails.length != 7) { return; }

      console.log(arrayPaymentDetails);

      let amount:number = Math.round(parseFloat(arrayPaymentDetails[6]) * 100);
      let myRef:string = arrayPaymentDetails[5]
      let payeeRef:string = arrayPaymentDetails[4]
      let name:string = arrayPaymentDetails[3];
      let accountNumber:string = arrayPaymentDetails[2];
      let sortCode:string = arrayPaymentDetails[1];
      
      valuePayments += amount;
      numPayments ++;

      payments.push({
        name: name, 
        accountNumber: accountNumber,
        sortCode: sortCode, 
        ref: payeeRef, 
        myRef: myRef,
        amount: amount
      });
    });

      
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  return errors;

}  

// -----

const parsePaysmeGbpFile = function(strSelectedFile: string) {
  let errors:string[] = [];

  batchName = "Batch " + new Date().toISOString().split('T')[0];
  fileCurrency = "GBP";

  try {
    const arraySelectedFileLines = strSelectedFile.split(/\r?\n/);

    arraySelectedFileLines.forEach(function(selectedFileLine: string) {
      const arrayPaymentDetails = selectedFileLine.split(/,/);
      if (arrayPaymentDetails.length != 7) { return; }

      // console.log(arrayPaymentDetails);

      let amount:number = Math.round(parseFloat(arrayPaymentDetails[3]) * 100);
      let ref:string = arrayPaymentDetails[4]
      let name:string = arrayPaymentDetails[1];
      let accountNumber:string = arrayPaymentDetails[2];
      let sortCode:string = arrayPaymentDetails[0].replaceAll("-", "");

      valuePayments += amount;
      numPayments ++;

      payments.push({
        name: name, 
        accountNumber: accountNumber,
        sortCode: sortCode, 
        ref: ref, 
        amount: amount
      });
    });

      
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  return errors;

}  

// -----

const parsePaysmeEurFile = function(strSelectedFile: string) {
  let errors:string[] = [];

  batchName = "Batch " + new Date().toISOString().split('T')[0];
  fileCurrency = "EUR";

  try {
    const arraySelectedFileLines = strSelectedFile.split(/\r?\n/);

    while (arraySelectedFileLines.length > 15) {
      let paymentLines = arraySelectedFileLines.splice(0,25);
      // console.log(paymentLines);
      if (paymentLines[17] != "payment" && paymentLines[2] != "EUR") {
        errors.push("Errors with file format - line 3 of payment should be 'EUR' and line 18 should be 'payment'");
        console.error("Errors with file format - line 3 of payment should be 'EUR' and line 18 should be 'payment'");
      }

      let amount:number = Math.round(parseFloat(paymentLines[3]) * 100);
      let ref:string = paymentLines[0]
      let name:string = paymentLines[13];
      let iban:string = paymentLines[12];

      valuePayments += amount;
      numPayments ++;

      payments.push({
        name: name, 
        iban: iban,
        ref: ref, 
        amount: amount
      });

    }    
      
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  return errors;

}  

// -----------

const parseExcelFile = function(strSelectedFile: string) {
  const file = reader.readFile(strSelectedFile);
  const HEADER_ROW:number = 3;
  let tables: Map<string, Map<string, Map<string, string>>> = new Map();

  if (file.SheetNames.length != 1) {
    errors.push("There is more than one sheet in the Excel - please remove all except the sheet with the payment information");
    console.log("There is more than one sheet in the Excel - please remove all except the sheet with the payment information");
    return;
  }

  let sheetTitle: string = file.SheetNames[0];
  
  console.log("Loading sheet: [" + sheetTitle + "]...");

  let jsonSheetContents: string[][] = reader.utils.sheet_to_json(file.Sheets[sheetTitle], { header: 1 });
  // console.log(jsonSheetContents);

  console.log(JSON.stringify(jsonSheetContents[0]));
  const emeraldPayrollFileHeader = [ 'Code', null, 'Dept', null, 'Cost', null, 'Name', null, 'IBAN', null, 'BIC', null, 'Amount' ];
  const oooschFileHeader = [ 'Payee Payment Ref',	'Our Payment Ref', 'Payee Name', 'Amount', 'Currency', 'IBAN (for EUR)', 'Sort Code (for GBP)', 'Account Number (for GBP)' ];

  console.log(JSON.stringify(oooschFileHeader));

  if (JSON.stringify(jsonSheetContents[0]) === JSON.stringify(emeraldPayrollFileHeader) ) {
    parseEmeraldPayrollFile(jsonSheetContents);

  } else if (JSON.stringify(jsonSheetContents[0]) === JSON.stringify(oooschFileHeader) ) {
    parseOooschFile(jsonSheetContents);

  } else {
    console.log("Cannot determine file");
    
  }

}

const parseOooschFile = function(jsonSheetContent: string[][]) {
  batchName = "Payment Run " + new Date().toISOString().split('T')[0];
  fileCurrency = "";
  fileType = "Ooosch Payment File";

  try {

    for (var i = 1; i<jsonSheetContent.length; i++) {
      console.log(JSON.stringify(jsonSheetContent[i]));

      jsonSheetContent[i][5] = (jsonSheetContent[i][5] ? (typeof jsonSheetContent[i][5] === 'string' ? jsonSheetContent[i][5].trim() : jsonSheetContent[i][5] ) : "");
      jsonSheetContent[i][6] = (jsonSheetContent[i][6] ? (typeof jsonSheetContent[i][6] === 'string' ? jsonSheetContent[i][6].trim() : jsonSheetContent[i][6] ) : "");
      jsonSheetContent[i][7] = (jsonSheetContent[i][7] ? (typeof jsonSheetContent[i][7] === 'string' ? jsonSheetContent[i][7].trim() : jsonSheetContent[i][7] ) :  "");
      
      if (fileCurrency == "") {
        fileCurrency = jsonSheetContent[i][4];
      }

      if (fileCurrency != jsonSheetContent[i][4]) {
        errors.push("Only include one currency per file - first payment is " + fileCurrency + " and the payment at line " + i + " is " + jsonSheetContent[i][4]);
        console.error("Only include one currency per file - first payment is " + fileCurrency + " and the payment at line " + i + " is " + jsonSheetContent[i][4]);
        continue;
      }

      if (jsonSheetContent[i].length > 8) { 
        errors.push("Invalid number of fields on line " + i);
        console.error("Invalid number of fields on line " + i);
        continue; 
      }

      if (jsonSheetContent[i][4] == "EUR" && jsonSheetContent[i][5] == "") { 
        errors.push("You must include an IBAN for a Euro payment at line " + i);
        console.error("You must include an IBAN for a Euro payment at line " + i);
        continue; 
      }

      if (jsonSheetContent[i][4] == "EUR" && (jsonSheetContent[i][6] != "" || jsonSheetContent[i][7] != "")) { 
        errors.push("Don't include a Sort Code and Account Number for a Euro payment at line " + i);
        console.error("Don't include a Sort Code and Account Number for a Euro payment at line " + i);
        continue; 
      }

      if (jsonSheetContent[i][4] == "GBP" && (jsonSheetContent[i][6] == "" || jsonSheetContent[i][7] == "")) { 
        errors.push("You must include the Sort Code and Account Number for a Sterling payment at line " + i);
        console.error("You must include the Sort Code and Account Number for a Sterling payment at line " + i);
        continue; 
      }

      if (jsonSheetContent[i][4] == "GBP" && jsonSheetContent[i][5] != "") { 
        errors.push("Don't include an IBAN for a Sterling payment at line " + i);
        console.error("Don't include an IBAN for a Sterling payment at line " + i);
        continue; 
      }

      // if (paymentLines[17] != "payment" && paymentLines[2] != "EUR") {
      //   errors.push("Errors with file format - line 3 of payment should be 'EUR' and line 18 should be 'payment'");
      //   console.error("Errors with file format - line 3 of payment should be 'EUR' and line 18 should be 'payment'");
      // }

      let payeeRef:string = jsonSheetContent[i][0]
      let myRef:string = jsonSheetContent[i][1]
      let name:string = jsonSheetContent[i][2];
      let amount:number = Math.round(parseFloat(jsonSheetContent[i][3]) * 100);
      let currency:string = jsonSheetContent[i][4];
      let iban:string = jsonSheetContent[i][5];
      let sortCode:string = jsonSheetContent[i][6];
      let accountNumber:string = jsonSheetContent[i][7];

      valuePayments += amount;
      numPayments ++;

      payments.push({
        name: name, 
        iban: iban,
        accountNumber: accountNumber,
        sortCode: sortCode, 
        ref: payeeRef, 
        myRef: myRef,
        amount: amount,
        currency: currency
      });

    }
           
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  return errors;
  // Payee Payment Ref	Our Payment Ref	Payee Name	Amount	Currency	 IBAN (for EUR)	Sort Code (for GBP)	Account Number (for GBP)

}

const parseEmeraldPayrollFile = function(jsonSheetContent: string[][]) {

  let errors:string[] = [];

  batchName = "Payroll " + new Date().toISOString().split('T')[0];
  fileCurrency = "EUR";
  fileType = "Emerald Payroll File";

  try {

    for (var i = 1; i<jsonSheetContent.length; i++) {

      if (jsonSheetContent[i].length != 13) { continue; }

      // if (paymentLines[17] != "payment" && paymentLines[2] != "EUR") {
      //   errors.push("Errors with file format - line 3 of payment should be 'EUR' and line 18 should be 'payment'");
      //   console.error("Errors with file format - line 3 of payment should be 'EUR' and line 18 should be 'payment'");
      // }

      let amount:number = Math.round(parseFloat(jsonSheetContent[i][12]) * 100);
      let ref:string = "Payroll"
      let name:string = jsonSheetContent[i][6];
      let iban:string = jsonSheetContent[i][8];

      valuePayments += amount;
      numPayments ++;

      payments.push({
        name: name, 
        iban: iban,
        ref: ref, 
        amount: amount
      });

    }
           
  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  return errors;

}

// -----------

ipcMain.on("page-contents-loaded", function (event, arg) {
  
  const apiToken : Configuration = {
    clientId: store.get('clientId'),
    clientKey: store.get('clientKey'),
    refreshToken: store.get('refreshToken'),
    testClientId: store.get('testClientId'),
    testClientKey: store.get('testClientKey'),
    testRefreshToken: store.get('testRefreshToken'),
    useTestSystem: store.get("useTest")
  };
 
  if (isDev) { console.log(JSON.stringify(store.store)); }

  mainWindow.webContents.send("configs", version, (store.get("betaAgreementDate") ? false : true ), apiToken);   
});


ipcMain.on("select-file", function (event, arg) {
  let selectedFile:string = "";


  const filesSelected:string[] = dialog.showOpenDialogSync({ properties: ['openFile'] });
  if (filesSelected) {
    selectedFile = filesSelected[0];
  }

  numPayments = 0;
  valuePayments = 0;
  sourceAccountIBAN = "";
  fileCurrency = "";
  batchName = "";
  payments = [];
  fileType = "";
  errors = [];
  

  try {
    if (selectedFile.toLowerCase().endsWith(".xlsx")) {
      parseExcelFile(selectedFile);

    } else {
      
      const strSelectedFile = fs.readFileSync(selectedFile, 'utf8');
      const arraySelectedFileLines = strSelectedFile.split(/\r?\n/);

      if (strSelectedFile.match(/pain.001.001.03/g)) {
        fileType = "SEPA Payment File";
        parsePacsFile(strSelectedFile);

      } else if (strSelectedFile.match(/[0-9-]{6,8},[^,]*,\d{8},[0-9.]*,[^,]*,,/)) {
        fileType = "Paysme GBP Payment File";
        parsePaysmeGbpFile(strSelectedFile);

      } else if (strSelectedFile.match(/Currency,Destination IBAN,Payee Name,Payee Reference,My Reference,Payment Amount/)) {
        fileType = "Standard Fire Payment Euro File Template";
        parseFireEurTemplateCSVFile(strSelectedFile);

      } else if (strSelectedFile.match(/Currency,Destination Sort Code,Destination Account Number,Payee Name,Payee Reference,My Reference,Payment Amount/)) {
        fileType = "Standard Fire Payment Sterling File Template";
        parseFireGbpTemplateCSVFile(strSelectedFile);

      } else if (arraySelectedFileLines[2] == "EUR" && 
                arraySelectedFileLines[17] == "payment") {
        fileType = "Paysme EUR Payment File";
        parsePaysmeEurFile(strSelectedFile);

      }

    }
   
    if (fileType == "") {
      errors.push("Could not determine payment file type.");
      console.error("Could not determine payment file type.");
    }

  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  mainWindow.webContents.send("file-selected-and-parsed", { 
    paymentFile: selectedFile, 
    fileType: fileType,
    batchName: batchName,
    paymentFileCurrency: fileCurrency,
    paymentFileSourceIBAN: sourceAccountIBAN,
    paymentFileReportNumPayments: numPayments, 
    paymentFileReportValuePayments: valuePayments, 
    paymentsPreview: payments.slice(0, 2),
    errors: errors
  });
});





ipcMain.on("get-accounts", function (event, arg) {
  getClient()
    .then(client => {
    loadAccounts(client).then((res: any) => {
      if (res.data) {
        mAccounts = res.data.accounts as Components.Schemas.Account[];
        mainWindow.webContents.send("accounts", mAccounts, null);   

      } 
  
    }).catch((err: any) => {
      // error
      console.error(err);
    
    });

      
  })
  .catch(err => {
    // notify the UI
  });
});

ipcMain.on("beta-agreement", function (event, arg) {
  store.set("betaAgreementDate", new Date().toISOString());
});

ipcMain.on("save-configuration", function (event, arg) {
  const configs : Configuration = arg.configs;
  store.set({
    clientId: configs.clientId,
    clientKey: configs.clientKey,
    refreshToken: configs.refreshToken,
    testClientId: configs.testClientId,
    testClientKey: configs.testClientKey,
    testRefreshToken: configs.testRefreshToken,
    useTest: configs.useTestSystem
  });

  _fireBusinessApiClient = null;
  
  getClient()
    .then(client => { 
      getAccessToken(client).then(result => {
        mainWindow.webContents.send("configuration-saved", true);
      });
    })
    .catch(err => {
      // notify the UI
    });

});

//ipcMain.on will receive the “btnclick” info from renderprocess 
ipcMain.on("run-batch", function (event, arg) {

  let batchDetails: Components.Schemas.NewBatch = {
    batchName: arg.batchName, 
    currency: fileCurrency,
    type: 'BANK_TRANSFER'
  };

  let batchErrors: string[] = [];

  console.log(batchDetails);
  getClient()
    .then(client => {

      client.createBatchPayment(
        null, 
        batchDetails,
        { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }}
      ).then((res: any) => { 
        
        addPaymentsToBatch(client, res.data.batchUuid, arg.ican, batchErrors, function() {
          console.log(batchErrors);
          if (batchErrors.length > 0) {
            cancelBatch(client, res.data.batchUuid, function() {
              mainWindow.webContents.send("batch-failed", { batchErrors: batchErrors });
            });
          } else {
            submitBatch(client, res.data.batchUuid, function() {
              mainWindow.webContents.send("batch-ok", { batchUuid: res.data.batchUuid });

              getBatchDetails(client, res.data.batchUuid, function() {
                // batch complete. 
              });
            });

          }
        });
      });
      
    });
});


const addPaymentsToBatch = function(client: FireBusinessApiClient, batchUuid: string, ican: number, batchErrors: string[], callback: Function) {
  console.log(payments);
  let payment: any = payments.shift();
  let paymentDetails: any = {};

  if (fileCurrency == "EUR" ) {
    paymentDetails = {
      icanFrom: ican,
      payeeType: "ACCOUNT_DETAILS",
      destIban: payment.iban,
      destAccountHolderName: payment.name,
      amount: payment.amount,
      myRef: (payment.myRef ? payment.myRef : payment.ref),
      yourRef: payment.ref
    };

  } else if (fileCurrency == "GBP") {
    paymentDetails = {
      icanFrom: ican,
      payeeType: "ACCOUNT_DETAILS",
      destAccountNumber: payment.accountNumber,
      destNsc: payment.sortCode,
      destAccountHolderName: payment.name,
      amount: payment.amount,
      myRef: (payment.myRef ? payment.myRef : payment.ref),
      yourRef: payment.ref
    };

  } else {
    batchErrors.push("Invalid fileCurrency! " + fileCurrency);
    console.error("Invalid fileCurrency! " + fileCurrency);
  }

  client.addBankTransferBatchPayment(
    { batchUuid: batchUuid }, 
    paymentDetails,
    { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }}
  ).then((res: any) => { 

    mainWindow.webContents.send("payment-added-to-batch-event", { remainingPayments: payments.length, successfully: true });

    if (payments.length > 0) {
      addPaymentsToBatch(client, batchUuid, ican, batchErrors, callback);
    } else {
      callback();
    }
  })
  .catch((err: any) => {
    console.error(err.response.data);
    batchErrors.push(err.response.data.errors[0].message + " [" + payment.iban + "]");

    // I want to continue and see if there are more issues with the payments, rather than stop here. 
    mainWindow.webContents.send("payment-added-to-batch-event", { remainingPayments: payments.length, successfully: false });

    if (payments.length > 0) {
      addPaymentsToBatch(client, batchUuid, ican, batchErrors, callback);
    } else {
      callback();
    }

  });

}

const getBatchDetails = async(client: FireBusinessApiClient, batchUuid: string, callback: Function ) => {

  client.getDetailsSingleBatch(
      { batchUuid: batchUuid }, 
      null, 
      { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }}
      ).then((res: any) => { 
        console.log(res.data);
        mainWindow.webContents.send("batch-status", res.data );
        if (res.data.status != "COMPLETE" && res.data.status != "REJECTED") {
          // wait 3 secs and try again.
          setTimeout(function() {
            getBatchDetails(client, batchUuid, callback);
          }, 3000);

        } else { 
          callback();
        }
      });
      
}

const cancelBatch = function(client: FireBusinessApiClient, batchUuid: string, callback: Function ) {

  client.cancelBatchPayment(
      { batchUuid: batchUuid }, 
      null, 
      { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }}
      ).then((res: any) => { 
        console.log(res.data);
        callback();
      });
      
}

const submitBatch = function(client: FireBusinessApiClient, batchUuid: string, callback: Function ) {

  client.submitBatch(
      { batchUuid: batchUuid }, 
      null, 
      { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }}
      ).then((res: any) => { 
        console.log(res.data);
        callback();
      });
      
}


  
