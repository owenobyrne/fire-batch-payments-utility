import './index.css';
import { Components, Paths } from './types/fire-business-api';


// typescript gets very snarky when there's no type definitions for things, 
// and getting jquery-ui or semantic-ui to work was a bitch.
// so tell it not to worry about $ (just shut the fuck up about it!!)
// side effect of no longer offering code completion
declare var $ : any;
let mAllAccounts: Paths.GetAccountById.Responses.$200[] = [];

let mNumPaymentsInHeader:number = 0;
let mValuePaymentsInHeader:number = 0;
let mSourceAccountIBAN:string = "";
let mFileName: string = "";
let mFileCurrency:string = "";
let mErrorsOccurred: string = "";

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
    mNumPaymentsInHeader = 0;
    mValuePaymentsInHeader = 0;
    mSourceAccountIBAN = "";
    mFileName = "";
    mFileCurrency = "";
    mErrorsOccurred = "";

    $("#selectfile").show();
    $("#filedetails").hide();
    populateAccountDropdown(mAllAccounts, null);
    $("#processpayments").prop('disabled', true);
}

function pageLoaded(){
    clearBatchRunDetails();

    $('#settings').accordion();

    $(".ui.calendar").calendar({
        monthFirst: false,
        type: 'date',
        formatter: {
            date: function (date : Date, settings : any) {
            if (!date) return '';
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return year + "-" + pad(month, 2) + "-" + pad(day, 2);
            }
        }
    })

    $('#progressbar').progress();

    $('.ui.dropdown').dropdown();

    window.api.send('page-contents-loaded',"I'm ready");
}



$("#selectfile").on('click', function (event : any) {
    event.preventDefault(); 
    window.api.send("select-file"); 

});

window.api.receive("file-selected-and-parsed", function(result: any) {
    console.log(result);

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
            mNumPaymentsInHeader = result.paymentFileReportNumPayments;
            mValuePaymentsInHeader = result.paymentFileReportValuePayments;
            mFileName = result.paymentFile;
            mSourceAccountIBAN = result.paymentFileSourceIBAN;

            let paymentsPreview:any = result.paymentsPreview;

            $('#select-file-modal div.header').text("Payment File Preview - " + 
                numberFormat.format(result.paymentFileReportValuePayments) + 
                " in " + result.paymentFileReportNumPayments + " payment(s)");

            let i:number = 0;
            $('#select-file-modal table#payments-preview tbody tr').each(function() {
                if (i<paymentsPreview.length) {
                    $(this.cells[0]).text(paymentsPreview[i]["name"]);
                    $(this.cells[1]).text(paymentsPreview[i]["iban"]);
                    $(this.cells[2]).text(paymentsPreview[i]["ref"]);
                    $(this.cells[3]).text(numberFormat.format(paymentsPreview[i]["amount"]));
                    i++;

                }
            });

            if (mNumPaymentsInHeader > 2) {
                $("#numrowsnotshown").text((mNumPaymentsInHeader - 2) + " more payment(s) not shown.");
            } else {
                $("#numrowsnotshown").text("");
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

    $("#filedetails>div:eq(1)").text(numberFormat.format(mValuePaymentsInHeader) + " in " + mNumPaymentsInHeader + " payment(s)");
    $("#filedetails").show();
    

    $('#select-file-modal').modal("hide")

    let accountsInFileCurrency: Paths.GetAccountById.Responses.$200[] = mAllAccounts.filter((account) => {
        return account.currency.code == mFileCurrency;
    });

    let selectedAccount: Paths.GetAccountById.Responses.$200 = mAllAccounts.filter((account) => {
        return account.ciban == mSourceAccountIBAN;
    })[0];

    populateAccountDropdown(accountsInFileCurrency, selectedAccount.ican);
    $("#processpayments").prop('disabled', false);
    
});

$("#processpayments").on('click', function (event : any) {
    event.preventDefault(); 
    mErrorsOccurred = "";
    var selectedAccount:number =  $('#accountdropdown').dropdown("get value");
    $('#processing-modal').modal("show")
    
    window.api.send("run-batch", { ican: selectedAccount } ); 
});


$("#viewconfiguration").on('click', function (event : any) {
    event.preventDefault();
    $('#configuration-modal').modal("show")

});

$("#saveconfiguration").on('click', function (event : any) {
    event.preventDefault();
    $("#saveconfiguration").addClass("loading");
    window.api.send("save-configuration", { configs : { clientId: $("#clientId").val(), clientKey: $("#clientKey").val(), refreshToken: $("#refreshToken").val() }} ); 
});

$("#waiting-for-approval-modal-ok").on("click", function(event: any) {
    event.preventDefault();
    $('#waiting-for-approval').modal("hide");
    $('#waiting-for-approval-actions').hide();
    clearBatchRunDetails();


});

window.api.receive("configuration-saved", function(result : any) {
    $("#saveconfiguration").removeClass("loading");
    $('#configuration-modal').modal("hide")
    window.api.send('get-accounts');
});

window.api.receive("configs", function(version: string, configs : Configuration) {
    $("#clientId").val(configs.clientId);
    $("#clientKey").val(configs.clientKey);
    $("#refreshToken").val(configs.refreshToken); 
    
    $("#app-version").text(version);

    if (configs.clientId.length != 36) {
        $('#settings').accordion("open", 0);
    } else {
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
        .progress("set total", mNumPaymentsInHeader)
        .progress("set progress", mNumPaymentsInHeader - params.remainingPayments)
        .progress("set label", `Processing ${mNumPaymentsInHeader - params.remainingPayments} of ${mNumPaymentsInHeader} payments... ${mErrorsOccurred}`);

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
        $("#loading-text").text("Batch Approved. Processing transfers...");

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

window.api.receive("accounts", function(allAccounts : Paths.GetAccountById.Responses.$200[], selectedAccount?: number) {
    mAllAccounts = allAccounts;
    populateAccountDropdown(allAccounts, selectedAccount);

});

const populateAccountDropdown = function(accounts: Paths.GetAccountById.Responses.$200[], selectedAccount?: number ) {
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

    console.log({ values: values});
    $('.ui.dropdown').dropdown({ values: values });
}

