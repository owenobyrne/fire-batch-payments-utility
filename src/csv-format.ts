import fs from 'fs';
import { Components } from './types/fire-business-api';

 
/* This is used for the Pdf Statement so we can total txns by their group */
enum Group  {
    EXTERNAL_ACCOUNT, // From/To external accounts
    INTERNAL_ACCOUNT, // From/To internal accounts
    FIRE_PAYMENT, // From/To fire payments (from/to other users)
    FEE,// fee txns e.g. ADD_ACCOUNT
    CARD_PAYMENT,// txns done with fire card e.g. CARD_ATM_DEBIT
    DIRECT_DEBIT,// direct debits
};

enum Direction {
    IN, // From/To external accounts
    OUT
};

const transactionTypeNamesEn = {
    "view.transaction.payment_received" : "Fire Payment Received",
    "view.transaction.lodgement" : "Payment Received",
    "view.transaction.withdrawal" : "Bank Transfer",
    "view.transaction.internal_transfer_to" : "Transfer In",
    "view.transaction.internal_transfer_from" : "Transfer Out",
    "view.transaction.withdrawal_returned" : "Bank Transfer Returned",
    "view.transaction.lodgement_reversed" : "Payment Received Reversed",
    "view.transaction.fx_internal_transfer_from" : "FX Transfer Out",
    "view.transaction.fx_internal_transfer_to" : "FX Transfer In",
    "view.transaction.add_account" : "Add Account",
    "view.transaction.create_additional_user" : "New User Created",
    "view.transaction.reversal" : "Bank Transfer",
    "view.transaction.manual_transfer" : "Payment Received",
    "view.transaction.payment_sent" : "Fire Payment Sent",
    "view.transaction.pending_payment_sent" : "Pending Payment Sent",
    "view.transaction.payment_request_sent" : "Payment Request",
    "view.transaction.create_card" : "Created Debit Card",

    "view.transaction.card_pos_contact_debit" : "Debit Card Payment",
    "view.transaction.card_pos_contact_credit" : "Debit Card Refund",
    "view.transaction.card_pos_contactless_debit" : "Contactless Payment",
    "view.transaction.card_pos_contactless_credit" : "Contactless Refund",
    "view.transaction.card_ecommerce_debit" : "Online Payment",
    "view.transaction.card_ecommerce_credit" : "Online Refund",
    "view.transaction.card_atm_debit" : "ATM Withdrawal",
    "view.transaction.card_atm_credit" : "ATM Lodgement",

    "view.transaction.card_international_pos_contact_debit" : "Int Debit Card Payment",
    "view.transaction.card_international_pos_contact_credit" : "Int Debit Card Refund",
    "view.transaction.card_international_pos_contactless_debit" : "Int Contactless Payment",
    "view.transaction.card_international_pos_contactless_credit" : "Int Contactless Refund",
    "view.transaction.card_international_ecommerce_debit" : "Int Online Payment",
    "view.transaction.card_international_ecommerce_credit" : "Int Online Refund",
    "view.transaction.card_international_atm_debit" : "Int ATM Withdrawal",
    "view.transaction.card_international_atm_credit" : "Int ATM Lodgement",

    "view.transaction.card_pos_contact_debit_reversal" : "Debit Card Payment (Reversal)",
    "view.transaction.card_pos_contact_credit_reversal" : "Debit Card Refund (Reversal)",
    "view.transaction.card_pos_contactless_debit_reversal" : "Contactless Payment (Reversal)",
    "view.transaction.card_pos_contactless_credit_reversal" : "Contactless Refund (Reversal)",
    "view.transaction.card_ecommerce_debit_reversal" : "Online Payment (Reversal)",
    "view.transaction.card_ecommerce_credit_reversal" : "Online Refund (Reversal)",
    "view.transaction.card_atm_debit_reversal" : "ATM Withdrawal (Reversal)",
    "view.transaction.card_atm_credit_reversal" : "ATM Lodgement (Reversal)",

    "view.transaction.card_international_pos_contact_debit_reversal" : "Int Debit Card Payment (Reversal)",
    "view.transaction.card_international_pos_contact_credit_reversal" : "Int Debit Card Refund (Reversal)",
    "view.transaction.card_international_pos_contactless_debit_reversal" : "Int Contactless Payment (Reversal)",
    "view.transaction.card_international_pos_contactless_credit_reversal" : "Int Contactless Refund (Reversal)",
    "view.transaction.card_international_ecommerce_debit_reversal" : "Int Online Payment (Reversal)",
    "view.transaction.card_international_ecommerce_credit_reversal" : "Int Online Refund (Reversal)",
    "view.transaction.card_international_atm_debit_reversal" : "Int ATM Withdrawal (Reversal)",
    "view.transaction.card_international_atm_credit_reversal" : "Int ATM Lodgement (Reversal)",

    "view.transaction.card_message_reversed_debit" : "Card Authorisation Reversed",
    "view.transaction.card_message_reversed_credit" : "Card Authorisation Reversed",
    "view.transaction.card_message_reversed.tooltip" : "A 'card authorisation reversed' transaction is created when the amount a card transaction was originally authorised for differs from the final settlement amount. This generally occurs in the case of international payments and is a result of FX rate changes.",

    "view.transaction.direct_debit" : "Direct Debit",
    "view.transaction.direct_debit_represented" : "Direct Debit (Represented)",
    "view.transaction.direct_debit_refund" : "Direct Debit Refund",

    "view.transaction.pis_lodgement" : "Fire Open Payment",
};


let txnTypes:any[] = [];
let moneyOutTxnTypes:string[] = [];
let inTxnTypes:string[] = [];
let visibleTxnTypes:string[] = [];
let cardTxnTypes:string[] = [];
let feeTxnTypes:string[] = [];


txnTypes.push({name: transactionTypeNamesEn["view.transaction.payment_received"], type: "PAYMENT_RECEIVED",                                    display: true,  ticked: false, direction: Direction.IN,  group: Group.FIRE_PAYMENT,     ofxType: "CREDIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.lodgement"], type: "LODGEMENT",                                           display: true,  ticked: false, direction: Direction.IN,  group: Group.EXTERNAL_ACCOUNT, ofxType: "CREDIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.withdrawal"], type: "WITHDRAWAL",                                          display: true,  ticked: false, direction: Direction.OUT, group: Group.EXTERNAL_ACCOUNT, ofxType: "DEBIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.internal_transfer_to"], type: "INTERNAL_TRANSFER_TO",                                display: true,  ticked: false, direction: Direction.IN,  group: Group.INTERNAL_ACCOUNT, ofxType: "XFER"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.internal_transfer_from"], type: "INTERNAL_TRANSFER_FROM",                              display: true,  ticked: false, direction: Direction.OUT, group: Group.INTERNAL_ACCOUNT, ofxType: "XFER"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.withdrawal_returned"], type: "WITHDRAWAL_RETURNED",                                 display: true,  ticked: false, direction: Direction.IN,  group: Group.EXTERNAL_ACCOUNT, ofxType: "CREDIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.lodgement_reversed"], type: "LODGEMENT_REVERSED",                                  display: true,  ticked: false, direction: Direction.OUT, group: Group.EXTERNAL_ACCOUNT, ofxType: "DEBIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.fx_internal_transfer_from"], type: "FX_INTERNAL_TRANSFER_FROM",                           display: true,  ticked: false, direction: Direction.OUT, group: Group.INTERNAL_ACCOUNT, ofxType: "XFER"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.fx_internal_transfer_to"], type: "FX_INTERNAL_TRANSFER_TO",                             display: true,  ticked: false, direction: Direction.IN,  group: Group.INTERNAL_ACCOUNT, ofxType: "XFER"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.add_account"], type: "ADD_ACCOUNT",                                         display: false, ticked: false, direction: Direction.OUT, group: Group.FEE,              ofxType: "FEE"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.create_additional_user"], type: "CREATE_ADDITIONAL_USER",                              display: false, ticked: false, direction: Direction.OUT, group: Group.FEE,              ofxType: "FEE"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.reversal"], type: "REVERSAL",                                            display: false, ticked: false, direction: Direction.OUT, group: Group.EXTERNAL_ACCOUNT, ofxType: "DEBIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.manual_transfer"], type: "MANUAL_TRANSFER",                                     display: false, ticked: false, direction: Direction.IN,  group: Group.EXTERNAL_ACCOUNT, ofxType: "CREDIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.create_card"], type: "CREATE_CARD",                                         display: false, ticked: false, direction: Direction.OUT, group: Group.FEE,              ofxType: "FEE"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contact_debit"], type: "CARD_POS_CONTACT_DEBIT",                              display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contact_credit"], type: "CARD_POS_CONTACT_CREDIT",                             display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contactless_debit"], type: "CARD_POS_CONTACTLESS_DEBIT",                          display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contactless_credit"], type: "CARD_POS_CONTACTLESS_CREDIT",                         display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_ecommerce_debit"], type: "CARD_ECOMMERCE_DEBIT",                                display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_ecommerce_credit"], type: "CARD_ECOMMERCE_CREDIT",                               display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_atm_debit"], type: "CARD_ATM_DEBIT",                                      display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_atm_credit"], type: "CARD_ATM_CREDIT",                                     display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contact_debit"], type: "CARD_INTERNATIONAL_POS_CONTACT_DEBIT",                display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contact_credit"], type: "CARD_INTERNATIONAL_POS_CONTACT_CREDIT",               display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contactless_debit"], type: "CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT",            display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contactless_credit"], type: "CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT",           display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_ecommerce_debit"], type: "CARD_INTERNATIONAL_ECOMMERCE_DEBIT",                  display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_ecommerce_credit"], type: "CARD_INTERNATIONAL_ECOMMERCE_CREDIT",                 display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_atm_debit"], type: "CARD_INTERNATIONAL_ATM_DEBIT",                        display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_atm_credit"], type: "CARD_INTERNATIONAL_ATM_CREDIT",                       display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contact_debit_reversal"], type: "CARD_POS_CONTACT_DEBIT_REVERSAL",                     display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contact_credit_reversal"], type: "CARD_POS_CONTACT_CREDIT_REVERSAL",                    display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contactless_debit_reversal"], type: "CARD_POS_CONTACTLESS_DEBIT_REVERSAL",                 display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_pos_contactless_credit_reversal"], type: "CARD_POS_CONTACTLESS_CREDIT_REVERSAL",                display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_ecommerce_debit_reversal"], type: "CARD_ECOMMERCE_DEBIT_REVERSAL",                       display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_ecommerce_credit_reversal"], type: "CARD_ECOMMERCE_CREDIT_REVERSAL",                      display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_atm_debit_reversal"], type: "CARD_ATM_DEBIT_REVERSAL",                             display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_atm_credit_reversal"], type: "CARD_ATM_CREDIT_REVERSAL",                            display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contact_debit_reversal"], type: "CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL",       display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contact_credit_reversal"], type: "CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL",      display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contactless_debit_reversal"], type: "CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL",   display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_pos_contactless_credit_reversal"], type: "CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL",  display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_ecommerce_debit_reversal"], type: "CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL",         display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_ecommerce_credit_reversal"], type: "CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL",        display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_atm_debit_reversal"], type: "CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL",               display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_international_atm_credit_reversal"], type: "CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL",              display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "ATM"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_message_reversed_debit"], type: "CARD_MESSAGE_REVERSED_DEBIT",                         display: true,  ticked: false, direction: Direction.IN,  group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.card_message_reversed_credit"], type: "CARD_MESSAGE_REVERSED_CREDIT",                        display: true,  ticked: false, direction: Direction.OUT, group: Group.CARD_PAYMENT,     ofxType: "POS"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.direct_debit"], type: "DIRECT_DEBIT",                                        display: true,  ticked: false, direction: Direction.OUT, group: Group.DIRECT_DEBIT, ofxType: "DEBIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.direct_debit_represented"], type: "DIRECT_DEBIT_REPRESENTED",                            display: true,  ticked: false, direction: Direction.OUT, group: Group.DIRECT_DEBIT, ofxType: "DEBIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.direct_debit_refund"], type: "DIRECT_DEBIT_REFUND",                                 display: true,  ticked: false, direction: Direction.IN,  group: Group.DIRECT_DEBIT, ofxType: "CREDIT"});
txnTypes.push({name: transactionTypeNamesEn["view.transaction.pis_lodgement"], type: "PIS_LODGEMENT",                                       display: true,  ticked: false, direction: Direction.IN,  group: Group.EXTERNAL_ACCOUNT, ofxType: "CREDIT"});





txnTypes.forEach(function(value: any, index: number) {
    if (value.direction === Direction.OUT) {
        moneyOutTxnTypes.push(value.type);
    }
});


txnTypes.forEach(function(value: any, index: number) {
    if (value.direction === Direction.IN) {
        inTxnTypes.push(value.type);
    }
});


txnTypes.forEach(function(value: any, index: number) {
    if (value.display) {
        visibleTxnTypes.push(value);
    }
});


txnTypes.forEach(function(value: any, index: number) {
    if (value.group === Group.CARD_PAYMENT) {
        cardTxnTypes.push(value.type);
    }
});


txnTypes.forEach(function(value: any, index: number) {
    if (value.group === Group.FEE) {
        feeTxnTypes.push(value.type);
    }
});


const getByType = function(type: string) : any {
    let foundType = null;
    txnTypes.forEach(function(item: any, index: number) {
        if(item.type === type) {
            foundType = item;
        }
    });
    return foundType;
};

/**
 * Gets the corresponding OFX type of the given txn type.
 * 
 * @param type e.g. FX_INTERNAL_TRANSFER_FROM
 * @return Object or null
 */
 const getType = function(/*String*/ type: string): any {
    
    var item = txnTypes.find(function(current: any) {
        return current.type === type;
    });
    
    return item;
};


const getFormattedTxns = function(txns: Components.Schemas.Transaction[]) {
    
    /* Each txn can have a different object structure (different relatedParty for example and different names on things),
        *  we need to standardise the object so that it will go into CSV and so it will be nicely ordered */
        
        var response:any[] = [];
        
        txns.forEach(function (txn:Components.Schemas.Transaction) { // transform response object to nice object for CSV rendering
            
            var formattedTxn:any = {};
            
            formattedTxn.date = txn.date;
            formattedTxn.txnId = txn.txnId;
            formattedTxn.refId = txn.refId;
            formattedTxn.ican = txn.ican; 

            var type:any = getByType(txn.type);
            formattedTxn.type = !type ? txn.type : type.name;
            
            var relatedParty = txn.relatedParty;
            if(relatedParty == null) { // we always want the csv to look the same, so if a field isn't available create it
                relatedParty = {};
            }
            formattedTxn.relatedParty = {};
            formattedTxn.relatedParty.type = relatedParty.type;
            
            // var user = relatedParty.user;
            // if(user == null) {
            //     user = {};
            // }
            // formattedTxn.relatedParty.user = {};
            // formattedTxn.relatedParty.user.alias = user.alias;
            // formattedTxn.relatedParty.user.mobilePhoneNumber = user.mobilePhoneNumber;
            // formattedTxn.relatedParty.user.imageUrl = user.imageUrl;
            // formattedTxn.relatedParty.user.connectionId = user.connectionId;
                
            // var business = relatedParty.business;
            // if(business == null) {
            //     business = {};
            // }
            // formattedTxn.relatedParty.business = {};
            // formattedTxn.relatedParty.business.alias = business.alias;
            
            if (relatedParty.type == "FIRE_ACCOUNT" || relatedParty.type == "WITHDRAWAL_ACCOUNT" || relatedParty.type == "EXTERNAL_ACCOUNT") {
                var account = relatedParty.account
            } else {
                account = {};
            }

            formattedTxn.relatedParty.account = {};
            formattedTxn.relatedParty.account.id = account.id;
            formattedTxn.relatedParty.account.alias = account.alias;
            formattedTxn.relatedParty.account.nsc = account.nsc;
            formattedTxn.relatedParty.account.accountNumber = account.accountNumber;
            formattedTxn.relatedParty.account.bic = account.bic;
            formattedTxn.relatedParty.account.iban = account.iban;
            
            var card = txn.card;
            if(card == null) {
                card = {};
            }
            formattedTxn.relatedParty.card = {};
            formattedTxn.relatedParty.card.cardType = card.provider;
            formattedTxn.relatedParty.card.cardLastFourDigits = card.maskedPan ? card.maskedPan.substr(card.maskedPan.length - 4) : "";
            
            formattedTxn.currency = txn.currency.code

            formattedTxn.feeAmount =  (txn.feeAmount / 100).toLocaleString('en-IE',{minimumFractionDigits: 2});
            formattedTxn.taxAmount =  (txn.taxAmount / 100).toLocaleString('en-IE',{minimumFractionDigits: 2});
            
            if (moneyOutTxnTypes.indexOf(txn.type) !== -1) {// it's money out txn

                formattedTxn.amountAfterCharges = formatMoneyOutTransactionAmount(txn.amountAfterCharges);
                formattedTxn.amountBeforeCharges = formatMoneyOutTransactionAmount(txn.amountBeforeCharges);

            } else { // it's money coming in to the account

                formattedTxn.amountAfterCharges = (txn.amountAfterCharges / 100).toLocaleString('en-IE',{minimumFractionDigits: 2});
                formattedTxn.amountBeforeCharges = (txn.amountBeforeCharges / 100).toLocaleString('en-IE',{minimumFractionDigits: 2});
            }
            
            formattedTxn.balance = (txn.balance / 100).toLocaleString('en-IE',{minimumFractionDigits: 2});
            formattedTxn.myRef = txn.myRef;
            formattedTxn.dateAcknowledged = txn.dateAcknowledged;
            
            var fxTradeDetails = txn.fxTradeDetails;
            if (fxTradeDetails == null) {
                fxTradeDetails = {};
            }
            formattedTxn.fxTradeDetails = {};
            formattedTxn.fxTradeDetails.buyCurrency = fxTradeDetails.buyCurrency;
            formattedTxn.fxTradeDetails.sellCurrency = fxTradeDetails.sellCurrency;
            formattedTxn.fxTradeDetails.fixedSide = fxTradeDetails.fixedSide;
            formattedTxn.fxTradeDetails.buyAmount = fxTradeDetails.buyAmount ? (fxTradeDetails.buyAmount / 100).toLocaleString('en-IE',{minimumFractionDigits: 2}) : '';
            formattedTxn.fxTradeDetails.sellAmount = fxTradeDetails.sellAmount ? (fxTradeDetails.sellAmount / 100).toLocaleString('en-IE',{minimumFractionDigits: 2}) : '';
            formattedTxn.fxTradeDetails.rate4d = fxTradeDetails.rate4d;
            
            response.push(formattedTxn);
        });
        
        return response;
};

/**
 * Format a transaction amount that's a money out txn type, such as a withdrawal.
 *
 * In the vast majority of cases we just need to just negate the value but there's an edge case where a money out txn type
 * has a negative amount associated with it due to some brexit migrated accounts that had a negative balance.
 */
 const formatMoneyOutTransactionAmount = function(/*number*/ amount: number) {

    if (amount >= 0) {
        // it's a normal money out transaction such as a withdrawal, we just need to negate the value
        return (-1 * (amount / 100)).toLocaleString('en-IE',{minimumFractionDigits: 2}); // empty currency symbol suppresses it, key to negate value and keep it as a number
    } else {
        // there's an extreme edge case where a brexit migrated account had a negative balance and we moved that over to the new account
        // in this case, we need to be careful not to add another - to it
        return (amount / 100).toLocaleString('en-IE',{minimumFractionDigits: 2}); // empty currency symbol suppresses it
    }
};

const flattenJson = function(data:any) {

    var result:any = {};
    function recurse(cur:any, prop:string) {

        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++) {
                recurse(cur[i], prop ? prop + "." + i : "" + i);
            }
            if (l === 0) {
                result[prop] = [];
            }
        } else {
            var isEmpty = true;
            for ( var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty) {
                result[prop] = {};
            }
        }
    }
    recurse(data, "");
    return result;
};

const startsWith = function(/*String*/ str:string, /*String*/ subStr:string) {
    return str.substring(0, subStr.length) === subStr;
};

/**
 * Format strings so they are interpreted correctly
 * See BA-9131 for exploit raised from pen testing
 * 
 * MUST BE IN SYNC WITH CsvMessageConverter.java
 */
 const getSafeString = function(/*String*/ value:string) {
    
    /*
        * In order to protect us against CSV injections it is recommended that the following characters be prepended with a single quote
        */
    if (startsWith(value, "=") || startsWith(value, "+") || startsWith(value, "@")) {
        value = '\'' + value;
    } 
    
    /* 
        * We must ensure the only quotes in the text are the ones we put in. Otherwise excel could get confused and pick up a quote in field as being the end of a string literal
        * and any commas outside of this would be treated as a delimiter, although really it is still part of the same field
        */ 
    value = value.replace(/["]/g, "");
    
    /* 
        * DO NOT USE ="" it must be just ""... The equals solves the leading zero issue in excel but causes a bigger bug where a comma inside a value is treated
        * as a delimiter... 
        * WE JUST HAVE TO SUFFER LEADING ZEROS IN EXCEL... IT CANNOT BE FIXED WITHOUT CREATING WORSE BUGS
        * DON'T EVEN ATTEMPT TO FIX IT, WE'VE WASTED HOURS OVER IT ALREADY, IT IS NOT IMPORTANT
        */

    return '"' + value + '"';
};


export default class CreateCsvFile {


    /** service (public) functions... **/
    static generate(txns : Components.Schemas.Transaction[], showLabel : boolean, fileName : string) {

        var csv = '';

        if (txns.length === 0) {
            /*
                * Header hard coded to avoid an empty file
                * This headers need to be in sync with com.carapay.common.model.outgoing.BusinessTransaction
                */
            csv = 'date,txnId,refId,ican,type,relatedParty.type,relatedParty.account.id,relatedParty.user.alias,relatedParty.user.mobilePhoneNumber,relatedParty.user.imageUrl,' +
                    'relatedParty.user.connectionId,relatedParty.business.alias,relatedParty.account.alias,relatedParty.account.nsc,' +
                    'relatedParty.account.accountNumber,relatedParty.account.bic,relatedParty.account.iban,relatedParty.card.cardType,relatedParty.card.cardLastFourDigits,' +
                    'currency,feeAmount,taxAmount,amountAfterCharges,amountBeforeCharges,balance,myRef,dateAcknowledged,fxTradeDetails.buyCurrency,fxTradeDetails.sellCurrency,' +
                    'fxTradeDetails.fixedSide,fxTradeDetails.buyAmount,fxTradeDetails.sellAmount,fxTradeDetails.rate4d';

        } else {
            var formattedTxns = getFormattedTxns(txns);
            var arrData = typeof formattedTxns !== 'object' ? JSON.parse(formattedTxns) : formattedTxns;

            if (showLabel) {
                var rowLabel = "";

                var flattenLabel = flattenJson(arrData[0]);
                for (var indexLabel in flattenLabel) {
                    rowLabel += indexLabel + ',';
                }
                rowLabel = rowLabel.slice(0, -1);
                csv += rowLabel + '\r\n';
            }

            for (var i = 0; i < arrData.length; i++) {

                var flattenData = flattenJson(arrData[i]);

                var row = "";
                for (var index in flattenData) {

                    var arrValue = flattenData[index];
                    if (arrValue == null) {
                        arrValue = "";
                    } else if (typeof arrValue === 'string' || arrValue instanceof String) {
                        arrValue = getSafeString(flattenData[index]);
                    }

                    row += arrValue + ',';
                }
                row = row.slice(0, row.length - 1);
                csv += row + '\r\n';
            }
        }
        return csv;
    };

}  