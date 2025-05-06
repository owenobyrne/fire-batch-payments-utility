import './index.css';
import { Components, Paths } from './types/fire-business-api';


// typescript gets very snarky when there's no type definitions for things, 
// and getting jquery-ui or semantic-ui to work was a bitch.
// so tell it not to worry about $ (just shut the fuck up about it!!)
// side effect of no longer offering code completion
declare var $ : any;
let mAllAccounts: Components.Schemas.Account[] = [];

let mNumPayments:number = 0;
let mValuePayments:number = 0;
let mSourceAccountDetails:string = "";
let mFileName: string = "";
let mFileCurrency:string = "";
let mErrorsOccurred: string = "";
let mBatchName: string = "";

document.addEventListener('DOMContentLoaded', pageLoaded);

let pad = function(number: number, size : number) {
    var s = String(number);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

let getISODate = function(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}

function clearBatchRunDetails() {
    mNumPayments = 0;
    mValuePayments = 0;
    mSourceAccountDetails = "";
    mFileName = "";
    mFileCurrency = "";
    mErrorsOccurred = "";
    mBatchName = "";

    $("#selectfile").show();
    $("#filedetails").hide();

    populateAccountDropdown(mAllAccounts, null);
    
    // disable this until the file is ready
    $("#processpayments").prop('disabled', true);
}

function pageLoaded(){
    clearBatchRunDetails();

    $('#progressbar').progress();
    $('.ui.dropdown').dropdown();

    $("#selectfile").prop('disabled', true);

    window.api.send('page-contents-loaded',"I'm ready");
}



$("#selectfile").on('click', function (event : any) {
    event.preventDefault(); 
    window.api.send("select-file"); 

});

$("#beta-modal-ok").on('click', function (event : any) {
    event.preventDefault(); 
    window.api.send("beta-agreement");
    $("#beta-modal").modal("hide");

});

window.api.receive("file-selected-and-parsed", function(result: any) {
    console.log(result);
    $("#errorlist").html("");

    if (result.errors.length > 0) {
        result.errors.forEach((error: string) => {
            $("#errorlist").html($("#errorlist").html() + "<li>" + error);
        })
        $('#errors-modal').modal("show");


    } else {

        if (result["paymentFile"]) {
            let numberFormat = Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: result.paymentFileCurrency
            });

            mFileCurrency = result.paymentFileCurrency;
            mNumPayments = result.paymentFileReportNumPayments;
            mValuePayments = result.paymentFileReportValuePayments;
            mFileName = result.paymentFile;
            mBatchName = result.batchName;
            mSourceAccountDetails = result.paymentFileSourceIBAN;

            let paymentsPreview:any = result.paymentsPreview;

            $('#select-file-modal div.header').text("Payment File Preview - " + 
                numberFormat.format(result.paymentFileReportValuePayments / 100) + 
                " in " + result.paymentFileReportNumPayments + " payment(s)");

            let i:number = 0;
            
            $('#select-file-modal table#payments-preview tbody tr').each(function() {
                if (i<paymentsPreview.length) {
                    $(this.cells[0]).text(paymentsPreview[i]["name"]);
                    $(this.cells[1]).text((mFileCurrency == "GBP" ? paymentsPreview[i]["sortCode"] + " / " + paymentsPreview[i]["accountNumber"] : paymentsPreview[i]["iban"]));
                    $(this.cells[2]).text(paymentsPreview[i]["ref"]);
                    $(this.cells[3]).text(numberFormat.format(paymentsPreview[i]["amount"] / 100));
                    i++;

                } else {
                    $(this.cells[0]).text(" ");
                    $(this.cells[1]).text(" ");
                    $(this.cells[2]).text(" ");
                    $(this.cells[3]).text(" ");
                    i++;
                }
            });

            if (mNumPayments > 2) {
                $("#numrowsnotshown").text(result.fileType + " detected / " + (mNumPayments - 2) + " more payment(s) not shown.");
            } else {
                $("#numrowsnotshown").text(result.fileType + " detected.");
            }
            $('#select-file-modal').modal("show")

        }
    }
});

$("#changefile").on("click", function(event: any) {
    event.preventDefault();
    clearBatchRunDetails();
});

$("#payment-file-preview-ok").on("click", function(event: any) {
    event.preventDefault(); 

    $("#selectfile").hide();
    $("#filedetails>div>b").text(mFileName.replace(/^.*[\\\/]/, ''));

    let numberFormat = Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: mFileCurrency
    });

    $("#filedetails>div:eq(1)").text(numberFormat.format(mValuePayments / 100) + " in " + mNumPayments + " payment(s)");
    $("#filedetails").show();
    

    $('#select-file-modal').modal("hide")

    let accountsInFileCurrency: Components.Schemas.Account[] = mAllAccounts.filter((account) => {
        return account.currency.code.toLowerCase() == mFileCurrency.toLowerCase();
    });

    let selectedAccount: Components.Schemas.Account;
    if (!mSourceAccountDetails) {
        selectedAccount = accountsInFileCurrency[0];
    } else {
        selectedAccount = accountsInFileCurrency.filter((account) => {
            return account.ciban == mSourceAccountDetails;
        })[0];    
    }

    populateAccountDropdown(accountsInFileCurrency, selectedAccount.ican);
    $("#processpayments").prop('disabled', false);
    
});

$("#processpayments").on('click', function (event : any) {
    event.preventDefault(); 
    mErrorsOccurred = "";
    var selectedAccount:number =  $('#accountdropdown').dropdown("get value");
    $('#processing-modal').modal("show")
    
    window.api.send("run-batch", { ican: selectedAccount, batchName: mBatchName } ); 
});


$("#viewconfiguration").on('click', function (event : any) {
    event.preventDefault();
    $('#configuration-modal').modal("show")

});

$("#saveconfiguration").on('click', function (event : any) {
    event.preventDefault();
    if (( $("#clientId").val().length == 36 && $("#clientKey").val().length == 36 && $("#refreshToken").val().length == 36) 
        || ($("#testClientId").val().length == 36 && $("#testClientKey").val().length == 36 && $("#testRefreshToken").val().length == 36) ) {
       
        $("#saveconfiguration").addClass("loading");
        window.api.send("save-configuration", { 
            configs : { 
                clientId: $("#clientId").val(), 
                clientKey: $("#clientKey").val(), 
                refreshToken: $("#refreshToken").val(),
                testClientId: $("#testClientId").val(), 
                testClientKey: $("#testClientKey").val(), 
                testRefreshToken: $("#testRefreshToken").val(),
                useTestSystem: $("#useTestSystem").is(":checked")
            }
        } );     
    } else {
        $("#invalidtoken").show();
        setTimeout(function() {
            $("#invalidtoken").hide();
        }, 3000);
    }
});

$("#waiting-for-approval-modal-ok").on("click", function(event: any) {
    event.preventDefault();
    $('#waiting-for-approval').modal("hide");
    $('#waiting-for-approval-actions').hide();
    clearBatchRunDetails();


});

$("#useTestSystem").on('change', function (event : any) {
    event.preventDefault();
    if ($("#useTestSystem").is(":checked")) {
        $(".test-details").css("color", "#333");
        $(".live-details").css("color", "#ccc");
    } else {
        $(".test-details").css("color", "#ccc");
        $(".live-details").css("color", "#333");
    }
});

window.api.receive("configuration-saved", function(result : any) {
    if ($("#useTestSystem").is(":checked")) {
        $(".test-details").css("color", "#333");
        $(".live-details").css("color", "#ccc");
        $("#testsystemwarning").show();
        $("#accountdropdown").dropdown({ placeholder: "Select Test Account..." });
        $("#processpayments").html("Process Test Payments");
        $("#selectfile").html("Select Test Payment File");
    } else {
        $("#testsystemwarning").hide();
        $(".test-details").css("color", "#ccc");
        $(".live-details").css("color", "#333");
        $("#accountdropdown").dropdown({ placeholder: "Select Account..." });
        $("#processpayments").html("Process Payments");
        $("#selectfile").html("Select Payment File");
    }

    $("#saveconfiguration").removeClass("loading");
    $('#configuration-modal').modal("hide")
    $("#selectfile").prop('disabled', false);
    window.api.send('get-accounts');
});

window.api.receive("configs", function(version: string, showBeta: boolean, configs : Configuration) {
    if (configs.useTestSystem) {
        $("#useTestSystem").prop("checked", true);
        $(".test-details").css("color", "#333");
        $(".live-details").css("color", "#ccc");
        $("#testsystemwarning").show();
        $("#accountdropdown").dropdown({ placeholder: "Select Test Account..." });
        $("#processpayments").html("Process Test Payments");
        $("#selectfile").html("Select Test Payment File");
    } else { 
        $(".test-details").css("color", "#ccc");
        $(".live-details").css("color", "#333");
    }

    $("#clientId").val(configs.clientId);
    $("#clientKey").val(configs.clientKey);
    $("#refreshToken").val(configs.refreshToken); 
    $("#testClientId").val(configs.testClientId);
    $("#testClientKey").val(configs.testClientKey);
    $("#testRefreshToken").val(configs.testRefreshToken); 
    
    $("#app-version").text(version);

    if (showBeta) { $("#beta-modal").modal("show"); }

    if (configs.clientId.length != 36 && configs.testClientId.length != 36) {
        $('#configuration-modal').modal("show");
    } else {
        $("#selectfile").prop('disabled', false);
        window.api.send('get-accounts');
    }
});


window.api.receive("payment-added-to-batch-event", function(params : any) {
    console.log(params);
    
    if (!params.successfully) {
        $("#progressbar").addClass("error");
        mErrorsOccurred = " (There are issues with some payments)"
    }
    
    $("#progressbar")
        .progress("set total", mNumPayments)
        .progress("set progress", mNumPayments - params.remainingPayments)
        .progress("set label", `Processing ${mNumPayments - params.remainingPayments} of ${mNumPayments} payments... ${mErrorsOccurred}`);

    if (params.remainingPayments == 0) {
        $('#processing-modal').modal("hide")
        $("#progressbar").progress("set label", "").progress("set progress", 0)

    }
});

window.api.receive("batch-failed", function(errors : any) {
    $('#processing-modal').modal("hide")
    errors.batchErrors.forEach((error: string) => {
        $("#errorlist").html($("#errorlist").html() + "<li>" + error);
    })
    $('#errors-modal').modal("show");

});

window.api.receive("batch-status", function(result : any) {
    
    
    if (result.status == "PENDING_APPROVAL") {
        $("#loading-text").text("Awaiting Batch Approval...");
        
    } else if (result.status == "READY_FOR_PROCESSING") {
        $("#loading-text").text("Batch Approved. Processing transfers. You can close this app if you wish - transfers will continue in the background.");

    } else if (result.status == "COMPLETE") {
        $("#batch-processing").hide();
        $("#batch-ok").show();
        $("#loading-text").text("Payments complete.");
        setTimeout(function() {
            $('#waiting-for-approval').modal("hide");
            clearBatchRunDetails();

        }, 3000);

    } else if (result.status == "REJECTED") {
        $('#waiting-for-approval-actions').show();
        $("#batch-processing").hide();
        $("#batch-fail").show();
        $("#loading-text").text("Batch was rejected.");
    
    }
});

window.api.receive("batch-ok", function(result : any) {
    $('#processing-modal').modal("hide")
    $("#batch-processing").show();
    $("#batch-ok").hide();
    $("#batch-fail").hide();
    $('#waiting-for-approval').modal("show");
});

window.api.receive("accounts", function(allAccounts : Components.Schemas.Account[], selectedAccount?: number) {
    mAllAccounts = allAccounts;
    populateAccountDropdown(allAccounts, selectedAccount);

});

const populateAccountDropdown = function(accounts: Components.Schemas.Account[], selectedAccount?: number ) {
    var values : any[] = [];

    accounts.forEach((account) => {
        let numberFormat = Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: account.currency.code,
        });
        var item : any =  { value: account.ican, name: account.name + " (" + numberFormat.format(account.balance / 100) + ")" };
        if (account.ican == selectedAccount) {
            item.selected = true;
        }
        values.push(item);
        
    })

    console.log(values);
    let placeholder = "Select Account...";
    if ($("#useTestSystem").is(":checked")) {
        placeholder = "Select Test Account...";
    } 

    $('.ui.dropdown').dropdown({ placeholder: placeholder, values: values });
    if (!selectedAccount) {
        $('.ui.dropdown').dropdown("restore placeholder text");
    }
}

