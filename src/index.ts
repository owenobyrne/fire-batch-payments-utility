import { app, Menu, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import fs from 'fs';
import path from 'path';
import { Client as FireBusinessApiClient, Components, Paths } from './types/fire-business-api';
import sha256 from 'sha256';
import { OpenAPIClientAxios } from 'openapi-client-axios';
import Store from 'electron-store';
import updater from 'update-electron-app';
import isDev from 'electron-is-dev';
import Bugsnag from '@bugsnag/js'
const { XMLParser } = require('fast-xml-parser');
import { version } from './../package.json';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix : "@",
  parseTagValue: false
});

Bugsnag.start({
  apiKey: '9ba5a7c5d6ad414a1134ee105de42e52',
  appVersion: version
})


let numPaymentsInHeader:number = 0;
let valuePaymentsInHeader:number = 0;
let sourceAccountIBAN:string = "";
let fileCurrency:string = "";
let payments: any = [];
let batchName: string = "";

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
    betaAgreementDate: null
  }
});

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let accessToken: string = "";
let accessTokenExpiryDate: Date;
let mainWindow : BrowserWindow;
let _fireBusinessApiClient : FireBusinessApiClient;
let mAccounts : Paths.GetAccountById.Responses.$200[] = [];

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
  if (isDev) { mainWindow.webContents.openDevTools(); }
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
  return api.init<FireBusinessApiClient>();
}

const loadAccounts = function(client: FireBusinessApiClient) {
  return client.getAccounts(null, null,  { headers: { "Accept-encoding": "identity", "Authorization": "Bearer " + accessToken }});
}


const api = new OpenAPIClientAxios({ definition: path.join(__dirname, "static/fire-business-api-v1.yaml") });

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

    } else if (store.get("clientId").length == 36) {
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
    const nonce = Math.floor(new Date().getTime()/1000.0);
    const clientSecret = sha256(nonce + store.get('clientKey'));

    client.authenticate(
        null, 
        {clientId: store.get('clientId'), clientSecret:  clientSecret, refreshToken: store.get('refreshToken'), nonce: nonce, grantType: "AccessToken"}, 
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

  

  

ipcMain.on("page-contents-loaded", function (event, arg) {
  
  const apiToken : Configuration = {
    clientId: store.get('clientId'),
    clientKey: store.get('clientKey'),
    refreshToken: store.get('refreshToken')
  };
 
  if (isDev) { console.log(JSON.stringify(store.store)); }

  mainWindow.webContents.send("configs", version, (store.get("betaAgreementDate") ? false : true ), apiToken);   
});


ipcMain.on("select-file", function (event, arg) {
  let paymentFile:string = "";
  let errors:string[] = [];

  const filesSelected:string[] = dialog.showOpenDialogSync({ properties: ['openFile'] });
  if (filesSelected) {
    paymentFile = filesSelected[0];
  }

  numPaymentsInHeader = 0;
  valuePaymentsInHeader = 0;
  sourceAccountIBAN = "";
  fileCurrency = "";
  batchName = "";
  payments = [];

  try {
    const strModLabelsEnXml = fs.readFileSync(paymentFile, 'utf8');
    const fxpModLabelsEnXml = parser.parse(strModLabelsEnXml);

    numPaymentsInHeader = parseInt(fxpModLabelsEnXml["Document"]["CstmrCdtTrfInitn"]["GrpHdr"]["NbOfTxs"]);
    valuePaymentsInHeader = parseFloat(fxpModLabelsEnXml["Document"]["CstmrCdtTrfInitn"]["GrpHdr"]["CtrlSum"]);

    let pmtInfXml: any = fxpModLabelsEnXml["Document"]["CstmrCdtTrfInitn"]["PmtInf"];

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

    if (parseFloat(pmtInfXml["CtrlSum"]) != valuePaymentsInHeader) {
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
        console.log(paymentXml);

        let amount:number = parseFloat(paymentXml["Amt"]["InstdAmt"]["#text"]);
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
  
      console.log(paymentsXml);

      let amount:number = parseFloat(paymentsXml["Amt"]["InstdAmt"]["#text"]);
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
      errors.push("Value of payments in header doesn't match value of payments");
      console.error("Value of payments in header doesn't match value of payments");
    }

  } catch (err: any) {
    errors.push(err);
    console.error(err);
  }

  mainWindow.webContents.send("file-selected-and-parsed", { 
    paymentFile: paymentFile, 
    batchName: batchName,
    paymentFileCurrency: fileCurrency,
    paymentFileSourceIBAN: sourceAccountIBAN,
    paymentFileReportNumPayments: numPaymentsInHeader, 
    paymentFileReportValuePayments: valuePaymentsInHeader, 
    paymentsPreview: payments.slice(0, 2),
    errors: errors
  });
});




ipcMain.on("get-accounts", function (event, arg) {
  getClient()
    .then(client => {
    loadAccounts(client).then((res: any) => {
     
      if ((res.data as Paths.GetAccounts.Responses.$200).accounts) {
        mAccounts = (res.data as Paths.GetAccounts.Responses.$200).accounts;
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
    refreshToken: configs.refreshToken
  });

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

  let batchDetails: Paths.CreateBatchPayment.RequestBody = {
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

  client.addBankTransferBatchPayment(
    { batchUuid: batchUuid }, 
    {
      icanFrom: ican,
      payeeType: "ACCOUNT_DETAILS",
      destIban: payment.iban,
      destAccountHolderName: payment.name,
      amount: Math.trunc(parseFloat(payment.amount) * 100),
      myRef: payment.ref,
      yourRef: payment.ref
    },
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

  //     {ican: ican, dateRangeFrom: fromDate, dateRangeTo: toDate, limit: limit, offset: offset},
  //     null, 
  //     { headers: { "Authorization": "Bearer " + accessToken }}
  //   ).then(res => {
  //     const total = res.data.total;
      

  // getTransactions(arg.ican, fromDate, toDate, limit, offset, function(csv : string) {
  //   fs.writeFileSync(path.join(app.getPath("userData"), "report.csv"), csv);
  //   const savePath:string = dialog.showSaveDialogSync({ 
  //     title: "Save Report As...", 
  //     defaultPath: path.join(store.get('savePath'), "fire-report-"+arg.fromDate.replace(/-/gi, "")+"-"+arg.toDate.replace(/-/gi, "")+".csv")
  //   });

  //   if (savePath != undefined) {
  //     // save this directory as the default going foward
  //     store.set("savePath", path.dirname(savePath));

  //     try {
  //       fs.copyFileSync(
  //         path.join(app.getPath("userData"), "report.csv"), 
  //         savePath
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     fs.rmSync(path.join(app.getPath("userData"), "report.csv"));

  //     shell.showItemInFolder(savePath);
  //   }
// 
  // });
  
