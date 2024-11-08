import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type LimitParam = number;
        export type OffsetParam = number;
        export type OrderByParam = "DATE";
        export type OrderParam = "ASC" | "DESC";
    }
    export interface QueryParameters {
        orderParam?: Parameters.OrderParam;
        orderByParam?: Parameters.OrderByParam;
        limitParam?: Parameters.LimitParam;
        offsetParam?: Parameters.OffsetParam;
    }
    namespace Responses {
        export interface UnauthorisedError {
        }
    }
    namespace Schemas {
        /**
         * Account
         */
        export interface Account {
            /**
             * identifier for the fire.com account (assigned by fire.com)
             * example:
             * 42
             */
            ican?: number; // int64
            /**
             * the name the user gives to the account to help them identify it.
             * example:
             * Main Account
             */
            name?: string;
            /**
             * Internal Use
             * example:
             * ORANGE
             */
            colour?: string;
            /**
             * currency
             * The currency.
             */
            currency?: {
                /**
                 * The three letter code for the currency.
                 * example:
                 * EUR
                 */
                code?: string;
                /**
                 * The name of the currency
                 * example:
                 * Euro
                 */
                description?: string;
            };
            /**
             * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
             * example:
             * 23950
             */
            balance?: number; // int64
            /**
             * Live accounts can be used as normal. Migrated accounts were used before Brexit and are read-only.
             */
            status?: "LIVE" | "BREXIT_MIGRATED";
            /**
             * the BIC of the account (provided if currency is EUR).
             * example:
             * CPAYIE2D
             */
            cbic?: string;
            /**
             * the IBAN of the account (provided if currency is EUR).
             * example:
             * IE54CPAY99119911111111
             */
            ciban?: string;
            /**
             * the Sort Code of the account.
             * example:
             * 232221
             */
            cnsc?: string;
            /**
             * the Account Number of the account.
             * example:
             * 11111111
             */
            ccan?: string;
            /**
             * true if this is the default account for this currency. This will be the account that general fees are taken from (as opposed to per-transaction fees).
             * example:
             * true
             */
            defaultAccount?: boolean;
            /**
             * Whether or not direct debits can be set up on this account.
             * example:
             * false
             */
            directDebitsAllowed?: boolean;
            /**
             * Indicates that this account is for collecting Fire Open Payments only. All other payments to this account will be returned.
             * example:
             * false
             */
            fopOnly?: boolean;
        }
        /**
         * transaction
         */
        export interface Transaction {
            /**
             * The id of this side of the transaction (each transaction has two sides - a to and a from). This is used to get the details of the transaction.
             * example:
             * 30157
             */
            txnId?: number; // int64
            /**
             * The id of the transaction.
             * example:
             * 26774
             */
            refId?: number; // int64
            /**
             * identifier for the fire.com account (assigned by fire.com) This field is only used in the condensed version.
             * example:
             * 1951
             */
            ican?: number; // int64
            /**
             * currency
             * The currency.
             */
            currency?: {
                /**
                 * The three letter code for the currency.
                 * example:
                 * EUR
                 */
                code?: string;
                /**
                 * The name of the currency
                 * example:
                 * Euro
                 */
                description?: string;
            };
            /**
             * Amount of the transaction before the fees and taxes were applied.
             * example:
             * 5000
             */
            amountBeforeCharges?: number; // int64
            /**
             * The amount of the fee, if any.
             * example:
             * 0
             */
            feeAmount?: number; // int64
            /**
             * The amount of the tax, if any (e.g. Stamp duty for ATM transactions)
             * example:
             * 0
             */
            taxAmount?: number; // int64
            /**
             * Net amount lodged or taken from the account after fees and charges were applied.
             * example:
             * 5000
             */
            amountAfterCharges?: number; // int64
            /**
             * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
             * example:
             * 8500
             */
            balance?: number; // int64
            /**
             * The comment/reference on the transaction
             * example:
             * Transfer to main account
             */
            myRef?: string;
            /**
             * The comment/reference on the transaction that appears on the recipients statement. Only for withdrawals
             * example:
             * From John Smith
             */
            yourRef?: string;
            /**
             * Date of the transaction
             * example:
             * 2021-04-13T11:06:32.437Z
             */
            date?: string; // date-time
            /**
             * (FOP payments only) The FOP Payment Code that was used to make this payment.
             * example:
             * 1abcdefg
             */
            paymentRequestPublicCode?: string;
            /**
             * relatedCard
             * Details of the card used (if applicable)
             */
            card?: {
                cardId?: number; // int64
                provider?: string;
                alias?: string;
                maskedPan?: string;
                embossCardName?: string;
                embossBusinessName?: string;
                expiryDate?: string; // date-time
            };
            /**
             * The type of the transaction:
             * * `LODGEMENT` - Bank Transfer received
             * * `PIS_LODGEMENT` - Fire Open Payments Lodgement received
             * * `MANUAL_TRANSFER` - Manual Transfer to
             * * `WITHDRAWAL` - Bank Transfer sent
             * * `REVERSAL` - Credit Reversal
             * * `DIRECT_DEBIT` - A direct debit.
             * * `DIRECT_DEBIT_REPRESENTED` - A Direct Debit that was requested again after initially failing.
             * * `DIRECT_DEBIT_REFUND` - A refund of a Direct debit.
             * * `INTERNAL_TRANSFER_TO` - Internal Transfer sent (between two of my accounts of the same currency)
             * * `INTERNAL_TRANSFER_FROM` - Internal Transfer received (between two of my accounts of the same currency)
             * * `WITHDRAWAL_RETURNED` - Bank Transfer sent returned
             * * `LODGEMENT_REVERSED` - Bank Transfer received returned
             * * `FX_INTERNAL_TRANSFER_FROM` - FX Internal Transfer received (between two of my accounts of different currency)
             * * `FX_INTERNAL_TRANSFER_TO` - FX Internal Transfer sent (between two of my accounts of different currency)
             * * `CREATE_CARD` - The fee taken when a debit card is issued.
             * * `ADD_ACCOUNT` - The fee taken when an account is created.
             * * `CREATE_ADDITIONAL_USER` - The fee taken when an additional user is created.
             * * `CARD_POS_CONTACT_DEBIT` - Card used in store; read by magnetic stripe or pin
             * * `CARD_POS_CONTACT_CREDIT` - Card used in store; read by magnetic stripe or pin
             * * `CARD_POS_CONTACTLESS_DEBIT` - Card used in store; read by NFC
             * * `CARD_POS_CONTACTLESS_CREDIT` - Card used in store; read by NFC
             * * `CARD_ECOMMERCE_DEBIT` - Card used on the internet
             * * `CARD_ECOMMERCE_CREDIT` - Card used on the internet
             * * `CARD_ATM_DEBIT` - Card used in an ATM
             * * `CARD_ATM_CREDIT` - Card used in an ATM
             * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
             * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
             * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT` - Card used in store in non-processing currency; read by NFC
             * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT` - Card used in store in non-processing currency; read by NFC
             * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT	` - Card used on the internet in non-processing currency
             * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT` - Card used on the internet in non-processing currency
             * * `CARD_INTERNATIONAL_ATM_DEBIT` - Card used in an ATM in non-processing currency
             * * `CARD_INTERNATIONAL_ATM_CREDIT` - Card used in an ATM in non-processing currency
             * * `CARD_POS_CONTACT_DEBIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
             * * `CARD_POS_CONTACT_CREDIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
             * * `CARD_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store; read by NFC - reversed
             * * `CARD_POS_CONTACTLESS_CREDIT_REVERSAL` - Card used in store; read by NFC - reversed
             * * `CARD_ECOMMERCE_DEBIT_REVERSAL	` - Card used on the internet - reversed
             * * `CARD_ECOMMERCE_CREDIT_REVERSAL` - Card used on the internet - reversed
             * * `CARD_ATM_DEBIT_REVERSAL` - Card used in an ATM - reversed
             * * `CARD_ATM_CREDIT_REVERSAL` - Card used in an ATM - reversed
             * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
             * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
             * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
             * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
             * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
             * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
             * * `CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
             * * `CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
             *
             * example:
             * WITHDRAWAL
             */
            type?: string;
            /**
             * example:
             * 2021-04-13T11:06:32.437Z
             */
            dateAcknowledged?: string; // date-time
            /**
             * fxTrade
             * Details of the FX trade (if applicable)
             */
            fxTradeDetails?: {
                /**
                 * currency which is being bought
                 * example:
                 * GBP
                 */
                buyCurrency?: string;
                /**
                 * currency which is being sold
                 * example:
                 * EUR
                 */
                sellCurrency?: string;
                /**
                 * type of trade - BUY or SELL
                 * example:
                 * SELL
                 */
                fixedSide?: string;
                /**
                 * amount of buyCurrency being bought
                 * example:
                 * 359
                 */
                buyAmount?: number; // int64
                /**
                 * amount of sellCurrency being sold
                 * example:
                 * 500
                 */
                sellAmount?: number; // int64
                /**
                 * exchange rate
                 * example:
                 * 7180
                 */
                rate4d?: number; // int64
                /**
                 * The FX provider used to make the trade.
                 * example:
                 * TCC
                 */
                provider?: string;
            };
            /**
             * batchItemDetails
             * Details of the batch run if this transaction was part of a batch.
             */
            batchItemDetails?: {
                /**
                 * The UUID for this batch.
                 * example:
                 * F2AF3F2B-4406-4199-B249-B354F2CC6019
                 */
                batchPublicUuid?: string;
                /**
                 * The UUID for this item in the batch.
                 * example:
                 * F2AF3F2B-4406-4199-B249-B354F2CC6019
                 */
                batchItemPublicUuid?: string;
                /**
                 * The optional name given to the batch at creation time.
                 * example:
                 * Payroll 2022-11
                 */
                batchName?: string;
                /**
                 * The optional job number given to the batch to link it to your own system.
                 * example:
                 * 2018-01-PR
                 */
                jobNumber?: string;
            };
            /**
             * directDebitDetails
             * Details of the direct debit (if applicable)
             */
            directDebitDetails?: {
                /**
                 * The UUID for the direct debit payment
                 * example:
                 * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                 */
                directDebitUuid?: string;
                /**
                 * The UUID for the mandate
                 * example:
                 * f171b143-e3eb-47de-85a6-1c1f1108c701
                 */
                mandateUUid?: string;
                /**
                 * Set by party who sets up the direct debit.
                 * example:
                 * VODA-123456
                 */
                originatorReference?: string;
                /**
                 * The creator of the party who sets up the direct debit.
                 * example:
                 * Vodafone PLC
                 */
                originatorName?: string;
                /**
                 * The Alias of the party who sets up the direct debit.
                 * example:
                 * Three
                 */
                originatorAlias?: string;
                /**
                 * The direct debit reference.
                 * example:
                 * VODA-ABC453-1
                 */
                directDebitReference?: string;
                /**
                 * URL pointing to a small version of the Originator Logo (if available)
                 * example:
                 * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                 */
                originatorLogoUrlSmall?: string;
                /**
                 * URL pointing to a large version of the Originator Logo (if available)
                 * example:
                 * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                 */
                originatorLogoUrlLarge?: string;
                /**
                 * the reference of the mandate
                 * example:
                 * CRZ-102190123
                 */
                mandateReference?: string;
                /**
                 * The UUID for the mandate
                 * example:
                 * 28d627c3-1889-44c8-ae59-6f6b20239260
                 */
                mandateUuid?: string;
            };
            /**
             * proprietarySchemeDetails
             * Extra details about the transaction based on the scheme used to make the payment.
             */
            proprietarySchemeDetails?: {
                /**
                 * the type of proprietary scheme - SCT for SEPA, FPS for Faster Payments etc.
                 * example:
                 * SCT
                 */
                type?: string;
                /**
                 * the scheme proprietary data - key pairs separated by | and key/values separated by ^
                 * example:
                 * remittanceInfoUnstructured^FIRE440286865OD1|instructionId^O223151336499079
                 */
                data?: string;
            }[];
            /**
             * relatedParty
             * Details of the related third party involved in the transaction.
             */
            relatedParty?: /**
             * relatedParty
             * Details of the related third party involved in the transaction.
             */
            {
                type?: "FIRE_ACCOUNT";
                account?: {
                    /**
                     * identifier for the fire.com account (assigned by fire.com)
                     * example:
                     * 42
                     */
                    id?: number; // int64
                    /**
                     * the name the user gives to the account to help them identify it.
                     * example:
                     * Main Account
                     */
                    alias?: string;
                    /**
                     * the BIC of the account (provided if currency is EUR).
                     * example:
                     * CPAYIE2D
                     */
                    bic?: string;
                    /**
                     * the IBAN of the account (provided if currency is EUR).
                     * example:
                     * IE54CPAY99119911111111
                     */
                    iban?: string;
                    /**
                     * the Sort Code of the account.
                     * example:
                     * 232221
                     */
                    nsc?: string;
                    /**
                     * the Account Number of the account.
                     * example:
                     * 11111111
                     */
                    accountNumber?: string;
                };
            } | {
                type?: "EXTERNAL_ACCOUNT";
                account?: {
                    id?: number; // int64
                    /**
                     * the name the user gives to the account to help them identify it.
                     * example:
                     * Main Account
                     */
                    alias?: string;
                    /**
                     * the Sort Code of the account.
                     * example:
                     * 232221
                     */
                    nsc?: string;
                    /**
                     * the Account Number of the account.
                     * example:
                     * 11111111
                     */
                    accountNumber?: string;
                    /**
                     * the BIC of the account (provided if currency is EUR).
                     * example:
                     * CPAYIE2D
                     */
                    bic?: string;
                    /**
                     * the IBAN of the account (provided if currency is EUR).
                     * example:
                     * IE54CPAY99119911111111
                     */
                    iban?: string;
                };
            } | {
                type?: "WITHDRAWAL_ACCOUNT";
                account?: {
                    /**
                     * The ID of the payee.
                     * example:
                     * 123
                     */
                    id?: number; // int64
                    /**
                     * The name of the payee.
                     * example:
                     * Smyth and Co.
                     */
                    alias?: string;
                    /**
                     * The sort code of the payee (for GBP payments)
                     * example:
                     * 991199
                     */
                    nsc?: string;
                    /**
                     * The account number of the payee (for GBP payments)
                     * example:
                     * 00000000
                     */
                    accountNumber?: string;
                    /**
                     * The BIC of the payee (for EUR payments)
                     * example:
                     * CPAYIE2D
                     */
                    bic?: string;
                    /**
                     * The IBAN of the payee (for EUR payments)
                     * example:
                     * IE76CPAY99119900000000
                     */
                    iban?: string;
                };
            } | {
                type?: "CARD_MERCHANT" | "CARD_ATM";
                cardMerchant?: {
                    /**
                     * example:
                     * 06011329
                     */
                    acquirerIdDe32?: string;
                    additionalAmtDe54?: string;
                    /**
                     * example:
                     * 177449
                     */
                    authCodeDe38?: string;
                    /**
                     * example:
                     * -1000
                     */
                    billAmt?: number; // int64
                    /**
                     * example:
                     * 978
                     */
                    billCcy?: string;
                    expiryDate?: string;
                    /**
                     * example:
                     * 5521
                     */
                    mccCode?: string;
                    /**
                     * example:
                     * 013152429
                     */
                    merchIdDe42?: string;
                    /**
                     * example:
                     * ABC Coffee Shop
                     */
                    merchNameDe43?: string;
                    /**
                     * example:
                     * 000001000030037299999
                     */
                    posDataDe61?: string;
                    /**
                     * example:
                     * 80266721
                     */
                    posTermnlDe41?: string;
                    /**
                     * example:
                     * 051
                     */
                    posDataDe22?: string;
                    /**
                     * example:
                     * 000000
                     */
                    procCode?: string;
                    /**
                     * example:
                     * 00
                     */
                    respCodeDe39?: string;
                    /**
                     * example:
                     * 010900006720
                     */
                    retRefNoDe37?: string;
                    /**
                     * example:
                     * 00
                     */
                    statusCode?: string;
                    /**
                     * example:
                     * 976307363
                     */
                    token?: string;
                    /**
                     * example:
                     * 1000
                     */
                    txnAmt4d?: number; // int64
                    /**
                     * example:
                     * 978
                     */
                    txnCcy?: string;
                    /**
                     * example:
                     * IRL
                     */
                    txnCtry?: string;
                    /**
                     * example:
                     * ABC Coffee Shop
                     */
                    txnDesc?: string;
                    /**
                     * example:
                     * A
                     */
                    txnStatCode?: string;
                    /**
                     * example:
                     * A
                     */
                    txnType?: string;
                    /**
                     * example:
                     * 010X610500000
                     */
                    additionalDataDe48?: string;
                    /**
                     * example:
                     * N
                     */
                    authorisedByGps?: string;
                    /**
                     * example:
                     * N
                     */
                    avsResult?: string;
                    /**
                     * example:
                     * 0100
                     */
                    mtId?: string;
                    recordDataDe120?: string;
                    additionalDataDe124?: string;
                };
            };
            /**
             * An internal Fire reference for the transaction (UUID)
             * example:
             * 42de0705-e3f1-44fa-8c41-79973eb80eb2
             */
            eventUuid?: string;
        }
    }
}
declare namespace Paths {
    namespace ActivateMandate {
        namespace Parameters {
            /**
             * The uuid of the mandate to activate.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type MandateUuid = string;
        }
        export interface PathParameters {
            mandateUuid: /**
             * The uuid of the mandate to activate.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.MandateUuid;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace AddAccount {
        /**
         * newAccount
         */
        export interface RequestBody {
            /**
             * Name to give the new account
             * example:
             * Operating Account
             */
            accountName?: string;
            /**
             * The currency of the new account
             */
            currency?: "EUR" | "GBP";
            /**
             * a field to indicate you accept the fee for a new account
             */
            acceptFeesAndCharges?: boolean;
        }
        namespace Responses {
            /**
             * Account
             */
            export interface $201 {
                /**
                 * identifier for the fire.com account (assigned by fire.com)
                 * example:
                 * 42
                 */
                ican?: number; // int64
                /**
                 * the name the user gives to the account to help them identify it.
                 * example:
                 * Main Account
                 */
                name?: string;
                /**
                 * Internal Use
                 * example:
                 * ORANGE
                 */
                colour?: string;
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                 * example:
                 * 23950
                 */
                balance?: number; // int64
                /**
                 * Live accounts can be used as normal. Migrated accounts were used before Brexit and are read-only.
                 */
                status?: "LIVE" | "BREXIT_MIGRATED";
                /**
                 * the BIC of the account (provided if currency is EUR).
                 * example:
                 * CPAYIE2D
                 */
                cbic?: string;
                /**
                 * the IBAN of the account (provided if currency is EUR).
                 * example:
                 * IE54CPAY99119911111111
                 */
                ciban?: string;
                /**
                 * the Sort Code of the account.
                 * example:
                 * 232221
                 */
                cnsc?: string;
                /**
                 * the Account Number of the account.
                 * example:
                 * 11111111
                 */
                ccan?: string;
                /**
                 * true if this is the default account for this currency. This will be the account that general fees are taken from (as opposed to per-transaction fees).
                 * example:
                 * true
                 */
                defaultAccount?: boolean;
                /**
                 * Whether or not direct debits can be set up on this account.
                 * example:
                 * false
                 */
                directDebitsAllowed?: boolean;
                /**
                 * Indicates that this account is for collecting Fire Open Payments only. All other payments to this account will be returned.
                 * example:
                 * false
                 */
                fopOnly?: boolean;
            }
        }
    }
    namespace AddBankTransferBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        export type RequestBody = {
            /**
             * The Fire account ID for the fire.com account the funds are taken from.
             * example:
             * 2001
             */
            icanFrom?: number; // int64
            /**
             * Use ACCOUNT_DETAILS if you are providing account numbers/sort codes/IBANs (Mode 2). Specify the account details in the destIban, destAccountHolderName, destNsc or destAccountNumber fields as appropriate.
             * example:
             * ACCOUNT_DETAILS
             */
            payeeType?: "ACCOUNT_DETAILS";
            /**
             * The destination IBAN if a Euro Bank transfer
             * example:
             * IE00AIBK93123412341234
             */
            destIban?: string;
            /**
             * The destination Nsc if a GBP bank transfer
             * example:
             * 123456
             */
            destNsc?: string;
            /**
             * The destination Account Number if a GBP bank transfer
             * example:
             * 12345678
             */
            destAccountNumber?: string;
            /**
             * The destination account holder name
             * example:
             * John Smith
             */
            destAccountHolderName?: string;
            /**
             * The amount of funds to be transferred. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
             * example:
             * 500
             */
            amount?: number; // int64
            /**
             * The reference on the transaction for your records - not shown to the beneficiary.
             * example:
             * Payment to John Smith for Consultancy in device.
             */
            myRef?: string;
            /**
             * The reference on the transaction - displayed on the beneficiary bank statement.
             * example:
             * ACME LTD - INV 23434
             */
            yourRef?: string;
        } | {
            /**
             * The Fire account ID for the fire.com account the funds are taken from.
             * example:
             * 2001
             */
            icanFrom?: number; // int64
            /**
             * The ID of the existing or automatically created payee
             * example:
             * 15002
             */
            payeeId?: number; // int64
            /**
             * Use PAYEE_ID if you are paying existing approved payees (Mode 1).
             * example:
             * PAYEE_ID
             */
            payeeType?: "PAYEE_ID";
            /**
             * The amount of funds to be transferred. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
             * example:
             * 500
             */
            amount?: number; // int64
            /**
             * The reference on the transaction for your records - not shown to the beneficiary.
             * example:
             * Payment to John Smith for Consultancy in device.
             */
            myRef?: string;
            /**
             * The reference on the transaction - displayed on the beneficiary bank statement.
             * example:
             * ACME LTD - INV 23434
             */
            yourRef?: string;
        };
        namespace Responses {
            /**
             * newBatchItemResponse
             */
            export interface $200 {
                /**
                 * A Batch Item UUID for this item. Note* Do not confuse this for BatchUuid when submitting a batch.
                 * example:
                 * fba4a76a-ce51-4fc1-b562-98ec01299e4d
                 */
                batchItemUuid?: string;
            }
        }
    }
    namespace AddInternalTransferBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        /**
         * batchItemInternalTransfer
         */
        export interface RequestBody {
            /**
             * The account ID for the fire.com account the funds are taken from
             * example:
             * 2001
             */
            icanFrom?: number; // int64
            /**
             * The account ID for the fire.com account the funds are directed to
             * example:
             * 3221
             */
            icanTo?: number; // int64
            /**
             * The amount of funds to be transferred. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
             * example:
             * 10000
             */
            amount?: number; // int64
            /**
             * The reference on the transaction
             * example:
             * Moving funds to Operating Account
             */
            ref?: string;
        }
        namespace Responses {
            /**
             * newBatchItemResponse
             */
            export interface $200 {
                /**
                 * A Batch Item UUID for this item. Note* Do not confuse this for BatchUuid when submitting a batch.
                 * example:
                 * fba4a76a-ce51-4fc1-b562-98ec01299e4d
                 */
                batchItemUuid?: string;
            }
        }
    }
    namespace AddInternationalTransferBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        /**
         * batchItemInternationalTransferMode1
         */
        export interface RequestBody {
            /**
             * The Fire account ID for the fire.com account the funds are taken from.
             * example:
             * 2001
             */
            icanFrom?: number; // int64
            /**
             * The ID of the existing payee
             * example:
             * 15002
             */
            payeeId?: number; // int64
            /**
             * The value of the payment in the beneficiary currency. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
             * example:
             * 500
             */
            amount?: number; // int64
            /**
             * The reference on the transaction for your records - not shown to the beneficiary.
             * example:
             * Payment to John Smith for Consultancy in device.
             */
            myRef?: string;
            /**
             * The reference on the transaction - displayed on the beneficiary bank statement.
             * example:
             * ACME LTD - INV 23434
             */
            yourRef?: string;
            /**
             * The reason for the payment, used for transaction monitoring purposes. Must be one of Invoice Payment|Salary/Dividend Payment|Expenses|Savings|Other
             * example:
             * Invoice Payment, Salary/Dividend Payment
             */
            paymentReason?: string;
        }
        namespace Responses {
            /**
             * newBatchItemResponse
             */
            export interface $200 {
                /**
                 * A Batch Item UUID for this item. Note* Do not confuse this for BatchUuid when submitting a batch.
                 * example:
                 * fba4a76a-ce51-4fc1-b562-98ec01299e4d
                 */
                batchItemUuid?: string;
            }
        }
    }
    namespace Authenticate {
        /**
         * authentication
         */
        export interface RequestBody {
            /**
             * The Client ID for this API Application
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            clientId?: string;
            /**
             * The Refresh Token for this API Application
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            refreshToken?: string;
            /**
             * A random non-repeating number used as a salt for the `clientSecret` below. The simplest nonce is a unix time.
             * example:
             * 728345638475
             */
            nonce?: number; // int64
            /**
             * Always `AccessToken`. (This will change to `refresh_token` in a future release.)
             */
            grantType?: "AccessToken";
            /**
             * The SHA256 hash of the nonce above and the app’s Client Key. The Client Key will only be shown to you when you create the app, so don’t forget to save it somewhere safe. SECRET=( `/bin/echo -n $NONCE$CLIENT_KEY | sha256sum` ).
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            clientSecret?: string;
        }
        namespace Responses {
            /**
             * accessToken
             */
            export interface $200 {
                /**
                 * The business ID for the business.
                 * example:
                 * 248
                 */
                businessId?: number; // int64
                /**
                 * The ID of the application you are using.
                 * example:
                 * 433
                 */
                apiApplicationId?: number; // int64
                /**
                 * The expiry date and time for this token (ISO-8601).
                 * example:
                 * 2020-10-22T07:48:56.460Z
                 */
                expiry?: string; // date-time
                /**
                 * The permissions assigned to the Access Token as an array of strings. This provides information on what API access it is allowed. See the section on Scope below.
                 * example:
                 * [
                 *   "PERM_BUSINESSES_GET_ACCOUNTS",
                 *   "PERM_BUSINESSES_GET_ACCOUNT_TRANSACTIONS"
                 * ]
                 */
                permissions?: string[];
                /**
                 * The App Bearer Access Token you can use in further API calls.
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                accessToken?: string;
            }
        }
    }
    namespace BlockCard {
        namespace Parameters {
            /**
             * The cardid of the card to block
             */
            export type CardId = number; // int64
        }
        export interface PathParameters {
            cardId: /* The cardid of the card to block */ Parameters.CardId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CancelBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace CancelMandateByUuid {
        namespace Parameters {
            /**
             * The uuid of the mandate to cancel.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type MandateUuid = string;
        }
        export interface PathParameters {
            mandateUuid: /**
             * The uuid of the mandate to cancel.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.MandateUuid;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace ChangeAccountConfig {
        namespace Parameters {
            /**
             * The unique id for the account
             * example:
             * 12345
             */
            export type Ican = string;
        }
        export interface PathParameters {
            ican: /**
             * The unique id for the account
             * example:
             * 12345
             */
            Parameters.Ican;
        }
        /**
         * Account Configuration
         */
        export interface RequestBody {
            /**
             * This is the name the account will be updated to.
             * example:
             * John Doe
             */
            accountName?: string;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CreateApiApplication {
        /**
         * newApiApplication
         */
        export interface RequestBody {
            /**
             * The ICAN of one of your Fire accounts. Restrict this API Application to a certan account.
             */
            ican?: number; // int64
            /**
             * Whether or not this API Application can be used
             * example:
             * true
             */
            enabled?: boolean;
            /**
             * The date that this API Application can no longer be used.
             * example:
             * 2019-08-22T07:48:56.460Z
             */
            expiry?: string; // date-time
            /**
             * A name for the API Application to help you identify it
             * example:
             * Batch Processing API
             */
            applicationName?: string;
            /**
             * Number of approvals required to process a payment in a batch
             * example:
             * 1
             */
            numberOfPaymentApprovalsRequired?: number;
            /**
             * Number of approvals required to create a payee in a batch
             * example:
             * 1
             */
            numberOfPayeeApprovalsRequired?: number;
            /**
             * The list of permissions required
             * example:
             * [
             *   "PERM_BUSINESS_POST_PAYMENT_REQUEST",
             *   "PERM_BUSINESS_GET_ASPSPS"
             * ]
             */
            permissions?: string[];
        }
        namespace Responses {
            /**
             * apiApplication
             */
            export interface $200 {
                /**
                 * This is the ID number of the API application
                 * example:
                 * 2404
                 */
                applicationId?: number; // int64
                /**
                 * This is the name given to the API application by the fire.com user
                 * example:
                 * Account Information Test
                 */
                name?: string;
                /**
                 * The ICAN of one of your Fire accounts. Restrict this API Application to a certan account.
                 */
                ican?: number; // int64
                /**
                 * This is the ID of client associated with the application
                 * example:
                 * G0919C06D23D-362A-H5D3-E76D8687D6AE
                 */
                clientId?: string;
                /**
                 * This is the refresh token associated with the application
                 * example:
                 * 9C332CF3-1687-4548-8E0E-55E4F0599800
                 */
                refreshToken?: string;
                /**
                 * The Client Key of the new API Application
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                clientKey?: string;
                /**
                 * This is whether or not the application is enabled for usage
                 */
                enabled?: boolean;
                /**
                 * This is the number of approvals required for any application actions
                 * example:
                 * 1
                 */
                numberOfApprovalsRequired?: number; // int64
                /**
                 * This is number of approvals required for any payment batches
                 * example:
                 * 1
                 */
                numberOfPaymentApprovalsRequired?: number; // int64
                /**
                 * This is the number of approvals required for Payees
                 * example:
                 * 1
                 */
                numberOfPayeeApprovalsRequired?: number; // int64
                /**
                 * The date that this API Application can no longer be used.
                 * example:
                 * 2019-08-22T07:48:56.460Z
                 */
                expiry?: string; // date-time
            }
        }
    }
    namespace CreateBatchPayment {
        /**
         * newBatch
         */
        export interface RequestBody {
            /**
             * The type of the batch - can be one of the listed 3
             */
            type?: "BANK_TRANSFER" | "INTERNAL_TRANSFER" | "INTERNATIONAL_TRANSFER";
            /**
             * 3 digit ISO code for the currency you wish to send - GBP, EUR, USD, CAD, etc...
             * example:
             * EUR
             */
            currency?: string;
            /**
             * An optional name you give to the batch at creation time.
             * example:
             * January 2018 Payroll
             */
            batchName?: string;
            /**
             * An optional job number you can give to the batch to help link it to your own system.
             * example:
             * 2022-01-PR
             */
            jobNumber?: string;
            /**
             * An optional POST URL that all events for this batch will be sent to.
             * example:
             * https://my.webserver.com/cb/payroll
             */
            callbackUrl?: string;
        }
        namespace Responses {
            /**
             * newBatchResponse
             */
            export interface $200 {
                /**
                 * A UUID for this item.
                 * example:
                 * F2AF3F2B-4406-4199-B249-B354F2CC6019
                 */
                batchUuid?: string;
            }
        }
    }
    namespace CreateNewCard {
        /**
         * newCard
         */
        export interface RequestBody {
            /**
             * example:
             * 3245
             */
            userId?: number; // int64
            /**
             * example:
             * 5345
             */
            cardPin?: string;
            /**
             * example:
             * 2150
             */
            eurIcan?: number; // int64
            /**
             * example:
             * 2152
             */
            gbpIcan?: number; // int64
            /**
             * example:
             * BUSINESS
             */
            addressType?: "HOME" | "BUSINESS";
            /**
             * example:
             * true
             */
            acceptFeesAndCharges?: boolean;
        }
        namespace Responses {
            /**
             * newCardResponse
             */
            export interface $200 {
                /**
                 * example:
                 * 51
                 */
                cardId?: number; // int64
                /**
                 * example:
                 * 537455******1111
                 */
                maskedPan?: string;
                /**
                 * example:
                 * 2019-01-31T00:00:00.000Z
                 */
                expiryDate?: string; // date-time
                /**
                 * example:
                 * CREATED_ACTIVE
                 */
                status?: "CREATED_ACTIVE" | "CREATED_INACTIVE";
            }
        }
    }
    namespace DeleteBankTransferBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
            /**
             * The uuid of the item to remove.
             */
            export type ItemUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
            itemUuid: /* The uuid of the item to remove. */ Parameters.ItemUuid;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteInternalTransferBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
            /**
             * The uuid of the item to remove.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type ItemUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
            itemUuid: /**
             * The uuid of the item to remove.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.ItemUuid;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteInternationalTransferBatchPayment {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
            /**
             * The uuid of the item to remove.
             */
            export type ItemUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
            itemUuid: /* The uuid of the item to remove. */ Parameters.ItemUuid;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetAccountById {
        namespace Parameters {
            /**
             * The ican of the account to retrieve
             */
            export type Ican = number; // int64
        }
        export interface PathParameters {
            ican: /* The ican of the account to retrieve */ Parameters.Ican /* int64 */;
        }
        namespace Responses {
            /**
             * Account
             */
            export interface $200 {
                /**
                 * identifier for the fire.com account (assigned by fire.com)
                 * example:
                 * 42
                 */
                ican?: number; // int64
                /**
                 * the name the user gives to the account to help them identify it.
                 * example:
                 * Main Account
                 */
                name?: string;
                /**
                 * Internal Use
                 * example:
                 * ORANGE
                 */
                colour?: string;
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                 * example:
                 * 23950
                 */
                balance?: number; // int64
                /**
                 * Live accounts can be used as normal. Migrated accounts were used before Brexit and are read-only.
                 */
                status?: "LIVE" | "BREXIT_MIGRATED";
                /**
                 * the BIC of the account (provided if currency is EUR).
                 * example:
                 * CPAYIE2D
                 */
                cbic?: string;
                /**
                 * the IBAN of the account (provided if currency is EUR).
                 * example:
                 * IE54CPAY99119911111111
                 */
                ciban?: string;
                /**
                 * the Sort Code of the account.
                 * example:
                 * 232221
                 */
                cnsc?: string;
                /**
                 * the Account Number of the account.
                 * example:
                 * 11111111
                 */
                ccan?: string;
                /**
                 * true if this is the default account for this currency. This will be the account that general fees are taken from (as opposed to per-transaction fees).
                 * example:
                 * true
                 */
                defaultAccount?: boolean;
                /**
                 * Whether or not direct debits can be set up on this account.
                 * example:
                 * false
                 */
                directDebitsAllowed?: boolean;
                /**
                 * Indicates that this account is for collecting Fire Open Payments only. All other payments to this account will be returned.
                 * example:
                 * false
                 */
                fopOnly?: boolean;
            }
            export interface $401 {
            }
        }
    }
    namespace GetAccounts {
        namespace Responses {
            /**
             * accounts
             */
            export interface $200 {
                accounts?: {
                    /**
                     * identifier for the fire.com account (assigned by fire.com)
                     * example:
                     * 42
                     */
                    ican?: number; // int64
                    /**
                     * the name the user gives to the account to help them identify it.
                     * example:
                     * Main Account
                     */
                    name?: string;
                    /**
                     * Internal Use
                     * example:
                     * ORANGE
                     */
                    colour?: string;
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                     * example:
                     * 23950
                     */
                    balance?: number; // int64
                    /**
                     * Live accounts can be used as normal. Migrated accounts were used before Brexit and are read-only.
                     */
                    status?: "LIVE" | "BREXIT_MIGRATED";
                    /**
                     * the BIC of the account (provided if currency is EUR).
                     * example:
                     * CPAYIE2D
                     */
                    cbic?: string;
                    /**
                     * the IBAN of the account (provided if currency is EUR).
                     * example:
                     * IE54CPAY99119911111111
                     */
                    ciban?: string;
                    /**
                     * the Sort Code of the account.
                     * example:
                     * 232221
                     */
                    cnsc?: string;
                    /**
                     * the Account Number of the account.
                     * example:
                     * 11111111
                     */
                    ccan?: string;
                    /**
                     * true if this is the default account for this currency. This will be the account that general fees are taken from (as opposed to per-transaction fees).
                     * example:
                     * true
                     */
                    defaultAccount?: boolean;
                    /**
                     * Whether or not direct debits can be set up on this account.
                     * example:
                     * false
                     */
                    directDebitsAllowed?: boolean;
                    /**
                     * Indicates that this account is for collecting Fire Open Payments only. All other payments to this account will be returned.
                     * example:
                     * false
                     */
                    fopOnly?: boolean;
                }[];
            }
            export interface $401 {
            }
        }
    }
    namespace GetActivities {
        namespace Responses {
            /**
             * activities
             */
            export interface $200 {
                cards?: {
                    /**
                     * Identifier for the fire.com account (assigned by fire.com)
                     * example:
                     * 7448413
                     */
                    id?: number; // int64
                    /**
                     * User id assigned by fire.com
                     * example:
                     * 3138
                     */
                    userId?: number; // int64
                    /**
                     * Type of the activity
                     */
                    type?: "PAYMENT_MADE" | "PAYMENT_RECEIVED" | "MANUAL_WITHDRAWAL" | "EDIT_CARAPIN" | "EDIT_PASSWORD" | "USER_CREATED" | "FUNDING_SOURCE_ADDED" | "FUNDING_SOURCE_VALIDATED" | "LODGEMENT_RECEIVED" | "RESET_PASSWORD" | "RESET_CARAPIN" | "LOGIN_FAILED" | "LOGIN_SUCCESS" | "ACCOUNT_CREATED" | "INTERNAL_TRANSFER_MADE" | "PAYMENT_REQUEST_SENT" | "PAYMENT_REQUEST_RECEIVED" | "EDIT_ACCOUNT_NAME" | "SETTING_ENABLED" | "SETTING_DISABLED" | "PASSWORD_LOCKED" | "CARAPIN_LOCKED" | "NATIVE_APPLICATION_REGISTRATION_LOCKED" | "NATIVE_APPLICATION_USER_STATUS_CHANGED" | "PAYMENT_ACKNOWLEDGED" | "WITHDRAWAL_RETURNED" | "LODGEMENT_REVERSED" | "LODGEMENT_SUSPENDED_INCF_MAX_CPL" | "VERIFICATION_EVIDENCE_SUBMITTED" | "ANONYMOUS_PAYMENT_RECEIVED" | "INCREASE_CVL" | "PENDING_PAYMENT_RETURNED" | "PAYMENT_FAILED_BASIC_USER_CP_LIMIT_EXCEEDED" | "ANONYMOUS_PAYMENT_FAILED_BASIC_USER_CP_LIMIT_EXCEEDED" | "UPLOAD_PROFILE_PICTURE" | "EDIT_USER_EMAIL_ADDRESS" | "TOTP_AUTHENTICATOR_TOKEN_LOCKED" | "FX_INTERNAL_TRANSFER_MADE" | "PAYMENT_REQUEST_SAVED" | "CARD_TOP_UP" | "ACCOUNT_CREATED_BY_PAYMENT" | "PAYMENT_REQUEST_PAYMENT_RECEIVED" | "LODGEMENT_SUSPENDED_BASIC_EXPIRY_REACHED" | "LODGEMENT_SUSPENDED_USER_SANCTIONED" | "PERSONAL_EMAIL_VERIFIED" | "ACCOUNT_CREATED_BY_CARD" | "CARD_PAYMENT_POS_CONTACT_DEBIT" | "CARD_PAYMENT_POS_CONTACTLESS_DEBIT" | "CARD_PAYMENT_ECOMMERCE_DEBIT" | "CARD_PAYMENT_ATM_DEBIT" | "CARD_PAYMENT_DECLINED" | "CARD_PAYMENT_CARD_BLOCKED" | "CARD_PAYMENT_CARD_NOT_ACTIVATED" | "CARD_PAYMENT_REFUND" | "CARD_PAYMENT_AUTH_REVERSAL" | "CARD_PAYMENT_FINANCIAL_REVERSAL" | "CARD_PAYMENT_FINANCIAL_DIFFERENT_AMOUNT" | "CARD_MESSAGE_CHANGE_PIN" | "CARD_CREATED" | "CARD_ACTIVATED" | "CARD_BLOCKED" | "CARD_UNBLOCKED" | "ARCHIVE_FUNDING_SOURCE" | "INTERACTION_MESSAGE_RECEIVED" | "BUSINESS_API_APPLICATION_CREATED" | "BUSINESS_API_APPLICATION_DELETED" | "BUSINESS_MOBILE_APPLICATION_CREATED" | "BUSINESS_USER_DISABLED" | "BUSINESS_MOBILE_APPLICATION_DELETED" | "ANONYMOUS_PAYMENT_REQUEST_PAYMENT_RECEIVED" | "SCAAA_PING" | "BUSINESS_ADDITIONAL_USER_CREATED" | "BUSINESS_BATCH_REQUEST_CANCELLED" | "BUSINESS_BATCH_REQUEST_SUBMITTED" | "BUSINESS_BATCH_REQUEST_COMPLETED" | "BUSINESS_BATCH_REQUEST_SCAAA_SENT" | "BUSINESS_BATCH_REQUEST_APPROVED" | "BUSINESS_BATCH_REQUEST_REJECTED" | "CARD_LINKED_ACCOUNTS_UPDATED" | "DIRECT_DEBIT_MANDATE_CREATED" | "DIRECT_DEBIT_MANDATE_COMPLETE" | "DIRECT_DEBIT_MANDATE_DISALLOWED_BY_ACCOUNT" | "DIRECT_DEBIT_CREATED" | "DIRECT_DEBIT_CREATED_INSUFFICIENT_FUNDS_AT_PRESENT" | "DIRECT_DEBIT_COLLECTED" | "DIRECT_DEBIT_UNPAID_INSUFFICIENT_FUNDS" | "STAFF_DIRECT_DEBIT_MANDATE_CANCELLED" | "STAFF_DIRECT_DEBIT_MANDATE_REJECTED" | "STAFF_DIRECT_DEBIT_REJECTED" | "BUSINESS_CREATED" | "ACCOUNT_DIRECT_DEBITS_ENABLED" | "ACCOUNT_DIRECT_DEBITS_DISABLED" | "DIRECT_DEBIT_MANDATE_CANCELLED" | "DIRECT_DEBIT_MANDATE_UPDATED" | "DIRECT_DEBIT_REJECTED" | "DIRECT_DEBIT_REFUND" | "LOGIN_APPROVAL_REQUESTED" | "NEW_PAYEE_APPROVAL_REQUESTED" | "APPROVAL_REQUEST_REJECTED" | "NEW_USER_APPROVAL_REQUESTED" | "PAYMENT_REQUEST_PAYMENT_AUTHORISED" | "PAYMENT_REQUEST_PAYMENT_PAID" | "BUSINESS_API_APPLICATION_UPDATED" | "CARD_PAYMENT_OOB_3DS2_AUTHORISATION_REQUEST" | "CARD_PAYMENT_OOB_3DS2_DECLINED" | "EDIT_USER_ROLE_APPROVAL_REQUESTED" | "BUSINESS_USER_ROLE_CHANGED" | "EXCHANGE_RATE_MONTHLY_REPORT_AVAILABLE" | "DIRECT_DEBIT_CANCELLED" | "DIRECT_DEBIT_REVERSED" | "DIRECT_DEBIT_DISALLOWED_BY_ACCOUNT" | "CARD_REISSUED" | "FX_INTERNATIONAL_WITHDRAWAL_CREATED" | "FX_INTERNATIONAL_WITHDRAWAL_FAILED" | "FUNDING_SOURCE_FAILED" | "STAFF_FUNDING_SOURCE_REJECTED" | "STAFF_BUSINESS_USER_LIVE" | "NEW_BANK_TRANSFER_APPROVAL_REQUESTED" | "EDIT_AUTHORISATION_RULE_APPROVAL_REQUESTED" | "CREATE_AUTHORISATION_RULE_APPROVAL_REQUESTED" | "BUSINESS_SERVICE_FEE" | "BUSINESS_UNCOLLECTED_SERVICE_FEE";
                    /**
                     * String describing activity
                     * example:
                     * You paid John Doe
                     */
                    description?: string;
                    /**
                     * IP address related to acivity
                     * example:
                     * “89.101.154.45”
                     */
                    relatedIp?: string;
                    /**
                     * Date activity was created
                     * example:
                     * “2024-09-10T09:40:54.190Z”
                     */
                    dateCreated?: string;
                }[];
            }
            export interface $401 {
            }
        }
    }
    namespace GetAllPermissions {
        namespace Responses {
            /**
             * API App Permissions
             */
            export interface $200 {
                permissions?: {
                    /**
                     * Name of Permission allowed
                     */
                    name?: "PERM_BUSINESS_GET_ACCOUNT" | "PERM_BUSINESS_GET_ACCOUNT_TRANSACTIONS" | "PERM_BUSINESS_GET_ACCOUNT_TRANSACTIONS_FILTERED" | "PERM_BUSINESS_GET_ACCOUNTS" | "PERM_BUSINESS_GET_ACTIVITIES" | "PERM_BUSINESS_GET_APP_PERMISSIONS" | "PERM_BUSINESS_GET_APPS" | "PERM_BUSINESS_GET_CARDS" | "PERM_BUSINESS_GET_CONNECTION" | "PERM_BUSINESS_GET_CONNECTIONS" | "PERM_BUSINESS_GET_FUNDING_SOURCE" | "PERM_BUSINESS_GET_FUNDING_SOURCE_TRANSACTIONS" | "PERM_BUSINESS_GET_FUNDING_SOURCES" | "PERM_BUSINESS_GET_FX_RATE" | "PERM_BUSINESS_GET_IDENTITY_DOCUMENTS" | "PERM_BUSINESS_GET_LIMITS" | "PERM_BUSINESS_GET_ME" | "PERM_BUSINESS_GET_MY_AUTHENTICATORSECRET" | "PERM_BUSINESS_GET_MY_CARD_PIN" | "PERM_BUSINESS_GET_MY_CARD_TRANSACTIONS" | "PERM_BUSINESS_GET_MY_CARD_TRANSACTIONS_FILTERED" | "PERM_BUSINESS_GET_MY_PINGRID" | "PERM_BUSINESS_GET_OPERATING_COUNTRIES" | "PERM_BUSINESS_GET_MY_CARDS" | "PERM_BUSINESS_GET_PAYMENT_REQUEST_REPORTS" | "PERM_BUSINESS_GET_PAYMENT_REQUEST_TRANSACTIONS" | "PERM_BUSINESS_GET_PAYMENT_REQUESTS" | "PERM_BUSINESS_GET_PAYMENT_REQUEST_PAYMENTS" | "PERM_BUSINESS_GET_PUBLIC_PAYMENT_REQUEST" | "PERM_BUSINESS_GET_PAYMENT_REQUEST" | "PERM_BUSINESS_GET_RATES" | "PERM_BUSINESS_GET_SERVICES" | "PERM_BUSINESS_GET_USER" | "PERM_BUSINESS_GET_USER_ADDRESS" | "PERM_BUSINESS_GET_USERS" | "PERM_BUSINESS_GET_WEBHOOK_EVENT_TEST" | "PERM_BUSINESS_GET_WEBHOOK_TOKENS" | "PERM_BUSINESS_GET_WEBHOOKS" | "PERM_BUSINESS_GET_MY_NOTIFICATIONS_PUSH" | "PERM_BUSINESS_GET_MY_SCAAA" | "PERM_BUSINESS_GET_MY_SCAAAS" | "PERM_BUSINESS_GET_BATCHES" | "PERM_BUSINESS_GET_BATCH" | "PERM_BUSINESS_GET_BATCH_INTERNALTRANSFERS" | "PERM_BUSINESS_GET_BATCH_BANKTRANSFERS" | "PERM_BUSINESS_GET_BATCH_NEWPAYEES" | "PERM_BUSINESS_GET_BATCH_APPROVALS" | "PERM_BUSINESS_GET_MANDATE" | "PERM_BUSINESS_GET_MANDATES" | "PERM_BUSINESS_GET_DIRECT_DEBIT" | "PERM_BUSINESS_GET_DIRECT_DEBITS" | "PERM_BUSINESS_POST_ACCOUNT_WITHDRAWAL" | "PERM_BUSINESS_POST_ACCOUNTS" | "PERM_BUSINESS_POST_ACCOUNTS_TRANSFER" | "PERM_BUSINESS_POST_APPS" | "PERM_BUSINESS_POST_CARDS" | "PERM_BUSINESS_POST_CONNECTION_EXTERNAL_ACCOUNT_PAY" | "PERM_BUSINESS_POST_CONNECTION_PAY" | "PERM_BUSINESS_POST_CONNECTION_PAYMENT_REQUESTS" | "PERM_BUSINESS_POST_CONNECTIONS" | "PERM_BUSINESS_POST_FUNDING_SOURCES" | "PERM_BUSINESS_POST_FX_TRANSFER" | "PERM_BUSINESS_POST_IDENTITY_DOCUMENTS_POLICY" | "PERM_BUSINESS_POST_MY_CARD_ACTIVATE" | "PERM_BUSINESS_POST_MY_CARD_BLOCK" | "PERM_BUSINESS_POST_MY_CARD_UNBLOCK" | "PERM_BUSINESS_POST_MY_PIN_RESET" | "PERM_BUSINESS_POST_MY_PIN_RESET_INITIATE" | "PERM_BUSINESS_POST_PAYMENT_REQUEST" | "PERM_BUSINESS_POST_PIN" | "PERM_BUSINESS_POST_USERS" | "PERM_BUSINESS_POST_WEBHOOKS" | "PERM_BUSINESS_POST_BATCHES" | "PERM_BUSINESS_POST_BATCH_INTERNALTRANSFERS" | "PERM_BUSINESS_POST_BATCH_BANKTRANSFERS" | "PERM_BUSINESS_PUT_ACCOUNT" | "PERM_BUSINESS_PUT_APP" | "PERM_BUSINESS_PUT_CONNECTION" | "PERM_BUSINESS_PUT_FUNDING_SOURCE_ARCHIVE" | "PERM_BUSINESS_PUT_IDENTITY" | "PERM_BUSINESS_PUT_MY_AUTHENTICATORSECRET" | "PERM_BUSINESS_PUT_PAYMENT_REQUEST_STATUS" | "PERM_BUSINESS_PUT_REGISTRATION_DETAILS" | "PERM_BUSINESS_PUT_USER_DISABLE" | "PERM_BUSINESS_PUT_USER_RESEND_EMAIL" | "PERM_BUSINESS_PUT_MY_NOTIFICATION_PUSH" | "PERM_BUSINESS_PUT_OTHERS_NOTIFICATION_PUSH" | "PERM_BUSINESS_PUT_MY_SCAAA" | "PERM_BUSINESS_PUT_BATCH" | "PERM_BUSINESS_DELETE_CONNECTION" | "PERM_BUSINESS_DELETE_IDENTITY_DOCUMENT" | "PERM_BUSINESS_DELETE_WEBHOOK" | "PERM_BUSINESS_DELETE_BATCH" | "PERM_BUSINESS_DELETE_BATCH_INTERNALTRANSFERS" | "PERM_BUSINESS_DELETE_BATCH_BANKTRANSFERS" | "PERM_BUSINESS_GET_TERMINAL_PAYMENT_REQUEST" | "PERM_BUSINESS_GET_TERMINAL_PAYMENT_REQUEST_PAYMENTS" | "PERM_BUSINESS_GET_TERMINAL_ACCOUNTS";
                    requiresElevatedPrivilege?: boolean;
                }[];
            }
            export interface $401 {
            }
        }
    }
    namespace GetApiApplications {
        namespace Responses {
            export type $200 = {
                application?: {
                    /**
                     * This is the ID number of the API application
                     * example:
                     * 2404
                     */
                    applicationId?: number; // int64
                    /**
                     * This is the name given to the API application by the fire.com user
                     * example:
                     * Account Information Test
                     */
                    name?: string;
                    /**
                     * The ICAN of one of your Fire accounts. Restrict this API Application to a certan account.
                     */
                    ican?: number; // int64
                    /**
                     * This is the ID of client associated with the application
                     * example:
                     * G0919C06D23D-362A-H5D3-E76D8687D6AE
                     */
                    clientId?: string;
                    /**
                     * This is the refresh token associated with the application
                     * example:
                     * 9C332CF3-1687-4548-8E0E-55E4F0599800
                     */
                    refreshToken?: string;
                    /**
                     * The Client Key of the new API Application
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    clientKey?: string;
                    /**
                     * This is whether or not the application is enabled for usage
                     */
                    enabled?: boolean;
                    /**
                     * This is the number of approvals required for any application actions
                     * example:
                     * 1
                     */
                    numberOfApprovalsRequired?: number; // int64
                    /**
                     * This is number of approvals required for any payment batches
                     * example:
                     * 1
                     */
                    numberOfPaymentApprovalsRequired?: number; // int64
                    /**
                     * This is the number of approvals required for Payees
                     * example:
                     * 1
                     */
                    numberOfPayeeApprovalsRequired?: number; // int64
                    /**
                     * The date that this API Application can no longer be used.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    expiry?: string; // date-time
                }[];
            }[];
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetBatches {
        namespace Parameters {
            /**
             * The status of the batch if internal transfer.
             * example:
             * SUBMITTED
             */
            export type BatchStatus = "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
            /**
             * The type of the batch. Can be one of the listed enums.
             * example:
             * INTERNAL_TRANSFER
             */
            export type BatchTypes = "INTERNAL_TRANSFER" | "BANK_TRANSFER" | "INTERNATIONAL_TRANSFER" | "NEW_PAYEE";
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            export type Offset = number; // int64
            /**
             * You can order the batches by ascending or descending order.
             * example:
             * DESC
             */
            export type Order = "DESC" | "ASC";
            /**
             * You can order the batches by date. No other options at this time
             * example:
             * DATE
             */
            export type OrderBy = "DATE";
        }
        export interface QueryParameters {
            batchStatus?: /**
             * The status of the batch if internal transfer.
             * example:
             * SUBMITTED
             */
            Parameters.BatchStatus;
            batchTypes?: /**
             * The type of the batch. Can be one of the listed enums.
             * example:
             * INTERNAL_TRANSFER
             */
            Parameters.BatchTypes;
            orderBy?: /**
             * You can order the batches by date. No other options at this time
             * example:
             * DATE
             */
            Parameters.OrderBy;
            order?: /**
             * You can order the batches by ascending or descending order.
             * example:
             * DESC
             */
            Parameters.Order;
            offset?: /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            Parameters.Offset /* int64 */;
            limit?: /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            Parameters.Limit /* int64 */;
        }
        namespace Responses {
            /**
             * batchItems
             */
            export interface $200 {
                /**
                 * total number of batches returned
                 * example:
                 * 1
                 */
                total?: number; // int64
                items?: {
                    /**
                     * A UUID for this item.
                     * example:
                     * F2AF3F2B-4406-4199-B249-B354F2CC6019
                     */
                    batchItemUuid?: string;
                    /**
                     * status of the batch if internal trasnfer
                     * example:
                     * SUCCEEDED
                     */
                    status?: "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
                    /**
                     * The outcome of the attempted transaction.
                     */
                    result?: {
                        /**
                         * example:
                         * 500001
                         */
                        code?: number; // int64
                        /**
                         * example:
                         * SUCCESS
                         */
                        message?: string;
                    };
                    /**
                     * The datestamp the batch was created - ISO format - e.g. 2018-04-04T00:53:21.910Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * The fee charged by fire.com for the payment. In pence or cent.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * Any taxes/duty collected by fire.com for this payments (e.g. stamp duty etc). In pence or cent.
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * The amount of the transfer after fees and taxes. in pence or cent.
                     * example:
                     * 10000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * The Fire account ID of the source account.
                     * example:
                     * 2150
                     */
                    icanFrom?: number; // int64
                    /**
                     * The Fire account ID for the fire.com account the funds are sent to.
                     * example:
                     * 1002
                     */
                    icanTo?: number; // int64
                    /**
                     * The amount of funds to send. In cent or pence
                     * example:
                     * 10000
                     */
                    amount?: number; // int64
                    /**
                     * The reference on the transaction.
                     * example:
                     * Testing a transfer via batch
                     */
                    ref?: string;
                    /**
                     * The ID of the resulting payment in your account. Can be used to retrieve the transaction using the https://api.fire.com/business/v1/accounts/{accountId}/transactions/{refId} endpoint.
                     * example:
                     * 123782
                     */
                    refId?: number; // int64
                }[];
            }
        }
    }
    namespace GetDetailsSingleBatch {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        namespace Responses {
            /**
             * batch
             */
            export interface $200 {
                /**
                 * A UUID for this item.
                 * example:
                 * F2AF3F2B-4406-4199-B249-B354F2CC6019
                 */
                batchUuid?: string;
                /**
                 * The type of the batch - can be one of the listed enums
                 */
                type?: "INTERNAL_TRANSFER" | "BANK_TRANSFER" | "INTERNATIONAL_TRANSFER" | "NEW_PAYEE";
                /**
                 * status of the batch object
                 * example:
                 * COMPLETE
                 */
                status?: "PENDING_APPROVAL" | "REJECTED" | "COMPLETE" | "OPEN" | "CANCELLED" | "PENDING_PARENT_BATCH_APPROVAL" | "READY_FOR_PROCESSING" | "PROCESSING";
                /**
                 * A string describing where the batch originated - for instance the name of the API token that was used, or showing that the batch was automatically created by fire.com (in the case of a new payee batch).
                 * example:
                 * Payment API
                 */
                sourceName?: string;
                /**
                 * An optional name you give to the batch at creation time
                 * example:
                 * January 2018 Payroll
                 */
                batchName?: string;
                /**
                 * An optional job number you can give to the batch to help link it to your own system.
                 * example:
                 * 2018-01-PR
                 */
                jobNumber?: string;
                /**
                 * An optional POST URL that all events for this batch will be sent to.
                 * example:
                 * https://my.webserver.com/cb/payroll
                 */
                callbackUrl?: string;
                /**
                 * All payments in the batch must be the same currency.
                 * example:
                 * EUR, GBP, USD
                 */
                currency?: string;
                /**
                 * A count of the number of items in the batch
                 * example:
                 * 1
                 */
                numberOfItemsSubmitted?: number; // int64
                /**
                 * A sum of the value of items in the batch. Specified in pence or cent.
                 * example:
                 * 10000
                 */
                valueOfItemsSubmitted?: number; // int64
                /**
                 * Once processed, a count of the number of items that didn’t process successfully.
                 * example:
                 * 0
                 */
                numberOfItemsFailed?: number; // int64
                /**
                 * Once processed, a sum of the value of items that didn’t process successfully. Specified in pence or cent.
                 * example:
                 * 0
                 */
                valueOfItemsFailed?: number; // int64
                /**
                 * Once processed, a count of the number of items that processed successfully.
                 * example:
                 * 1
                 */
                numberOfItemsSucceeded?: number; // int64
                /**
                 * Once processed, a sum of the value of items that processed successfully. Specified in pence or cent.
                 * example:
                 * 10000
                 */
                valueOfItemsSucceeded?: number; // int64
                /**
                 * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                 * example:
                 * 2021-04-04T10:48:53.540Z
                 */
                lastUpdated?: string; // date-time
                /**
                 * The datestamp the batch was created - ISO format - e.g. 2018-04-04T00:53:21.910Z
                 * example:
                 * 2021-04-04T10:48:53.540Z
                 */
                dateCreated?: string; // date-time
            }
        }
    }
    namespace GetDirectDebitByUuid {
        namespace Parameters {
            /**
             * The uuid of the direct debit to retrieve.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type DirectDebitUuid = string;
        }
        export interface PathParameters {
            directDebitUuid: /**
             * The uuid of the direct debit to retrieve.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.DirectDebitUuid;
        }
        namespace Responses {
            /**
             * directDebit
             */
            export interface $200 {
                /**
                 * The UUID for the direct debit payment
                 * example:
                 * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                 */
                directDebitUuid?: string;
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * The statuses of the direct debit payments associated with the mandate.
                 * * 'RECIEVED' - Direct Debit has been recieved
                 * * 'REJECT_REQUESTED' - The direct debit has a rejected request associated with it
                 * * 'REJECT_READY_FOR_PROCESSING'
                 * * 'REJECT_RECORD_IN_PROGRESS'
                 * * 'REJECT_RECORDED'
                 * * 'REJECT_FILE_CREATED'
                 * * 'REJECT_FILE_SENT'
                 * * 'COLLECTED' - Direct debit collected
                 * * 'REFUND_REQUESTED' - Refund requested on direct debit
                 * * 'REFUND_RECORD_IN_PROGRESS' - Refund in progress on direct debit
                 * * 'REFUND_RECORDED'
                 * * 'REFUND_FILE_CREATED'
                 * * 'REFUND_FILE_SENT'
                 *
                 * example:
                 * RECIEVED
                 */
                status?: "RECIEVED" | "REJECT_REQUESTED" | "REJECT_READY_FOR_PROCESSING" | "REJECT_RECORD_IN_PROGRESS" | "REJECT_RECORDED" | "REJECT_FILE_CREATED" | "REJECT_FILE_SENT" | "COLLECTED" | "REFUND_REQUESTED" | "REFUND_RECORD_IN_PROGRESS" | "REFUND_RECORDED" | "REFUND_FILE_CREATED" | "REFUND_FILE_SENT";
                /**
                 * The type of the direct debit.
                 * example:
                 * FIRST_COLLECTION
                 */
                type?: "FIRST_COLLECTION" | "ONGOING_COLLECTION" | "REPRESENTED_COLLECTION" | "FINAL_COLLECTION";
                /**
                 * The UUID for the mandate
                 * example:
                 * f171b143-e3eb-47de-85a6-1c1f1108c701
                 */
                mandateUUid?: string;
                /**
                 * Set by party who sets up the direct debit.
                 * example:
                 * VODA-123456
                 */
                originatorReference?: string;
                /**
                 * The creator of the party who sets up the direct debit.
                 * example:
                 * Vodafone PLC
                 */
                originatorName?: string;
                /**
                 * The Alias of the party who sets up the direct debit.
                 * example:
                 * Three
                 */
                originatorAlias?: string;
                /**
                 * The direct debit reference.
                 * example:
                 * VODA-ABC453-1
                 */
                directDebitReference?: string;
                /**
                 * The ican of your fire account that the money was taken from
                 * example:
                 * 42
                 */
                targetIcan?: number; // int64
                /**
                 * The payee that was created when the DD was processed
                 * example:
                 * 12
                 */
                targetPayeeId?: number; // int64
                /**
                 * DDIC is a Direct Debit Indemnity Claim (i.e.a refund). If if the DD is requested to be refunded it is marked isDDIC true.
                 * example:
                 * false
                 */
                isDDIC?: boolean;
                /**
                 * Value of the payment
                 * example:
                 * 100
                 */
                amount?: number; // int64
                /**
                 * Reason why rejected
                 * example:
                 * eg. Instruction cancelled by payer
                 */
                schemeRejectReason?: string;
                /**
                 * The reject code returned by the bank indicating an issue with the direct debit. Each ARRUD code represents a rejection reason.
                 * example:
                 * for BACS (ARUDD) 0|1|2|3|5|6|7|8|9|A|B
                 */
                schemeRejectReasonCode?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B";
                /**
                 * Date the direct debit was last updated. Milliseconds since the epoch (1970).
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                lastUpdated?: string; // date-time
                /**
                 * Date the direct debit was created. Milliseconds since the epoch (1970).
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                dateCreated?: string; // date-time
            }
        }
    }
    namespace GetDirectDebitMandates {
        namespace Responses {
            /**
             * mandates
             */
            export interface $200 {
                /**
                 * Number of direct debits found
                 * example:
                 * 1
                 */
                total?: number; // int64
                mandates?: {
                    /**
                     * The UUID for the mandate
                     * example:
                     * 28d627c3-1889-44c8-ae59-6f6b20239260
                     */
                    mandateUuid?: string;
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * The status of the mandate.
                     * * 'CREATED'
                     * * 'LIVE'
                     * * 'REJECT_REQUESTED'
                     * * 'REJECT_RECORD_IN_PROGRESS'
                     * * 'REJECT_RECORDED'
                     * * 'REJECT_FILE_CREATED'
                     * * 'REJECT_FILE_SENT'
                     * * 'CANCEL_REQUESTED'
                     * * 'CANCEL_RECORD_IN_PROGRESS'
                     * * 'CANCEL_RECORDED'
                     * * 'CANCEL_FILE_CREATED'
                     * * 'CANCEL_FILE_SENT'
                     * * 'COMPLETE'
                     * * 'DORMANT'
                     *
                     * example:
                     * RECIEVED
                     */
                    status?: "CREATED" | "LIVE" | "REJECT_REQUESTED" | "REJECT_RECORD_IN_PROGRESS" | "REJECT_RECORDED" | "REJECT_FILE_CREATED" | "REJECT_FILE_SENT" | "CANCEL_REQUESTED" | "CANCEL_RECORD_IN_PROGRESS" | "CANCEL_RECORDED" | "CANCEL_FILE_CREATED" | "CANCEL_FILE_SENT" | "COMPLETE" | "DORMANT";
                    /**
                     * Set by party who sets up the direct debit.
                     * example:
                     * VODA-123456
                     */
                    originatorReference?: string;
                    /**
                     * The creator of the party who sets up the direct debit.
                     * example:
                     * Vodafone PLC
                     */
                    originatorName?: string;
                    /**
                     * The name of the alias
                     * example:
                     * Vodaphone PLC
                     */
                    originatorAlias?: string;
                    /**
                     * Logo url from party who sets up the direct debit.
                     * example:
                     * originatorLogoSmall
                     */
                    originatorLogoUrlSmall?: string;
                    /**
                     * Logo url from party who sets up the direct debit.
                     * example:
                     * originatorLogoLarge
                     */
                    originatorLogoUrlLarge?: string;
                    /**
                     * the reference of the mandate
                     * example:
                     * CRZ-102190123
                     */
                    mandateReference?: string;
                    /**
                     * The name of the alias
                     * example:
                     * Vodaphone
                     */
                    alias?: string;
                    /**
                     * Identifier for the fire.com account (assigned by fire.com)
                     * example:
                     * 1
                     */
                    targetIcan?: number; // int64
                    /**
                     * The number of direct debits collected
                     * example:
                     * 2
                     */
                    numberOfDirectDebitCollected?: number; // int64
                    /**
                     * The value of direct debits collected
                     * example:
                     * 2
                     */
                    valueOfDirectDebitCollected?: number; // int64
                    /**
                     * The value of largest direct debit collected
                     * example:
                     * 2
                     */
                    latestDirectDebitAmount?: number; // int64
                    /**
                     * The date of latest direct debit collected
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    latestDirectDebitDate?: string; // date-time
                    /**
                     * Rejection reason if transaction is rejected
                     * example:
                     * ACCOUNT_DOES_NOT_ACCEPT_DIRECT_DEBITS
                     */
                    fireRejectionReason?: "ACCOUNT_DOES_NOT_ACCEPT_DIRECT_DEBITS" | "DDIC" | "ACCOUNT_NOT_FOUND" | "ACCOUNT_NOT_LIVE" | "CUSTOMER_NOT_FOUND" | "BUSINESS_NOT_LIVE" | "BUSINESS_NOT_FULL" | "PERSONAL_USER_NOT_LIVE" | "PERSONAL_USER_NOT_FULL" | "MANDATE_ALREADY_EXISTS" | "MANDATE_WITH_DIFERENT_ACCOUNT" | "NULL_MANDATE_REFERENCE" | "INVALID_ACCOUNT_CURRENCY" | "INVALID_MANDATE_REFERENCE" | "REQUESTED_BY_CUSTOMER_VIA_SUPPORT" | "CUSTOMER_ACCOUNT_CLOSED" | "CUSTOMER_DECEASED" | "ACCOUNT_TRANSFERRED" | "MANDATE_NOT_FOUND" | "ACCOUNT_TRANSFERRED_TO_DIFFERENT_ACCOUNT" | "INVALID_ACCOUNT_TYPE" | "MANDATE_EXPIRED" | "MANDATE_CANCELLED" | "REQUESTED_BY_CUSTOMER";
                    /**
                     * Reason for cancelation
                     * example:
                     * e.g. Instruction cancelled by payer
                     */
                    schemeCancelReason?: string;
                    /**
                     * The cancelation code returned by the bank indicating an issue with the direct debit. Each ARRUD code represents a rejection reason.
                     * example:
                     * For BACS (ADDACS) - 0|1|2|3|B|C|D|E|R
                     */
                    schemeCancelReasonCode?: string;
                    /**
                     * Date the direct debit was last updated. Milliseconds since the epoch (1970).
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * Date the direct debit was created. Milliseconds since the epoch (1970).
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * Date the direct debit was completed. Milliseconds since the epoch (1970).
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    dateCompleted?: string; // date-time
                    /**
                     * Date the direct debit was canceled. Milliseconds since the epoch (1970).
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    dateCancelled?: string; // date-time
                }[];
            }
        }
    }
    namespace GetDirectDebitsForMandateUuid {
        namespace Parameters {
            export type MandateUuid = string;
        }
        export interface QueryParameters {
            mandateUuid: Parameters.MandateUuid;
        }
        namespace Responses {
            /**
             * directDebits
             */
            export interface $200 {
                /**
                 * Number of direct debits found
                 * example:
                 * 1
                 */
                total?: number; // int64
                directdebits?: {
                    /**
                     * The UUID for the direct debit payment
                     * example:
                     * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                     */
                    directDebitUuid?: string;
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * The statuses of the direct debit payments associated with the mandate.
                     * * 'RECIEVED' - Direct Debit has been recieved
                     * * 'REJECT_REQUESTED' - The direct debit has a rejected request associated with it
                     * * 'REJECT_READY_FOR_PROCESSING'
                     * * 'REJECT_RECORD_IN_PROGRESS'
                     * * 'REJECT_RECORDED'
                     * * 'REJECT_FILE_CREATED'
                     * * 'REJECT_FILE_SENT'
                     * * 'COLLECTED' - Direct debit collected
                     * * 'REFUND_REQUESTED' - Refund requested on direct debit
                     * * 'REFUND_RECORD_IN_PROGRESS' - Refund in progress on direct debit
                     * * 'REFUND_RECORDED'
                     * * 'REFUND_FILE_CREATED'
                     * * 'REFUND_FILE_SENT'
                     *
                     * example:
                     * RECIEVED
                     */
                    status?: "RECIEVED" | "REJECT_REQUESTED" | "REJECT_READY_FOR_PROCESSING" | "REJECT_RECORD_IN_PROGRESS" | "REJECT_RECORDED" | "REJECT_FILE_CREATED" | "REJECT_FILE_SENT" | "COLLECTED" | "REFUND_REQUESTED" | "REFUND_RECORD_IN_PROGRESS" | "REFUND_RECORDED" | "REFUND_FILE_CREATED" | "REFUND_FILE_SENT";
                    /**
                     * The type of the direct debit.
                     * example:
                     * FIRST_COLLECTION
                     */
                    type?: "FIRST_COLLECTION" | "ONGOING_COLLECTION" | "REPRESENTED_COLLECTION" | "FINAL_COLLECTION";
                    /**
                     * The UUID for the mandate
                     * example:
                     * f171b143-e3eb-47de-85a6-1c1f1108c701
                     */
                    mandateUUid?: string;
                    /**
                     * Set by party who sets up the direct debit.
                     * example:
                     * VODA-123456
                     */
                    originatorReference?: string;
                    /**
                     * The creator of the party who sets up the direct debit.
                     * example:
                     * Vodafone PLC
                     */
                    originatorName?: string;
                    /**
                     * The Alias of the party who sets up the direct debit.
                     * example:
                     * Three
                     */
                    originatorAlias?: string;
                    /**
                     * The direct debit reference.
                     * example:
                     * VODA-ABC453-1
                     */
                    directDebitReference?: string;
                    /**
                     * The ican of your fire account that the money was taken from
                     * example:
                     * 42
                     */
                    targetIcan?: number; // int64
                    /**
                     * The payee that was created when the DD was processed
                     * example:
                     * 12
                     */
                    targetPayeeId?: number; // int64
                    /**
                     * DDIC is a Direct Debit Indemnity Claim (i.e.a refund). If if the DD is requested to be refunded it is marked isDDIC true.
                     * example:
                     * false
                     */
                    isDDIC?: boolean;
                    /**
                     * Value of the payment
                     * example:
                     * 100
                     */
                    amount?: number; // int64
                    /**
                     * Reason why rejected
                     * example:
                     * eg. Instruction cancelled by payer
                     */
                    schemeRejectReason?: string;
                    /**
                     * The reject code returned by the bank indicating an issue with the direct debit. Each ARRUD code represents a rejection reason.
                     * example:
                     * for BACS (ARUDD) 0|1|2|3|5|6|7|8|9|A|B
                     */
                    schemeRejectReasonCode?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B";
                    /**
                     * Date the direct debit was last updated. Milliseconds since the epoch (1970).
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * Date the direct debit was created. Milliseconds since the epoch (1970).
                     * example:
                     * 2016-12-15T22:56:05.937Z
                     */
                    dateCreated?: string; // date-time
                }[];
            }
        }
    }
    namespace GetFXRates {
        namespace Parameters {
            /**
             * The currency the money is currently in
             */
            export type FromCurrency = string;
            /**
             * The currency the money is being converted to
             */
            export type ToCurrency = string;
        }
        export interface PathParameters {
            fromCurrency: /* The currency the money is currently in */ Parameters.FromCurrency;
            toCurrency: /* The currency the money is being converted to */ Parameters.ToCurrency;
        }
        namespace Responses {
            /**
             * Get FX Rates
             */
            export interface $200 {
                /**
                 * The currency the funds are currently in
                 * example:
                 * EUR
                 */
                fromCurrency?: string;
                /**
                 * The currency the funds will be exchanged to
                 * example:
                 * GBP
                 */
                toCurrency?: string;
                /**
                 * example:
                 * 8381
                 */
                rate4d?: number; // int64
            }
            export interface $401 {
            }
        }
    }
    namespace GetItemsBatchBankTransfer {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            export type Offset = number; // int64
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        export interface QueryParameters {
            offset?: /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            Parameters.Offset /* int64 */;
            limit?: /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            Parameters.Limit /* int64 */;
        }
        namespace Responses {
            /**
             * batchItems
             */
            export interface $200 {
                /**
                 * total number of batches returned
                 * example:
                 * 1
                 */
                total?: number; // int64
                items?: {
                    /**
                     * A UUID for this item.
                     * example:
                     * F2AF3F2B-4406-4199-B249-B354F2CC6019
                     */
                    batchItemUuid?: string;
                    /**
                     * status of the batch if internal trasnfer
                     * example:
                     * SUCCEEDED
                     */
                    status?: "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
                    /**
                     * The outcome of the attempted transaction.
                     */
                    result?: {
                        /**
                         * example:
                         * 500001
                         */
                        code?: number; // int64
                        /**
                         * example:
                         * SUCCESS
                         */
                        message?: string;
                    };
                    /**
                     * The datestamp the batch was created - ISO format - e.g. 2018-04-04T00:53:21.910Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * The fee charged by fire.com for the payment. In pence or cent.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * Any taxes/duty collected by fire.com for this payments (e.g. stamp duty etc). In pence or cent.
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * The amount of the transfer after fees and taxes. in pence or cent.
                     * example:
                     * 10000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * The Fire account ID of the source account.
                     * example:
                     * 2150
                     */
                    icanFrom?: number; // int64
                    /**
                     * The Fire account ID for the fire.com account the funds are sent to.
                     * example:
                     * 1002
                     */
                    icanTo?: number; // int64
                    /**
                     * The amount of funds to send. In cent or pence
                     * example:
                     * 10000
                     */
                    amount?: number; // int64
                    /**
                     * The reference on the transaction.
                     * example:
                     * Testing a transfer via batch
                     */
                    ref?: string;
                    /**
                     * The ID of the resulting payment in your account. Can be used to retrieve the transaction using the https://api.fire.com/business/v1/accounts/{accountId}/transactions/{refId} endpoint.
                     * example:
                     * 123782
                     */
                    refId?: number; // int64
                }[];
            }
        }
    }
    namespace GetItemsBatchInternalTrasnfer {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            export type Offset = number; // int64
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        export interface QueryParameters {
            offset?: /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            Parameters.Offset /* int64 */;
            limit?: /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            Parameters.Limit /* int64 */;
        }
        namespace Responses {
            /**
             * batchItems
             */
            export interface $200 {
                /**
                 * total number of batches returned
                 * example:
                 * 1
                 */
                total?: number; // int64
                items?: {
                    /**
                     * A UUID for this item.
                     * example:
                     * F2AF3F2B-4406-4199-B249-B354F2CC6019
                     */
                    batchItemUuid?: string;
                    /**
                     * status of the batch if internal trasnfer
                     * example:
                     * SUCCEEDED
                     */
                    status?: "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
                    /**
                     * The outcome of the attempted transaction.
                     */
                    result?: {
                        /**
                         * example:
                         * 500001
                         */
                        code?: number; // int64
                        /**
                         * example:
                         * SUCCESS
                         */
                        message?: string;
                    };
                    /**
                     * The datestamp the batch was created - ISO format - e.g. 2018-04-04T00:53:21.910Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * The fee charged by fire.com for the payment. In pence or cent.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * Any taxes/duty collected by fire.com for this payments (e.g. stamp duty etc). In pence or cent.
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * The amount of the transfer after fees and taxes. in pence or cent.
                     * example:
                     * 10000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * The Fire account ID of the source account.
                     * example:
                     * 2150
                     */
                    icanFrom?: number; // int64
                    /**
                     * The Fire account ID for the fire.com account the funds are sent to.
                     * example:
                     * 1002
                     */
                    icanTo?: number; // int64
                    /**
                     * The amount of funds to send. In cent or pence
                     * example:
                     * 10000
                     */
                    amount?: number; // int64
                    /**
                     * The reference on the transaction.
                     * example:
                     * Testing a transfer via batch
                     */
                    ref?: string;
                    /**
                     * The ID of the resulting payment in your account. Can be used to retrieve the transaction using the https://api.fire.com/business/v1/accounts/{accountId}/transactions/{refId} endpoint.
                     * example:
                     * 123782
                     */
                    refId?: number; // int64
                }[];
            }
        }
    }
    namespace GetItemsBatchInternationalTransfer {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            export type Offset = number; // int64
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        export interface QueryParameters {
            offset?: /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             * example:
             * 0
             */
            Parameters.Offset /* int64 */;
            limit?: /**
             * The number of records to return. Defaults to 10 - max is 200.
             * example:
             * 10
             */
            Parameters.Limit /* int64 */;
        }
        namespace Responses {
            /**
             * batchItems
             */
            export interface $200 {
                /**
                 * total number of batches returned
                 * example:
                 * 1
                 */
                total?: number; // int64
                items?: {
                    /**
                     * A UUID for this item.
                     * example:
                     * F2AF3F2B-4406-4199-B249-B354F2CC6019
                     */
                    batchItemUuid?: string;
                    /**
                     * status of the batch if internal trasnfer
                     * example:
                     * SUCCEEDED
                     */
                    status?: "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
                    /**
                     * The outcome of the attempted transaction.
                     */
                    result?: {
                        /**
                         * example:
                         * 500001
                         */
                        code?: number; // int64
                        /**
                         * example:
                         * SUCCESS
                         */
                        message?: string;
                    };
                    /**
                     * The datestamp the batch was created - ISO format - e.g. 2018-04-04T00:53:21.910Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * The fee charged by fire.com for the payment. In pence or cent.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * Any taxes/duty collected by fire.com for this payments (e.g. stamp duty etc). In pence or cent.
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * The amount of the transfer after fees and taxes. in pence or cent.
                     * example:
                     * 10000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * The Fire account ID of the source account.
                     * example:
                     * 2150
                     */
                    icanFrom?: number; // int64
                    /**
                     * The Fire account ID for the fire.com account the funds are sent to.
                     * example:
                     * 1002
                     */
                    icanTo?: number; // int64
                    /**
                     * The amount of funds to send. In cent or pence
                     * example:
                     * 10000
                     */
                    amount?: number; // int64
                    /**
                     * The reference on the transaction.
                     * example:
                     * Testing a transfer via batch
                     */
                    ref?: string;
                    /**
                     * The ID of the resulting payment in your account. Can be used to retrieve the transaction using the https://api.fire.com/business/v1/accounts/{accountId}/transactions/{refId} endpoint.
                     * example:
                     * 123782
                     */
                    refId?: number; // int64
                }[];
            }
        }
    }
    namespace GetLimits {
        namespace Responses {
            /**
             * limitInfo
             */
            export interface $200 {
                /**
                 * This is type of the limit itself
                 */
                limitType?: "STATIC_MONETARY" | "STATIC_COUNT" | "DAILY_MONETARY" | "DAILY_COUNT" | "TOTAL_MONETARY" | "TOTAL_COUNT";
                /**
                 * level
                 * Details of the level used for the limit
                 */
                level?: /**
                 * level
                 * Details of the level used for the limit
                 */
                {
                    /**
                     * Level Type (always "SERVICE")
                     * example:
                     * SERVICE
                     */
                    type?: string;
                    /**
                     * The service type for the limit
                     * example:
                     * CREATE_CARD
                     */
                    service?: string;
                } | {
                    /**
                     * Level type (always "SERVICE_GROUP")
                     * example:
                     * SERVICE_GROUP
                     */
                    type?: string;
                    /**
                     * serviceGroup
                     */
                    serviceGroup?: {
                        /**
                         * This is the service group type
                         * example:
                         * BUSINESS_WITHDRAWAL_FULL_DAILY_MONETARY_IE
                         */
                        type?: string;
                        /**
                         * This is a description of the service group type
                         * example:
                         * BUSINESS_WITHDRAWAL
                         */
                        description?: string;
                    };
                };
                /**
                 * country
                 */
                country?: {
                    /**
                     * The 2-letter code for the country - e.g. `IE`, `GP`...
                     * example:
                     * GB
                     */
                    code?: string;
                    /**
                     * The name of the country
                     * example:
                     * United Kingdom
                     */
                    description?: string;
                };
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * This the total availability based on the limit type defined
                 */
                value?: number; // int64
                /**
                 * This is the remaining availability based on the limit type defined
                 */
                remainingValue?: number; // int64
            }
            export interface $401 {
            }
        }
    }
    namespace GetListOfAspsps {
        namespace Parameters {
            export type Currency = string;
        }
        export interface QueryParameters {
            currency?: Parameters.Currency;
        }
        namespace Responses {
            /**
             * aspsps
             */
            export interface $200 {
                /**
                 * The total number of ASPSPs in the list.
                 * example:
                 * 10
                 */
                total?: number;
                aspsps?: {
                    /**
                     * The UUID associated with the ASPSP / bank.
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    aspspUuid?: string;
                    /**
                     * The name of the ASPSP / bank.
                     * example:
                     * Demo Bank
                     */
                    alias?: string;
                    /**
                     * A link to the ASPSP / bank's logo in SVG format.
                     * example:
                     * https://assets.fire.com/pisp/demo.svg
                     */
                    logoUrl?: string;
                    /**
                     * country
                     */
                    country?: {
                        /**
                         * The 2-letter code for the country - e.g. `IE`, `GP`...
                         * example:
                         * GB
                         */
                        code?: string;
                        /**
                         * The name of the country
                         * example:
                         * United Kingdom
                         */
                        description?: string;
                    };
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * The date the ASPSP / bank was created.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The date the ASPSP / bank was last updated.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    lastUpdated?: string; // date-time
                }[];
            }
        }
    }
    namespace GetListofApproversForBatch {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        namespace Responses {
            /**
             * batchApprovers
             */
            export interface $200 {
                approvals?: {
                    /**
                     * User id assigned by fire.com
                     * example:
                     * 3138
                     */
                    userId?: number; // int64
                    /**
                     * User email address
                     * example:
                     * jane.doe@example.com
                     */
                    emailAddress?: string;
                    /**
                     * example:
                     * Jane
                     */
                    firstName?: string;
                    /**
                     * example:
                     * Doe
                     */
                    lastName?: string;
                    /**
                     * example:
                     * 353871234567
                     */
                    mobileNumber?: string;
                    /**
                     * example:
                     * PENDING_APPROVAL
                     */
                    status?: string;
                    /**
                     * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    lastUpdated?: string; // date-time
                }[];
            }
        }
    }
    namespace GetListofCardTransactions {
        namespace Parameters {
            /**
             * The cardid of the card to retrieve the associated transactions
             */
            export type CardId = number; // int64
            /**
             * The number of records to return
             */
            export type Limit = number; // int64
            /**
             * The page of records to return
             */
            export type Offset = number; // int64
        }
        export interface PathParameters {
            cardId: /* The cardid of the card to retrieve the associated transactions */ Parameters.CardId /* int64 */;
        }
        export interface QueryParameters {
            limit?: /* The number of records to return */ Parameters.Limit /* int64 */;
            offset?: /* The page of records to return */ Parameters.Offset /* int64 */;
        }
        namespace Responses {
            export type $200 = {
                /**
                 * The total number of card transactions in the list.
                 * example:
                 * 1
                 */
                total?: number; // int64
                /**
                 * milisecond timestamp of date range to value.
                 * example:
                 * 1547744156603
                 */
                dateRangeTo?: number; // int64
                transactions?: {
                    /**
                     * The id of this side of the transaction (each transaction has two sides - a to and a from). This is used to get the details of the transaction.
                     * example:
                     * 30157
                     */
                    txnId?: number; // int64
                    /**
                     * The id of the transaction.
                     * example:
                     * 26774
                     */
                    refId?: number; // int64
                    /**
                     * identifier for the fire.com account (assigned by fire.com) This field is only used in the condensed version.
                     * example:
                     * 1951
                     */
                    ican?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * Amount of the transaction before the fees and taxes were applied.
                     * example:
                     * 5000
                     */
                    amountBeforeCharges?: number; // int64
                    /**
                     * The amount of the fee, if any.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * The amount of the tax, if any (e.g. Stamp duty for ATM transactions)
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * Net amount lodged or taken from the account after fees and charges were applied.
                     * example:
                     * 5000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                     * example:
                     * 8500
                     */
                    balance?: number; // int64
                    /**
                     * The comment/reference on the transaction
                     * example:
                     * Transfer to main account
                     */
                    myRef?: string;
                    /**
                     * The comment/reference on the transaction that appears on the recipients statement. Only for withdrawals
                     * example:
                     * From John Smith
                     */
                    yourRef?: string;
                    /**
                     * Date of the transaction
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    date?: string; // date-time
                    /**
                     * (FOP payments only) The FOP Payment Code that was used to make this payment.
                     * example:
                     * 1abcdefg
                     */
                    paymentRequestPublicCode?: string;
                    /**
                     * relatedCard
                     * Details of the card used (if applicable)
                     */
                    card?: {
                        cardId?: number; // int64
                        provider?: string;
                        alias?: string;
                        maskedPan?: string;
                        embossCardName?: string;
                        embossBusinessName?: string;
                        expiryDate?: string; // date-time
                    };
                    /**
                     * The type of the transaction:
                     * * `LODGEMENT` - Bank Transfer received
                     * * `PIS_LODGEMENT` - Fire Open Payments Lodgement received
                     * * `MANUAL_TRANSFER` - Manual Transfer to
                     * * `WITHDRAWAL` - Bank Transfer sent
                     * * `REVERSAL` - Credit Reversal
                     * * `DIRECT_DEBIT` - A direct debit.
                     * * `DIRECT_DEBIT_REPRESENTED` - A Direct Debit that was requested again after initially failing.
                     * * `DIRECT_DEBIT_REFUND` - A refund of a Direct debit.
                     * * `INTERNAL_TRANSFER_TO` - Internal Transfer sent (between two of my accounts of the same currency)
                     * * `INTERNAL_TRANSFER_FROM` - Internal Transfer received (between two of my accounts of the same currency)
                     * * `WITHDRAWAL_RETURNED` - Bank Transfer sent returned
                     * * `LODGEMENT_REVERSED` - Bank Transfer received returned
                     * * `FX_INTERNAL_TRANSFER_FROM` - FX Internal Transfer received (between two of my accounts of different currency)
                     * * `FX_INTERNAL_TRANSFER_TO` - FX Internal Transfer sent (between two of my accounts of different currency)
                     * * `CREATE_CARD` - The fee taken when a debit card is issued.
                     * * `ADD_ACCOUNT` - The fee taken when an account is created.
                     * * `CREATE_ADDITIONAL_USER` - The fee taken when an additional user is created.
                     * * `CARD_POS_CONTACT_DEBIT` - Card used in store; read by magnetic stripe or pin
                     * * `CARD_POS_CONTACT_CREDIT` - Card used in store; read by magnetic stripe or pin
                     * * `CARD_POS_CONTACTLESS_DEBIT` - Card used in store; read by NFC
                     * * `CARD_POS_CONTACTLESS_CREDIT` - Card used in store; read by NFC
                     * * `CARD_ECOMMERCE_DEBIT` - Card used on the internet
                     * * `CARD_ECOMMERCE_CREDIT` - Card used on the internet
                     * * `CARD_ATM_DEBIT` - Card used in an ATM
                     * * `CARD_ATM_CREDIT` - Card used in an ATM
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT` - Card used in store in non-processing currency; read by NFC
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT` - Card used in store in non-processing currency; read by NFC
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT	` - Card used on the internet in non-processing currency
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT` - Card used on the internet in non-processing currency
                     * * `CARD_INTERNATIONAL_ATM_DEBIT` - Card used in an ATM in non-processing currency
                     * * `CARD_INTERNATIONAL_ATM_CREDIT` - Card used in an ATM in non-processing currency
                     * * `CARD_POS_CONTACT_DEBIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
                     * * `CARD_POS_CONTACT_CREDIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
                     * * `CARD_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store; read by NFC - reversed
                     * * `CARD_POS_CONTACTLESS_CREDIT_REVERSAL` - Card used in store; read by NFC - reversed
                     * * `CARD_ECOMMERCE_DEBIT_REVERSAL	` - Card used on the internet - reversed
                     * * `CARD_ECOMMERCE_CREDIT_REVERSAL` - Card used on the internet - reversed
                     * * `CARD_ATM_DEBIT_REVERSAL` - Card used in an ATM - reversed
                     * * `CARD_ATM_CREDIT_REVERSAL` - Card used in an ATM - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
                     * * `CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
                     *
                     * example:
                     * WITHDRAWAL
                     */
                    type?: string;
                    /**
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    dateAcknowledged?: string; // date-time
                    /**
                     * fxTrade
                     * Details of the FX trade (if applicable)
                     */
                    fxTradeDetails?: {
                        /**
                         * currency which is being bought
                         * example:
                         * GBP
                         */
                        buyCurrency?: string;
                        /**
                         * currency which is being sold
                         * example:
                         * EUR
                         */
                        sellCurrency?: string;
                        /**
                         * type of trade - BUY or SELL
                         * example:
                         * SELL
                         */
                        fixedSide?: string;
                        /**
                         * amount of buyCurrency being bought
                         * example:
                         * 359
                         */
                        buyAmount?: number; // int64
                        /**
                         * amount of sellCurrency being sold
                         * example:
                         * 500
                         */
                        sellAmount?: number; // int64
                        /**
                         * exchange rate
                         * example:
                         * 7180
                         */
                        rate4d?: number; // int64
                        /**
                         * The FX provider used to make the trade.
                         * example:
                         * TCC
                         */
                        provider?: string;
                    };
                    /**
                     * batchItemDetails
                     * Details of the batch run if this transaction was part of a batch.
                     */
                    batchItemDetails?: {
                        /**
                         * The UUID for this batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchPublicUuid?: string;
                        /**
                         * The UUID for this item in the batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchItemPublicUuid?: string;
                        /**
                         * The optional name given to the batch at creation time.
                         * example:
                         * Payroll 2022-11
                         */
                        batchName?: string;
                        /**
                         * The optional job number given to the batch to link it to your own system.
                         * example:
                         * 2018-01-PR
                         */
                        jobNumber?: string;
                    };
                    /**
                     * directDebitDetails
                     * Details of the direct debit (if applicable)
                     */
                    directDebitDetails?: {
                        /**
                         * The UUID for the direct debit payment
                         * example:
                         * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                         */
                        directDebitUuid?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * f171b143-e3eb-47de-85a6-1c1f1108c701
                         */
                        mandateUUid?: string;
                        /**
                         * Set by party who sets up the direct debit.
                         * example:
                         * VODA-123456
                         */
                        originatorReference?: string;
                        /**
                         * The creator of the party who sets up the direct debit.
                         * example:
                         * Vodafone PLC
                         */
                        originatorName?: string;
                        /**
                         * The Alias of the party who sets up the direct debit.
                         * example:
                         * Three
                         */
                        originatorAlias?: string;
                        /**
                         * The direct debit reference.
                         * example:
                         * VODA-ABC453-1
                         */
                        directDebitReference?: string;
                        /**
                         * URL pointing to a small version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlSmall?: string;
                        /**
                         * URL pointing to a large version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlLarge?: string;
                        /**
                         * the reference of the mandate
                         * example:
                         * CRZ-102190123
                         */
                        mandateReference?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * 28d627c3-1889-44c8-ae59-6f6b20239260
                         */
                        mandateUuid?: string;
                    };
                    /**
                     * proprietarySchemeDetails
                     * Extra details about the transaction based on the scheme used to make the payment.
                     */
                    proprietarySchemeDetails?: {
                        /**
                         * the type of proprietary scheme - SCT for SEPA, FPS for Faster Payments etc.
                         * example:
                         * SCT
                         */
                        type?: string;
                        /**
                         * the scheme proprietary data - key pairs separated by | and key/values separated by ^
                         * example:
                         * remittanceInfoUnstructured^FIRE440286865OD1|instructionId^O223151336499079
                         */
                        data?: string;
                    }[];
                    /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    relatedParty?: /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    {
                        type?: "FIRE_ACCOUNT";
                        account?: {
                            /**
                             * identifier for the fire.com account (assigned by fire.com)
                             * example:
                             * 42
                             */
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                        };
                    } | {
                        type?: "EXTERNAL_ACCOUNT";
                        account?: {
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "WITHDRAWAL_ACCOUNT";
                        account?: {
                            /**
                             * The ID of the payee.
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The name of the payee.
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * The sort code of the payee (for GBP payments)
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the payee (for GBP payments)
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the payee (for EUR payments)
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The IBAN of the payee (for EUR payments)
                             * example:
                             * IE76CPAY99119900000000
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "CARD_MERCHANT" | "CARD_ATM";
                        cardMerchant?: {
                            /**
                             * example:
                             * 06011329
                             */
                            acquirerIdDe32?: string;
                            additionalAmtDe54?: string;
                            /**
                             * example:
                             * 177449
                             */
                            authCodeDe38?: string;
                            /**
                             * example:
                             * -1000
                             */
                            billAmt?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            billCcy?: string;
                            expiryDate?: string;
                            /**
                             * example:
                             * 5521
                             */
                            mccCode?: string;
                            /**
                             * example:
                             * 013152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 000001000030037299999
                             */
                            posDataDe61?: string;
                            /**
                             * example:
                             * 80266721
                             */
                            posTermnlDe41?: string;
                            /**
                             * example:
                             * 051
                             */
                            posDataDe22?: string;
                            /**
                             * example:
                             * 000000
                             */
                            procCode?: string;
                            /**
                             * example:
                             * 00
                             */
                            respCodeDe39?: string;
                            /**
                             * example:
                             * 010900006720
                             */
                            retRefNoDe37?: string;
                            /**
                             * example:
                             * 00
                             */
                            statusCode?: string;
                            /**
                             * example:
                             * 976307363
                             */
                            token?: string;
                            /**
                             * example:
                             * 1000
                             */
                            txnAmt4d?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            txnCcy?: string;
                            /**
                             * example:
                             * IRL
                             */
                            txnCtry?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            txnDesc?: string;
                            /**
                             * example:
                             * A
                             */
                            txnStatCode?: string;
                            /**
                             * example:
                             * A
                             */
                            txnType?: string;
                            /**
                             * example:
                             * 010X610500000
                             */
                            additionalDataDe48?: string;
                            /**
                             * example:
                             * N
                             */
                            authorisedByGps?: string;
                            /**
                             * example:
                             * N
                             */
                            avsResult?: string;
                            /**
                             * example:
                             * 0100
                             */
                            mtId?: string;
                            recordDataDe120?: string;
                            additionalDataDe124?: string;
                        };
                    };
                    /**
                     * An internal Fire reference for the transaction (UUID)
                     * example:
                     * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                     */
                    eventUuid?: string;
                }[];
            }[];
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetListofCards {
        namespace Responses {
            /**
             * cards
             */
            export interface $200 {
                cards?: {
                    /**
                     * Whether the card is blocked or not
                     * example:
                     * false
                     */
                    blocked?: boolean;
                    /**
                     * card id assigned by fire.com
                     * example:
                     * 51
                     */
                    cardId?: number; // int64
                    /**
                     * The date-time the card was created
                     * example:
                     * 2017-01-19T16:38:15.803Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * card user email address
                     * example:
                     * user@example.com
                     */
                    emailAddress?: string;
                    /**
                     * card expiry date
                     * example:
                     * 2019-01-31T00:00:00.000Z
                     */
                    expiryDate?: string; // date-time
                    /**
                     * card user first name
                     * example:
                     * John
                     */
                    firstName?: string;
                    /**
                     * card user last name
                     * example:
                     * Doe
                     */
                    lastName?: string;
                    /**
                     * identifier for the eur fire.com account (assigned by fire.com)
                     * example:
                     * 2150
                     */
                    eurIcan?: number; // int64
                    /**
                     * identifier for the gbp fire.com account (assigned by fire.com)
                     * example:
                     * 2152
                     */
                    gbpIcan?: number; // int64
                    /**
                     * card number (masked)
                     * example:
                     * 537455******1111
                     */
                    maskedPan?: string;
                    /**
                     * card provider
                     * example:
                     * MASTERCARD
                     */
                    provider?: "MASTERCARD";
                    /**
                     * card status
                     * example:
                     * LIVE
                     */
                    status?: "LIVE" | "CREATED_ACTIVE" | "CREATED_INACTIVE" | "DEACTIVATED";
                    /**
                     * reason for card status
                     * example:
                     * LOST_CARD
                     */
                    statusReason?: "LOST_CARD" | "STOLEN_CARD" | "CARD_DESTROYED";
                    /**
                     * card user id assigned by fire.com
                     * example:
                     * 3138
                     */
                    userId?: number; // int64
                }[];
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetMandate {
        namespace Parameters {
            /**
             * The uuid of the mandate to retrieve.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type MandateUuid = string;
        }
        export interface PathParameters {
            mandateUuid: /**
             * The uuid of the mandate to retrieve.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.MandateUuid;
        }
        namespace Responses {
            /**
             * mandate
             */
            export interface $200 {
                /**
                 * The UUID for the mandate
                 * example:
                 * 28d627c3-1889-44c8-ae59-6f6b20239260
                 */
                mandateUuid?: string;
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * The status of the mandate.
                 * * 'CREATED'
                 * * 'LIVE'
                 * * 'REJECT_REQUESTED'
                 * * 'REJECT_RECORD_IN_PROGRESS'
                 * * 'REJECT_RECORDED'
                 * * 'REJECT_FILE_CREATED'
                 * * 'REJECT_FILE_SENT'
                 * * 'CANCEL_REQUESTED'
                 * * 'CANCEL_RECORD_IN_PROGRESS'
                 * * 'CANCEL_RECORDED'
                 * * 'CANCEL_FILE_CREATED'
                 * * 'CANCEL_FILE_SENT'
                 * * 'COMPLETE'
                 * * 'DORMANT'
                 *
                 * example:
                 * RECIEVED
                 */
                status?: "CREATED" | "LIVE" | "REJECT_REQUESTED" | "REJECT_RECORD_IN_PROGRESS" | "REJECT_RECORDED" | "REJECT_FILE_CREATED" | "REJECT_FILE_SENT" | "CANCEL_REQUESTED" | "CANCEL_RECORD_IN_PROGRESS" | "CANCEL_RECORDED" | "CANCEL_FILE_CREATED" | "CANCEL_FILE_SENT" | "COMPLETE" | "DORMANT";
                /**
                 * Set by party who sets up the direct debit.
                 * example:
                 * VODA-123456
                 */
                originatorReference?: string;
                /**
                 * The creator of the party who sets up the direct debit.
                 * example:
                 * Vodafone PLC
                 */
                originatorName?: string;
                /**
                 * The name of the alias
                 * example:
                 * Vodaphone PLC
                 */
                originatorAlias?: string;
                /**
                 * Logo url from party who sets up the direct debit.
                 * example:
                 * originatorLogoSmall
                 */
                originatorLogoUrlSmall?: string;
                /**
                 * Logo url from party who sets up the direct debit.
                 * example:
                 * originatorLogoLarge
                 */
                originatorLogoUrlLarge?: string;
                /**
                 * the reference of the mandate
                 * example:
                 * CRZ-102190123
                 */
                mandateReference?: string;
                /**
                 * The name of the alias
                 * example:
                 * Vodaphone
                 */
                alias?: string;
                /**
                 * Identifier for the fire.com account (assigned by fire.com)
                 * example:
                 * 1
                 */
                targetIcan?: number; // int64
                /**
                 * The number of direct debits collected
                 * example:
                 * 2
                 */
                numberOfDirectDebitCollected?: number; // int64
                /**
                 * The value of direct debits collected
                 * example:
                 * 2
                 */
                valueOfDirectDebitCollected?: number; // int64
                /**
                 * The value of largest direct debit collected
                 * example:
                 * 2
                 */
                latestDirectDebitAmount?: number; // int64
                /**
                 * The date of latest direct debit collected
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                latestDirectDebitDate?: string; // date-time
                /**
                 * Rejection reason if transaction is rejected
                 * example:
                 * ACCOUNT_DOES_NOT_ACCEPT_DIRECT_DEBITS
                 */
                fireRejectionReason?: "ACCOUNT_DOES_NOT_ACCEPT_DIRECT_DEBITS" | "DDIC" | "ACCOUNT_NOT_FOUND" | "ACCOUNT_NOT_LIVE" | "CUSTOMER_NOT_FOUND" | "BUSINESS_NOT_LIVE" | "BUSINESS_NOT_FULL" | "PERSONAL_USER_NOT_LIVE" | "PERSONAL_USER_NOT_FULL" | "MANDATE_ALREADY_EXISTS" | "MANDATE_WITH_DIFERENT_ACCOUNT" | "NULL_MANDATE_REFERENCE" | "INVALID_ACCOUNT_CURRENCY" | "INVALID_MANDATE_REFERENCE" | "REQUESTED_BY_CUSTOMER_VIA_SUPPORT" | "CUSTOMER_ACCOUNT_CLOSED" | "CUSTOMER_DECEASED" | "ACCOUNT_TRANSFERRED" | "MANDATE_NOT_FOUND" | "ACCOUNT_TRANSFERRED_TO_DIFFERENT_ACCOUNT" | "INVALID_ACCOUNT_TYPE" | "MANDATE_EXPIRED" | "MANDATE_CANCELLED" | "REQUESTED_BY_CUSTOMER";
                /**
                 * Reason for cancelation
                 * example:
                 * e.g. Instruction cancelled by payer
                 */
                schemeCancelReason?: string;
                /**
                 * The cancelation code returned by the bank indicating an issue with the direct debit. Each ARRUD code represents a rejection reason.
                 * example:
                 * For BACS (ADDACS) - 0|1|2|3|B|C|D|E|R
                 */
                schemeCancelReasonCode?: string;
                /**
                 * Date the direct debit was last updated. Milliseconds since the epoch (1970).
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                lastUpdated?: string; // date-time
                /**
                 * Date the direct debit was created. Milliseconds since the epoch (1970).
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                dateCreated?: string; // date-time
                /**
                 * Date the direct debit was completed. Milliseconds since the epoch (1970).
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                dateCompleted?: string; // date-time
                /**
                 * Date the direct debit was canceled. Milliseconds since the epoch (1970).
                 * example:
                 * 2016-12-15T22:56:05.937Z
                 */
                dateCancelled?: string; // date-time
            }
        }
    }
    namespace GetNewPayeeBatch {
        namespace Parameters {
            /**
             * The UUID for the batch
             * example:
             * 2DF456A-1234-5ABC-BAC0-C0CED23544F1
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The UUID for the batch
             * example:
             * 2DF456A-1234-5ABC-BAC0-C0CED23544F1
             */
            Parameters.BatchUuid;
        }
        namespace Responses {
            /**
             * New Payee Batch
             */
            export interface $200 {
                /**
                 * The total number of new Payees
                 * example:
                 * 1
                 */
                total?: number; // int64
                /**
                 * items
                 */
                items?: {
                    /**
                     * A UUID for this item
                     * example:
                     * F2AF3F2B-4406-4199-B249-B354F2CC6019
                     */
                    batchItemUuid?: string;
                    /**
                     * status of the batch
                     * example:
                     * SUCCEEDED
                     */
                    status?: "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
                    /**
                     * result
                     */
                    result?: {
                        /**
                         * This is the code returned indicating response type
                         * example:
                         * 510001
                         */
                        code?: number; // int64
                        /**
                         * This is the message indicating whether the call was a success
                         * example:
                         * SUCCESS
                         */
                        message?: string;
                    };
                    /**
                     * The datestamp the batch was created - ISO format - e.g. 2018-04-04T00:53:21.910Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The datestamp of the last action on this batch - ISO format - e.g. 2018-04-04T10:48:53.540Z
                     * example:
                     * 2021-04-04T10:48:53.540Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * International Banking Account number belonging to the new Payees
                     * example:
                     * IE81AIBK96735642764123
                     */
                    iban?: string;
                    /**
                     * The name on the account of the new payee
                     * example:
                     * John Doe
                     */
                    accountName?: string;
                    /**
                     * The name of the new payee
                     * example:
                     * John Doe
                     */
                    accountHolderName?: string;
                }[];
            }
        }
    }
    namespace GetPayeeAccountInfo {
        namespace Parameters {
            /**
             * The unique 6-character code identifying the payee.
             * example:
             * 346748
             */
            export type FundingSrcId = string;
        }
        export interface PathParameters {
            fundingSrcId: /**
             * The unique 6-character code identifying the payee.
             * example:
             * 346748
             */
            Parameters.FundingSrcId;
        }
        namespace Responses {
            /**
             * Payee Account Details
             */
            export interface $200 {
                /**
                 * The status of the payee. Only payees in LIVE status can be selected as a destination account for an outgoing payment. * 'CREATED' - The payee has been set-up via Bank Transfer Received, Direct Debit, or Open Banking. This payee must be converted to LIVE status to select as a destination account for an outgoing payment. * 'LIVE' - The payee can be selected as a destination account for an outgoing payment. * 'CLOSED' * 'ARCHIVED' - The payee has been deleted and must be added again to be selected as a destination account for an outgoing payment.
                 * example:
                 * LIVE
                 */
                status?: "CREATED" | "LIVE" | "CLOSED" | "ARCHIVED";
                /**
                 * The alias attributed to the payee, usually set by the user when creating the payee.
                 * example:
                 * Jane Doe
                 */
                accountName?: string;
                /**
                 * The name on the payee bank account.
                 * example:
                 * Jane Doe
                 */
                accountHolderName?: string;
                /**
                 * The Sort Code of the account if currency is GBP.
                 * example:
                 * 991199
                 */
                nsc?: string;
                /**
                 * The Account Number of the account if currency is GBP.
                 * example:
                 * 12345678
                 */
                accountNumber?: string;
                /**
                 * The BIC of the account if currency is EUR.
                 * example:
                 * BOFIIE2DXXX
                 */
                bic?: string;
                /**
                 * The IBAN of the account if currency is EUR.
                 * example:
                 * IE86BOFI90535211111111
                 */
                iban?: string;
                /**
                 * Combination of Payee's BIC and IBAN
                 * example:
                 * BOFIIE2DXXX / IE86BOFI90535211111111
                 */
                combinedAccountNumbers?: string;
                /**
                 * Creation source of the payee
                 */
                createdBy?: "FIRE_OPEN_PAYMENT" | "CUSTOMER" | "LODGEMENT" | "DIRECT DEBIT" | "OPEN_BANKING" | "FIRE_DIRECT" | "PAYMENT_ORIGINATING_OVERSEAS";
                /**
                 * The date the payee was created. ISO Date Time.
                 * example:
                 * 2024-06-21T09:56:47.300Z
                 */
                dateCreated?: string; // date-time
            }
        }
    }
    namespace GetPayeeTransactionInfo {
        namespace Parameters {
            /**
             * The unique 6-character code identifying the payee.
             * example:
             * 346748
             */
            export type FundingSrcId = string;
        }
        export interface PathParameters {
            fundingSrcId: /**
             * The unique 6-character code identifying the payee.
             * example:
             * 346748
             */
            Parameters.FundingSrcId;
        }
        namespace Responses {
            /**
             * Payee Transaction Details
             */
            export interface $200 {
                /**
                 * Range of dates for transactions included
                 * example:
                 * 1726146402447
                 */
                dateRangeTo?: number; // int64
                /**
                 * The total number of transactions in the list.
                 * example:
                 * 1
                 */
                total?: number; // int64
                transactions?: {
                    /**
                     * The id of this side of the transaction (each transaction has two sides - a to and a from). This is used to get the details of the transaction.
                     * example:
                     * 10859123
                     */
                    txnId?: number; // int64
                    /**
                     * The id of the transaction.
                     * example:
                     * 9544613
                     */
                    redId?: number; // int64
                    /**
                     * identifier for the fire.com account (assigned by fire.com) This field is only used in the condensed version.
                     * example:
                     * 67204
                     */
                    ican?: number; // int64
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    }[];
                }[];
            }
        }
    }
    namespace GetPayees {
        namespace Parameters {
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             */
            export type Offset = number; // int64
        }
        export interface QueryParameters {
            limit?: /* The number of records to return. Defaults to 10 - max is 200. */ Parameters.Limit /* int64 */;
            offset?: /* The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59. */ Parameters.Offset /* int64 */;
        }
        namespace Responses {
            /**
             * payeeBankAccounts
             */
            export interface $200 {
                /**
                 * The total number of payees in the list.
                 * example:
                 * 1
                 */
                total?: number;
                fundingSources?: {
                    /**
                     * Identifier for the fire.com payee bank account (assigned by fire.com).
                     * example:
                     * 742
                     */
                    id?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * The status of the payee. Only payees in LIVE status can be selected as a destination account for an outgoing payment.
                     *   * 'CREATED' - The payee has been set-up via Bank Transfer Received, Direct Debit, or Open Banking. This payee must be converted to LIVE status to select as a destination account for an outgoing payment.
                     *   * 'LIVE' - The payee can be selected as a destination account for an outgoing payment.
                     *   * 'CLOSED'
                     *   * 'ARCHIVED' - The payee has been deleted and must be added again to be selected as a destination account for an outgoing payment.
                     *
                     * example:
                     * LIVE
                     */
                    status?: "CREATED" | "LIVE" | "CLOSED" | "ARCHIVED";
                    /**
                     * The alias attributed to the payee, usually set by the user when creating the payee.
                     * example:
                     * Joe
                     */
                    accountName?: string;
                    /**
                     * The name on the payee bank account.
                     * example:
                     * Joe Bloggs
                     */
                    accountHolderName?: string;
                    /**
                     * The BIC of the account if currency is EUR.
                     * example:
                     * BOFIIE2DXXX
                     */
                    bic?: string;
                    /**
                     * The IBAN of the account if currency is EUR.
                     * example:
                     * IE86BOFI90535211111111
                     */
                    iban?: string;
                    /**
                     * The Sort Code of the account if currency is GBP.
                     * example:
                     * 998822
                     */
                    nsc?: string;
                    /**
                     * The Account Number of the account if currency is GBP.
                     * example:
                     * 12345678
                     */
                    accountNumber?: string;
                    /**
                     * The creation source of the payee.
                     * example:
                     * CUSTOMER
                     */
                    createdBy?: "CUSTOMER" | "LODGEMENT" | "DIRECT_DEBIT" | "OPEN_BANKING" | "FIRE_OPEN_PAYMENT" | "FIRE_DIRECT" | "PAYMENT_ORIGINATING_OVERSEAS";
                    /**
                     * The date the payee was created. ISO Date Time.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    dateCreated?: string; // date-time
                }[];
            }
        }
    }
    namespace GetPaymentDetails {
        namespace Parameters {
            /**
             * The unique id for the transaction.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type PaymentUuid = string;
        }
        export interface PathParameters {
            paymentUuid: /**
             * The unique id for the transaction.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.PaymentUuid;
        }
        namespace Responses {
            /**
             * paymentRequestPayment
             */
            export interface $200 {
                /**
                 * The type of Fire Open Payment that was created
                 */
                type?: "OTHER";
                /**
                 * The code that was returned when you created the payment request.
                 * example:
                 * 1234abcd
                 */
                paymentRequestCode?: string;
                /**
                 * The type of payment request payment
                 */
                transactionType?: "REFUND_REQUEST" | "PAYMENT";
                /**
                 * The unique Open Banking payment ID assigned to this payment.
                 * example:
                 * FIRE1234567890
                 */
                endToEndId?: string;
                /**
                 * A unique id for the transaction.
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                paymentUuid?: string;
                /**
                 * The original payment that this payment is linked to
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                relatedPaymentUuid?: string;
                /**
                 * The status of the transaction
                 */
                status?: "AWAITING_AUTHORISATION" | "AUTHORISED" | "AWAITING_MULTI_AUTHORISATION" | "NOT_AUTHORISED" | "PAID" | "REJECTED" | "ACCEPTED" | "RECEIVED";
                /**
                 * The reason for the refund.
                 * example:
                 * Gym Closed for repairs.
                 */
                reason?: string;
                /**
                 * The requested amount (before Fire fees and taxes). Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                 * example:
                 * 1000
                 */
                amountBeforeCharges?: number; // int64
                /**
                 * The fee for the payment
                 * example:
                 * 1000
                 */
                feeAmount?: number; // int64
                /**
                 * The amount after Fire fees and taxes. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                 * example:
                 * 1000
                 */
                amountAfterCharges?: number; // int64
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * An internal description of the request.
                 * example:
                 * Fees
                 */
                myRef?: string;
                /**
                 * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
                 * example:
                 * Gym Fees Oct 2020
                 */
                description?: string;
                /**
                 * The merchant return URL where the customer will be re-directed to with the result of the transaction.
                 * example:
                 * https://example.com/callback
                 */
                returnUrl?: string;
                /**
                 * A URL to be called in the background with the details of the payment after the payment is complete
                 * example:
                 * https://example.com/webhook
                 */
                webhookUrl?: string;
                /**
                 * The ID of the related transaction in your fire account.
                 * example:
                 * 41234
                 */
                relatedAccountTxnId?: number; // int64
                /**
                 * The ID of the payee making the payment.
                 * example:
                 * 41234
                 */
                relatedPayeeId?: number; // int64
                /**
                 * The date the funds were received into your fire account.
                 * example:
                 * 2020-10-22T07:48:56.460Z
                 */
                dateFundsReceived?: string; // date-time
                /**
                 * This is the date the payment was initiated.
                 * example:
                 * 2020-10-22T07:48:56.460Z
                 */
                dateCreated?: string; // date-time
                /**
                 * The date payment was last updated.
                 * example:
                 * 2019-08-22T07:48:56.460Z
                 */
                lastUpdated?: string; // date-time
                /**
                 * orderDetails
                 */
                orderDetails?: {
                    /**
                     * Your Merchant Number (if applicable).
                     * example:
                     * 1234567
                     */
                    merchantNumber?: string;
                    /**
                     * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                     * example:
                     * 6c28a47d-4502-4111
                     */
                    orderId?: string;
                    /**
                     * Use this field to store a product id for the transaction (for example).
                     * example:
                     * ZFDAA-1221
                     */
                    productId?: string;
                    /**
                     * Use this field to store a customer number for the transaction (for example).
                     * example:
                     * 123645
                     */
                    customerNumber?: string;
                    /**
                     * Use this field to store any other reference for the transaction (for example, a phone number).
                     * example:
                     * John Doe
                     */
                    variableReference?: string;
                    /**
                     * This is your own comment for the transaction.
                     * example:
                     * Additional comments about the transaction
                     */
                    comment1?: string;
                    /**
                     * This is your own comment for the transaction.
                     * example:
                     * Additional comments about the transaction
                     */
                    comment2?: string;
                    /**
                     * This is a reference you use to uniquely identify each of your customers.
                     * example:
                     * 08303863544
                     */
                    merchantCustomerIdentification?: string;
                    /**
                     * The first line of the delivery address.
                     * example:
                     * 12 The Street
                     */
                    deliveryAddressLine1?: string;
                    /**
                     * The second line of the delivery address.
                     * example:
                     * The Way
                     */
                    deliveryAddressLine2?: string;
                    /**
                     * Delivery address city
                     * example:
                     * London
                     */
                    deliveryCity?: string;
                    /**
                     * Delivery address post code
                     * example:
                     * EC15155
                     */
                    deliveryPostCode?: string;
                    /**
                     * 2-digit code for the country
                     * example:
                     * GB
                     */
                    deliveryCountry?: string;
                };
                /**
                 * to
                 */
                to?: {
                    /**
                     * the type of destination account.
                     * example:
                     * FIRE_ACCOUNT
                     */
                    type?: "FIRE_ACCOUNT" | "WITHDRAWAL_ACCOUNT";
                    /**
                     * relatedPartyFireAccount
                     */
                    account?: {
                        type?: "FIRE_ACCOUNT";
                        account?: {
                            /**
                             * identifier for the fire.com account (assigned by fire.com)
                             * example:
                             * 42
                             */
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                        };
                    };
                };
                /**
                 * aspsp
                 */
                bank?: {
                    /**
                     * The UUID associated with the ASPSP / bank.
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    aspspUuid?: string;
                    /**
                     * The name of the ASPSP / bank.
                     * example:
                     * Demo Bank
                     */
                    alias?: string;
                    /**
                     * A link to the ASPSP / bank's logo in SVG format.
                     * example:
                     * https://assets.fire.com/pisp/demo.svg
                     */
                    logoUrl?: string;
                    /**
                     * country
                     */
                    country?: {
                        /**
                         * The 2-letter code for the country - e.g. `IE`, `GP`...
                         * example:
                         * GB
                         */
                        code?: string;
                        /**
                         * The name of the country
                         * example:
                         * United Kingdom
                         */
                        description?: string;
                    };
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * The date the ASPSP / bank was created.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The date the ASPSP / bank was last updated.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    lastUpdated?: string; // date-time
                };
                /**
                 * The ID assigned by the ASPSP to this payment.
                 * example:
                 * sdp-1-66ebd30c-c0e1-4a54-9865-f2a7bfedabcf
                 */
                domesticPaymentId?: string;
                /**
                 * whether or not a receipt option was offered to the payer.
                 * example:
                 * true
                 */
                allowFopReceipt?: boolean;
            }
        }
    }
    namespace GetPaymentDetailsv2 {
        namespace Parameters {
            /**
             * The unique id for the transaction.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type PaymentUuid = string;
        }
        export interface PathParameters {
            paymentUuid: /**
             * The unique id for the transaction.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.PaymentUuid;
        }
        namespace Responses {
            /**
             * paymentRequestPayment
             */
            export interface $200 {
                /**
                 * The type of Fire Open Payment that was created
                 */
                type?: "OTHER" | "DIRECT" | "SHAREABLE" | "PARTY_TO_PARTY" | "BILL_PAYMENT" | "ECOMMERCE_GOODS" | "ECOMMERCE_SERVICES";
                /**
                 * The code that was returned when you created the payment request.
                 * example:
                 * 1234abcd
                 */
                paymentRequestCode?: string;
                /**
                 * The type of payment request payment
                 */
                transactionType?: "REFUND_REQUEST" | "PAYMENT";
                /**
                 * The unique Open Banking payment ID assigned to this payment.
                 * example:
                 * FIRE1234567890
                 */
                endToEndId?: string;
                /**
                 * A unique id for the transaction.
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                paymentUuid?: string;
                /**
                 * The original payment that this payment is linked to
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                relatedPaymentUuid?: string;
                /**
                 * The status of the transaction
                 */
                status?: "AWAITING_AUTHORISATION" | "AUTHORISED" | "AWAITING_MULTI_AUTHORISATION" | "NOT_AUTHORISED" | "SETTLED" | "REJECTED" | "ACCEPTED" | "RECEIVED";
                /**
                 * The reason for the refund.
                 * example:
                 * Gym Closed for repairs.
                 */
                reason?: string;
                /**
                 * The requested amount (before Fire fees and taxes). Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                 * example:
                 * 1000
                 */
                amountBeforeCharges?: number; // int64
                /**
                 * The fee for the payment
                 * example:
                 * 1000
                 */
                feeAmount?: number; // int64
                /**
                 * The amount after Fire fees and taxes. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                 * example:
                 * 1000
                 */
                amountAfterCharges?: number; // int64
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * An internal description of the request.
                 * example:
                 * Fees
                 */
                myRef?: string;
                /**
                 * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
                 * example:
                 * Gym Fees Oct 2020
                 */
                description?: string;
                /**
                 * The merchant return URL where the customer will be re-directed to with the result of the transaction.
                 * example:
                 * https://example.com/callback
                 */
                returnUrl?: string;
                /**
                 * A URL to be called in the background with the details of the payment after the payment is complete
                 * example:
                 * https://example.com/webhook
                 */
                webhookUrl?: string;
                /**
                 * The ID of the related transaction in your fire account.
                 * example:
                 * 41234
                 */
                relatedAccountTxnId?: number; // int64
                /**
                 * The ID of the payee making the payment.
                 * example:
                 * 41234
                 */
                relatedPayeeId?: number; // int64
                /**
                 * The date the funds were received into your fire account.
                 * example:
                 * 2020-10-22T07:48:56.460Z
                 */
                dateFundsReceived?: string; // date-time
                /**
                 * This is the date the payment was initiated.
                 * example:
                 * 2020-10-22T07:48:56.460Z
                 */
                dateCreated?: string; // date-time
                /**
                 * The date payment was last updated.
                 * example:
                 * 2019-08-22T07:48:56.460Z
                 */
                lastUpdated?: string; // date-time
                /**
                 * orderDetails
                 */
                orderDetails?: {
                    /**
                     * Your Merchant Number (if applicable).
                     * example:
                     * 1234567
                     */
                    merchantNumber?: string;
                    /**
                     * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                     * example:
                     * 6c28a47d-4502-4111
                     */
                    orderId?: string;
                    /**
                     * Use this field to store a product id for the transaction (for example).
                     * example:
                     * ZFDAA-1221
                     */
                    productId?: string;
                    /**
                     * Use this field to store a customer number for the transaction (for example).
                     * example:
                     * 123645
                     */
                    customerNumber?: string;
                    /**
                     * Use this field to store any other reference for the transaction (for example, a phone number).
                     * example:
                     * John Doe
                     */
                    variableReference?: string;
                    /**
                     * This is your own comment for the transaction.
                     * example:
                     * Additional comments about the transaction
                     */
                    comment1?: string;
                    /**
                     * This is your own comment for the transaction.
                     * example:
                     * Additional comments about the transaction
                     */
                    comment2?: string;
                    /**
                     * This is a reference you use to uniquely identify each of your customers.
                     * example:
                     * 08303863544
                     */
                    merchantCustomerIdentification?: string;
                    /**
                     * The first line of the delivery address.
                     * example:
                     * 12 The Street
                     */
                    deliveryAddressLine1?: string;
                    /**
                     * The second line of the delivery address.
                     * example:
                     * The Way
                     */
                    deliveryAddressLine2?: string;
                    /**
                     * Delivery address city
                     * example:
                     * London
                     */
                    deliveryCity?: string;
                    /**
                     * Delivery address post code
                     * example:
                     * EC15155
                     */
                    deliveryPostCode?: string;
                    /**
                     * 2-digit code for the country
                     * example:
                     * GB
                     */
                    deliveryCountry?: string;
                };
                /**
                 * to
                 */
                to?: {
                    /**
                     * the type of destination account.
                     * example:
                     * FIRE_ACCOUNT
                     */
                    type?: "FIRE_ACCOUNT" | "WITHDRAWAL_ACCOUNT";
                    /**
                     * relatedPartyFireAccount
                     */
                    account?: {
                        type?: "FIRE_ACCOUNT";
                        account?: {
                            /**
                             * identifier for the fire.com account (assigned by fire.com)
                             * example:
                             * 42
                             */
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                        };
                    };
                };
                /**
                 * aspsp
                 */
                bank?: {
                    /**
                     * The UUID associated with the ASPSP / bank.
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    aspspUuid?: string;
                    /**
                     * The name of the ASPSP / bank.
                     * example:
                     * Demo Bank
                     */
                    alias?: string;
                    /**
                     * A link to the ASPSP / bank's logo in SVG format.
                     * example:
                     * https://assets.fire.com/pisp/demo.svg
                     */
                    logoUrl?: string;
                    /**
                     * country
                     */
                    country?: {
                        /**
                         * The 2-letter code for the country - e.g. `IE`, `GP`...
                         * example:
                         * GB
                         */
                        code?: string;
                        /**
                         * The name of the country
                         * example:
                         * United Kingdom
                         */
                        description?: string;
                    };
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * The date the ASPSP / bank was created.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The date the ASPSP / bank was last updated.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    lastUpdated?: string; // date-time
                };
                /**
                 * The ID assigned by the ASPSP to this payment.
                 * example:
                 * sdp-1-66ebd30c-c0e1-4a54-9865-f2a7bfedabcf
                 */
                domesticPaymentId?: string;
                /**
                 * whether or not a receipt option was offered to the payer.
                 * example:
                 * true
                 */
                allowFopReceipt?: boolean;
            }
        }
    }
    namespace GetPaymentRequestDetails {
        namespace Parameters {
            /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            export type PaymentRequestCode = string;
        }
        export interface PathParameters {
            paymentRequestCode: /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            Parameters.PaymentRequestCode;
        }
        namespace Responses {
            /**
             * paymentRequest
             */
            export interface $200 {
                /**
                 * The code that was returned when you created the payment request.
                 * example:
                 * 1234abcd
                 */
                paymentRequestCode?: string;
                /**
                 * A unique id for the transaction.
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                paymentUuid?: string;
                /**
                 * The type of payment request payment
                 */
                transactionType?: "REFUND_REQUEST" | "PAYMENT";
                /**
                 * The status of the transaction
                 */
                status?: "ACTIVE" | "PAID" | "REMOVED" | "EXPIRED";
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * The type of Fire Open Payment that was created
                 */
                type?: "OTHER";
                /**
                 * The ican of the account to collect the funds into. Must be one of your fire.com Accounts.
                 * example:
                 * 42
                 */
                icanTo?: number; // int64
                /**
                 * The requested amount to pay. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                 * example:
                 * 1000
                 */
                amount?: number; // int64
                /**
                 * An internal description of the request.
                 * example:
                 * Fees
                 */
                myRef?: string;
                /**
                 * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
                 * example:
                 * Gym Fees Oct 2020
                 */
                description?: string;
                /**
                 * The max number of people who can pay this request. Must be set to 1 for the ECOMMERCE_GOODS and ECOMMERCE_SERVICES types.
                 * example:
                 * 1
                 */
                maxNumberPayments?: number;
                /**
                 * This is the expiry of the payment request. After this time, the payment cannot be paid.
                 * example:
                 * 2024-10-22T07:48:56.460Z
                 */
                expiry?: string; // date-time
                /**
                 * The merchant return URL where the customer will be re-directed to with the result of the transaction.
                 * example:
                 * https://example.com/callback
                 */
                returnUrl?: string;
                /**
                 * A URL to be called in the background with the details of the payment after the payment is complete
                 * example:
                 * https://example.com/webhook
                 */
                webhookUrl?: string;
                /**
                 * orderDetails
                 */
                orderDetails?: {
                    /**
                     * Your Merchant Number (if applicable).
                     * example:
                     * 1234567
                     */
                    merchantNumber?: string;
                    /**
                     * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                     * example:
                     * 6c28a47d-4502-4111
                     */
                    orderId?: string;
                    /**
                     * Use this field to store a product id for the transaction (for example).
                     * example:
                     * ZFDAA-1221
                     */
                    productId?: string;
                    /**
                     * Use this field to store a customer number for the transaction (for example).
                     * example:
                     * 123645
                     */
                    customerNumber?: string;
                    /**
                     * Use this field to store any other reference for the transaction (for example, a phone number).
                     * example:
                     * John Doe
                     */
                    variableReference?: string;
                    /**
                     * This is your own comment for the transaction.
                     * example:
                     * Additional comments about the transaction
                     */
                    comment1?: string;
                    /**
                     * This is your own comment for the transaction.
                     * example:
                     * Additional comments about the transaction
                     */
                    comment2?: string;
                    /**
                     * This is a reference you use to uniquely identify each of your customers.
                     * example:
                     * 08303863544
                     */
                    merchantCustomerIdentification?: string;
                    /**
                     * The first line of the delivery address.
                     * example:
                     * 12 The Street
                     */
                    deliveryAddressLine1?: string;
                    /**
                     * The second line of the delivery address.
                     * example:
                     * The Way
                     */
                    deliveryAddressLine2?: string;
                    /**
                     * Delivery address city
                     * example:
                     * London
                     */
                    deliveryCity?: string;
                    /**
                     * Delivery address post code
                     * example:
                     * EC15155
                     */
                    deliveryPostCode?: string;
                    /**
                     * 2-digit code for the country
                     * example:
                     * GB
                     */
                    deliveryCountry?: string;
                };
                /**
                 * For the hosted option, the payer will be asked to fill in these fields but they will not be mandatory. You can choose to collect any of the payer's `ADDRESS`, `REFERENCE` and/or `COMMENT1`. If you choose to collect these fields from the payer, you cannot set 'delivery’, 'variableReference’ or 'comment1’ fields respectively.
                 * example:
                 * ADDRESS|REFERENCE|COMMENT1
                 */
                collectFields?: string;
                /**
                 * For the hosted option, these fields will be madatory for the payer to fill in on the hosted payment page. You can choose to collect any the payer's `ADDRESS`, `REFERENCE` and/or `COMMENT1`. If you choose to collect these fields from the payer, you cannot set 'delivery’, 'variableReference’ or 'comment1’ fields respectively.
                 * example:
                 * ADDRESS|REFERENCE|COMMENT1
                 */
                mandatoryFields?: string;
                /**
                 * These fields will be dispalyed to the payer when using the hosted option. You can choose to display any of `ORDER_ID`, `PRODUCT_ID`, `CUSTOMER_ID`, `CUSTOMER_NUMBER` and `COMMENT2` to the payer.
                 * example:
                 * ORDER_ID|PRODUCT_ID|CUSTOMER_ID|CUSTOMER_NUMBER|COMMENT2
                 */
                additionalFields?: string;
            }
        }
    }
    namespace GetPaymentRequestPayments {
        namespace Parameters {
            /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            export type PaymentRequestCode = string;
        }
        export interface PathParameters {
            paymentRequestCode: /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            Parameters.PaymentRequestCode;
        }
        namespace Responses {
            /**
             * paymentrequestpayments
             */
            export interface $200 {
                /**
                 * The total number of payment request payments in the list.
                 * example:
                 * 1
                 */
                total?: number; // int64
                pisPaymentRequestPayments?: {
                    /**
                     * The type of Fire Open Payment that was created
                     */
                    type?: "OTHER";
                    /**
                     * The code that was returned when you created the payment request.
                     * example:
                     * 1234abcd
                     */
                    paymentRequestCode?: string;
                    /**
                     * The type of payment request payment
                     */
                    transactionType?: "REFUND_REQUEST" | "PAYMENT";
                    /**
                     * The unique Open Banking payment ID assigned to this payment.
                     * example:
                     * FIRE1234567890
                     */
                    endToEndId?: string;
                    /**
                     * A unique id for the transaction.
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    paymentUuid?: string;
                    /**
                     * The original payment that this payment is linked to
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    relatedPaymentUuid?: string;
                    /**
                     * The status of the transaction
                     */
                    status?: "AWAITING_AUTHORISATION" | "AUTHORISED" | "AWAITING_MULTI_AUTHORISATION" | "NOT_AUTHORISED" | "PAID" | "REJECTED" | "ACCEPTED" | "RECEIVED";
                    /**
                     * The reason for the refund.
                     * example:
                     * Gym Closed for repairs.
                     */
                    reason?: string;
                    /**
                     * The requested amount (before Fire fees and taxes). Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                     * example:
                     * 1000
                     */
                    amountBeforeCharges?: number; // int64
                    /**
                     * The fee for the payment
                     * example:
                     * 1000
                     */
                    feeAmount?: number; // int64
                    /**
                     * The amount after Fire fees and taxes. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                     * example:
                     * 1000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * An internal description of the request.
                     * example:
                     * Fees
                     */
                    myRef?: string;
                    /**
                     * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
                     * example:
                     * Gym Fees Oct 2020
                     */
                    description?: string;
                    /**
                     * The merchant return URL where the customer will be re-directed to with the result of the transaction.
                     * example:
                     * https://example.com/callback
                     */
                    returnUrl?: string;
                    /**
                     * A URL to be called in the background with the details of the payment after the payment is complete
                     * example:
                     * https://example.com/webhook
                     */
                    webhookUrl?: string;
                    /**
                     * The ID of the related transaction in your fire account.
                     * example:
                     * 41234
                     */
                    relatedAccountTxnId?: number; // int64
                    /**
                     * The ID of the payee making the payment.
                     * example:
                     * 41234
                     */
                    relatedPayeeId?: number; // int64
                    /**
                     * The date the funds were received into your fire account.
                     * example:
                     * 2020-10-22T07:48:56.460Z
                     */
                    dateFundsReceived?: string; // date-time
                    /**
                     * This is the date the payment was initiated.
                     * example:
                     * 2020-10-22T07:48:56.460Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The date payment was last updated.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * orderDetails
                     */
                    orderDetails?: {
                        /**
                         * Your Merchant Number (if applicable).
                         * example:
                         * 1234567
                         */
                        merchantNumber?: string;
                        /**
                         * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                         * example:
                         * 6c28a47d-4502-4111
                         */
                        orderId?: string;
                        /**
                         * Use this field to store a product id for the transaction (for example).
                         * example:
                         * ZFDAA-1221
                         */
                        productId?: string;
                        /**
                         * Use this field to store a customer number for the transaction (for example).
                         * example:
                         * 123645
                         */
                        customerNumber?: string;
                        /**
                         * Use this field to store any other reference for the transaction (for example, a phone number).
                         * example:
                         * John Doe
                         */
                        variableReference?: string;
                        /**
                         * This is your own comment for the transaction.
                         * example:
                         * Additional comments about the transaction
                         */
                        comment1?: string;
                        /**
                         * This is your own comment for the transaction.
                         * example:
                         * Additional comments about the transaction
                         */
                        comment2?: string;
                        /**
                         * This is a reference you use to uniquely identify each of your customers.
                         * example:
                         * 08303863544
                         */
                        merchantCustomerIdentification?: string;
                        /**
                         * The first line of the delivery address.
                         * example:
                         * 12 The Street
                         */
                        deliveryAddressLine1?: string;
                        /**
                         * The second line of the delivery address.
                         * example:
                         * The Way
                         */
                        deliveryAddressLine2?: string;
                        /**
                         * Delivery address city
                         * example:
                         * London
                         */
                        deliveryCity?: string;
                        /**
                         * Delivery address post code
                         * example:
                         * EC15155
                         */
                        deliveryPostCode?: string;
                        /**
                         * 2-digit code for the country
                         * example:
                         * GB
                         */
                        deliveryCountry?: string;
                    };
                    /**
                     * to
                     */
                    to?: {
                        /**
                         * the type of destination account.
                         * example:
                         * FIRE_ACCOUNT
                         */
                        type?: "FIRE_ACCOUNT" | "WITHDRAWAL_ACCOUNT";
                        /**
                         * relatedPartyFireAccount
                         */
                        account?: {
                            type?: "FIRE_ACCOUNT";
                            account?: {
                                /**
                                 * identifier for the fire.com account (assigned by fire.com)
                                 * example:
                                 * 42
                                 */
                                id?: number; // int64
                                /**
                                 * the name the user gives to the account to help them identify it.
                                 * example:
                                 * Main Account
                                 */
                                alias?: string;
                                /**
                                 * the BIC of the account (provided if currency is EUR).
                                 * example:
                                 * CPAYIE2D
                                 */
                                bic?: string;
                                /**
                                 * the IBAN of the account (provided if currency is EUR).
                                 * example:
                                 * IE54CPAY99119911111111
                                 */
                                iban?: string;
                                /**
                                 * the Sort Code of the account.
                                 * example:
                                 * 232221
                                 */
                                nsc?: string;
                                /**
                                 * the Account Number of the account.
                                 * example:
                                 * 11111111
                                 */
                                accountNumber?: string;
                            };
                        };
                    };
                    /**
                     * aspsp
                     */
                    bank?: {
                        /**
                         * The UUID associated with the ASPSP / bank.
                         * example:
                         * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                         */
                        aspspUuid?: string;
                        /**
                         * The name of the ASPSP / bank.
                         * example:
                         * Demo Bank
                         */
                        alias?: string;
                        /**
                         * A link to the ASPSP / bank's logo in SVG format.
                         * example:
                         * https://assets.fire.com/pisp/demo.svg
                         */
                        logoUrl?: string;
                        /**
                         * country
                         */
                        country?: {
                            /**
                             * The 2-letter code for the country - e.g. `IE`, `GP`...
                             * example:
                             * GB
                             */
                            code?: string;
                            /**
                             * The name of the country
                             * example:
                             * United Kingdom
                             */
                            description?: string;
                        };
                        /**
                         * currency
                         * The currency.
                         */
                        currency?: {
                            /**
                             * The three letter code for the currency.
                             * example:
                             * EUR
                             */
                            code?: string;
                            /**
                             * The name of the currency
                             * example:
                             * Euro
                             */
                            description?: string;
                        };
                        /**
                         * The date the ASPSP / bank was created.
                         * example:
                         * 2019-08-22T07:48:56.460Z
                         */
                        dateCreated?: string; // date-time
                        /**
                         * The date the ASPSP / bank was last updated.
                         * example:
                         * 2019-08-22T07:48:56.460Z
                         */
                        lastUpdated?: string; // date-time
                    };
                    /**
                     * The ID assigned by the ASPSP to this payment.
                     * example:
                     * sdp-1-66ebd30c-c0e1-4a54-9865-f2a7bfedabcf
                     */
                    domesticPaymentId?: string;
                    /**
                     * whether or not a receipt option was offered to the payer.
                     * example:
                     * true
                     */
                    allowFopReceipt?: boolean;
                }[];
            }
        }
    }
    namespace GetPaymentRequestPaymentsv2 {
        namespace Parameters {
            /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            export type PaymentRequestCode = string;
        }
        export interface PathParameters {
            paymentRequestCode: /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            Parameters.PaymentRequestCode;
        }
        namespace Responses {
            /**
             * paymentrequestpayments
             */
            export interface $200 {
                /**
                 * The total number of payment request payments in the list.
                 * example:
                 * 1
                 */
                total?: number; // int64
                pisPaymentRequestPayments?: {
                    /**
                     * The type of Fire Open Payment that was created
                     */
                    type?: "OTHER" | "DIRECT" | "SHAREABLE" | "PARTY_TO_PARTY" | "BILL_PAYMENT" | "ECOMMERCE_GOODS" | "ECOMMERCE_SERVICES";
                    /**
                     * The code that was returned when you created the payment request.
                     * example:
                     * 1234abcd
                     */
                    paymentRequestCode?: string;
                    /**
                     * The type of payment request payment
                     */
                    transactionType?: "REFUND_REQUEST" | "PAYMENT";
                    /**
                     * The unique Open Banking payment ID assigned to this payment.
                     * example:
                     * FIRE1234567890
                     */
                    endToEndId?: string;
                    /**
                     * A unique id for the transaction.
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    paymentUuid?: string;
                    /**
                     * The original payment that this payment is linked to
                     * example:
                     * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                     */
                    relatedPaymentUuid?: string;
                    /**
                     * The status of the transaction
                     */
                    status?: "AWAITING_AUTHORISATION" | "AUTHORISED" | "AWAITING_MULTI_AUTHORISATION" | "NOT_AUTHORISED" | "SETTLED" | "REJECTED" | "ACCEPTED" | "RECEIVED";
                    /**
                     * The reason for the refund.
                     * example:
                     * Gym Closed for repairs.
                     */
                    reason?: string;
                    /**
                     * The requested amount (before Fire fees and taxes). Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                     * example:
                     * 1000
                     */
                    amountBeforeCharges?: number; // int64
                    /**
                     * The fee for the payment
                     * example:
                     * 1000
                     */
                    feeAmount?: number; // int64
                    /**
                     * The amount after Fire fees and taxes. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
                     * example:
                     * 1000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * An internal description of the request.
                     * example:
                     * Fees
                     */
                    myRef?: string;
                    /**
                     * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
                     * example:
                     * Gym Fees Oct 2020
                     */
                    description?: string;
                    /**
                     * The merchant return URL where the customer will be re-directed to with the result of the transaction.
                     * example:
                     * https://example.com/callback
                     */
                    returnUrl?: string;
                    /**
                     * A URL to be called in the background with the details of the payment after the payment is complete
                     * example:
                     * https://example.com/webhook
                     */
                    webhookUrl?: string;
                    /**
                     * The ID of the related transaction in your fire account.
                     * example:
                     * 41234
                     */
                    relatedAccountTxnId?: number; // int64
                    /**
                     * The ID of the payee making the payment.
                     * example:
                     * 41234
                     */
                    relatedPayeeId?: number; // int64
                    /**
                     * The date the funds were received into your fire account.
                     * example:
                     * 2020-10-22T07:48:56.460Z
                     */
                    dateFundsReceived?: string; // date-time
                    /**
                     * This is the date the payment was initiated.
                     * example:
                     * 2020-10-22T07:48:56.460Z
                     */
                    dateCreated?: string; // date-time
                    /**
                     * The date payment was last updated.
                     * example:
                     * 2019-08-22T07:48:56.460Z
                     */
                    lastUpdated?: string; // date-time
                    /**
                     * orderDetails
                     */
                    orderDetails?: {
                        /**
                         * Your Merchant Number (if applicable).
                         * example:
                         * 1234567
                         */
                        merchantNumber?: string;
                        /**
                         * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                         * example:
                         * 6c28a47d-4502-4111
                         */
                        orderId?: string;
                        /**
                         * Use this field to store a product id for the transaction (for example).
                         * example:
                         * ZFDAA-1221
                         */
                        productId?: string;
                        /**
                         * Use this field to store a customer number for the transaction (for example).
                         * example:
                         * 123645
                         */
                        customerNumber?: string;
                        /**
                         * Use this field to store any other reference for the transaction (for example, a phone number).
                         * example:
                         * John Doe
                         */
                        variableReference?: string;
                        /**
                         * This is your own comment for the transaction.
                         * example:
                         * Additional comments about the transaction
                         */
                        comment1?: string;
                        /**
                         * This is your own comment for the transaction.
                         * example:
                         * Additional comments about the transaction
                         */
                        comment2?: string;
                        /**
                         * This is a reference you use to uniquely identify each of your customers.
                         * example:
                         * 08303863544
                         */
                        merchantCustomerIdentification?: string;
                        /**
                         * The first line of the delivery address.
                         * example:
                         * 12 The Street
                         */
                        deliveryAddressLine1?: string;
                        /**
                         * The second line of the delivery address.
                         * example:
                         * The Way
                         */
                        deliveryAddressLine2?: string;
                        /**
                         * Delivery address city
                         * example:
                         * London
                         */
                        deliveryCity?: string;
                        /**
                         * Delivery address post code
                         * example:
                         * EC15155
                         */
                        deliveryPostCode?: string;
                        /**
                         * 2-digit code for the country
                         * example:
                         * GB
                         */
                        deliveryCountry?: string;
                    };
                    /**
                     * to
                     */
                    to?: {
                        /**
                         * the type of destination account.
                         * example:
                         * FIRE_ACCOUNT
                         */
                        type?: "FIRE_ACCOUNT" | "WITHDRAWAL_ACCOUNT";
                        /**
                         * relatedPartyFireAccount
                         */
                        account?: {
                            type?: "FIRE_ACCOUNT";
                            account?: {
                                /**
                                 * identifier for the fire.com account (assigned by fire.com)
                                 * example:
                                 * 42
                                 */
                                id?: number; // int64
                                /**
                                 * the name the user gives to the account to help them identify it.
                                 * example:
                                 * Main Account
                                 */
                                alias?: string;
                                /**
                                 * the BIC of the account (provided if currency is EUR).
                                 * example:
                                 * CPAYIE2D
                                 */
                                bic?: string;
                                /**
                                 * the IBAN of the account (provided if currency is EUR).
                                 * example:
                                 * IE54CPAY99119911111111
                                 */
                                iban?: string;
                                /**
                                 * the Sort Code of the account.
                                 * example:
                                 * 232221
                                 */
                                nsc?: string;
                                /**
                                 * the Account Number of the account.
                                 * example:
                                 * 11111111
                                 */
                                accountNumber?: string;
                            };
                        };
                    };
                    /**
                     * aspsp
                     */
                    bank?: {
                        /**
                         * The UUID associated with the ASPSP / bank.
                         * example:
                         * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                         */
                        aspspUuid?: string;
                        /**
                         * The name of the ASPSP / bank.
                         * example:
                         * Demo Bank
                         */
                        alias?: string;
                        /**
                         * A link to the ASPSP / bank's logo in SVG format.
                         * example:
                         * https://assets.fire.com/pisp/demo.svg
                         */
                        logoUrl?: string;
                        /**
                         * country
                         */
                        country?: {
                            /**
                             * The 2-letter code for the country - e.g. `IE`, `GP`...
                             * example:
                             * GB
                             */
                            code?: string;
                            /**
                             * The name of the country
                             * example:
                             * United Kingdom
                             */
                            description?: string;
                        };
                        /**
                         * currency
                         * The currency.
                         */
                        currency?: {
                            /**
                             * The three letter code for the currency.
                             * example:
                             * EUR
                             */
                            code?: string;
                            /**
                             * The name of the currency
                             * example:
                             * Euro
                             */
                            description?: string;
                        };
                        /**
                         * The date the ASPSP / bank was created.
                         * example:
                         * 2019-08-22T07:48:56.460Z
                         */
                        dateCreated?: string; // date-time
                        /**
                         * The date the ASPSP / bank was last updated.
                         * example:
                         * 2019-08-22T07:48:56.460Z
                         */
                        lastUpdated?: string; // date-time
                    };
                    /**
                     * The ID assigned by the ASPSP to this payment.
                     * example:
                     * sdp-1-66ebd30c-c0e1-4a54-9865-f2a7bfedabcf
                     */
                    domesticPaymentId?: string;
                    /**
                     * whether or not a receipt option was offered to the payer.
                     * example:
                     * true
                     */
                    allowFopReceipt?: boolean;
                }[];
            }
        }
    }
    namespace GetPaymentRequestReportV2 {
        namespace Parameters {
            /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            export type PaymentRequestCode = string;
        }
        export interface PathParameters {
            paymentRequestCode: /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            Parameters.PaymentRequestCode;
        }
        namespace Responses {
            /**
             * PaymentRequestReport
             */
            export interface $200 {
                /**
                 * Currency payment request was sent in
                 * example:
                 * EUR
                 */
                currency?: string;
                /**
                 * Amount in payment request
                 */
                amount?: number; // int64
                /**
                 * Payments made for this amount and currency
                 */
                numberOfTimes?: number; // int64
            }
        }
    }
    namespace GetPaymentRequestsSentV2 {
        namespace Responses {
            /**
             * PaymentRequestsSent
             */
            export interface $200 {
                /**
                 * The total number of payment request payments in the list.
                 * example:
                 * 3
                 */
                total?: number; // int64
                /**
                 * Date Range
                 * example:
                 * 1726571260003
                 */
                dateRangeTo?: number; // int64
                paymentRequests?: {
                    /**
                     * Name on the Account
                     * example:
                     * Euro Account
                     */
                    accountName?: string;
                    /**
                     * Amount of the transaction
                     */
                    amount?: number; // int64
                    /**
                     * The code that was returned when you created the payment request
                     * example:
                     * 1234abcd
                     */
                    code?: string;
                    /**
                     * Currency transaction was completed in
                     * example:
                     * EUR
                     */
                    currency?: string;
                    /**
                     * This is the date the payment was initiated.
                     * example:
                     * 2024-09-12T14:55:03.857Z
                     */
                    dateCreated?: string;
                    /**
                     * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
                     * example:
                     * FIRE/John Doe
                     */
                    description?: string;
                    /**
                     * Payment direction
                     * example:
                     * SENT
                     */
                    direction?: string;
                    /**
                     * The ican of the account to collect the funds into. Must be one of your fire.com Accounts.
                     * example:
                     * 66204
                     */
                    icanTo?: number; // int64
                    /**
                     * The max number of people who can pay this request. Must be set to 1 for the ECOMMERCE_GOODS and ECOMMERCE_SERVICES types.
                     * example:
                     * 1
                     */
                    maxNumberPayments?: number; // int64
                    /**
                     * An internal description of the request.
                     * example:
                     * Terminal
                     */
                    myRef?: string;
                    /**
                     * orderDetails
                     */
                    orderDetails?: {
                        /**
                         * Your Merchant Number (if applicable).
                         * example:
                         * 1234567
                         */
                        merchantNumber?: string;
                        /**
                         * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                         * example:
                         * 6c28a47d-4502-4111
                         */
                        orderId?: string;
                        /**
                         * Use this field to store a product id for the transaction (for example).
                         * example:
                         * ZFDAA-1221
                         */
                        productId?: string;
                        /**
                         * Use this field to store a customer number for the transaction (for example).
                         * example:
                         * 123645
                         */
                        customerNumber?: string;
                        /**
                         * Use this field to store any other reference for the transaction (for example, a phone number).
                         * example:
                         * John Doe
                         */
                        variableReference?: string;
                        /**
                         * This is your own comment for the transaction.
                         * example:
                         * Additional comments about the transaction
                         */
                        comment1?: string;
                        /**
                         * This is your own comment for the transaction.
                         * example:
                         * Additional comments about the transaction
                         */
                        comment2?: string;
                        /**
                         * This is a reference you use to uniquely identify each of your customers.
                         * example:
                         * 08303863544
                         */
                        merchantCustomerIdentification?: string;
                        /**
                         * The first line of the delivery address.
                         * example:
                         * 12 The Street
                         */
                        deliveryAddressLine1?: string;
                        /**
                         * The second line of the delivery address.
                         * example:
                         * The Way
                         */
                        deliveryAddressLine2?: string;
                        /**
                         * Delivery address city
                         * example:
                         * London
                         */
                        deliveryCity?: string;
                        /**
                         * Delivery address post code
                         * example:
                         * EC15155
                         */
                        deliveryPostCode?: string;
                        /**
                         * 2-digit code for the country
                         * example:
                         * GB
                         */
                        deliveryCountry?: string;
                    };
                    /**
                     * The status of the transaction
                     */
                    status?: "AWAITING_AUTHORISATION" | "AUTHORISED" | "AWAITING_MULTI_AUTHORISATION" | "NOT_AUTHORISED" | "SETTLED" | "REJECTED" | "ACCEPTED" | "RECEIVED";
                    /**
                     * The type of Fire Open Payment that was created
                     */
                    type?: "OTHER" | "DIRECT" | "SHAREABLE" | "PARTY_TO_PARTY" | "BILL_PAYMENT" | "ECOMMERCE_GOODS" | "ECOMMERCE_SERVICES";
                }[];
            }
        }
    }
    namespace GetPermissions {
        namespace Parameters {
            /**
             * The number associated with the app to retrieve the associated permissions
             */
            export type ApplicationId = number; // int64
        }
        export interface PathParameters {
            applicationId: /* The number associated with the app to retrieve the associated permissions */ Parameters.ApplicationId /* int64 */;
        }
        namespace Responses {
            /**
             * API App Permissions
             */
            export interface $200 {
                permissions?: {
                    /**
                     * Name of Permission allowed
                     */
                    name?: "PERM_BUSINESS_GET_ACCOUNT" | "PERM_BUSINESS_GET_ACCOUNT_TRANSACTIONS" | "PERM_BUSINESS_GET_ACCOUNT_TRANSACTIONS_FILTERED" | "PERM_BUSINESS_GET_ACCOUNTS" | "PERM_BUSINESS_GET_ACTIVITIES" | "PERM_BUSINESS_GET_APP_PERMISSIONS" | "PERM_BUSINESS_GET_APPS" | "PERM_BUSINESS_GET_CARDS" | "PERM_BUSINESS_GET_CONNECTION" | "PERM_BUSINESS_GET_CONNECTIONS" | "PERM_BUSINESS_GET_FUNDING_SOURCE" | "PERM_BUSINESS_GET_FUNDING_SOURCE_TRANSACTIONS" | "PERM_BUSINESS_GET_FUNDING_SOURCES" | "PERM_BUSINESS_GET_FX_RATE" | "PERM_BUSINESS_GET_IDENTITY_DOCUMENTS" | "PERM_BUSINESS_GET_LIMITS" | "PERM_BUSINESS_GET_ME" | "PERM_BUSINESS_GET_MY_AUTHENTICATORSECRET" | "PERM_BUSINESS_GET_MY_CARD_PIN" | "PERM_BUSINESS_GET_MY_CARD_TRANSACTIONS" | "PERM_BUSINESS_GET_MY_CARD_TRANSACTIONS_FILTERED" | "PERM_BUSINESS_GET_MY_PINGRID" | "PERM_BUSINESS_GET_OPERATING_COUNTRIES" | "PERM_BUSINESS_GET_MY_CARDS" | "PERM_BUSINESS_GET_PAYMENT_REQUEST_REPORTS" | "PERM_BUSINESS_GET_PAYMENT_REQUEST_TRANSACTIONS" | "PERM_BUSINESS_GET_PAYMENT_REQUESTS" | "PERM_BUSINESS_GET_PAYMENT_REQUEST_PAYMENTS" | "PERM_BUSINESS_GET_PUBLIC_PAYMENT_REQUEST" | "PERM_BUSINESS_GET_PAYMENT_REQUEST" | "PERM_BUSINESS_GET_RATES" | "PERM_BUSINESS_GET_SERVICES" | "PERM_BUSINESS_GET_USER" | "PERM_BUSINESS_GET_USER_ADDRESS" | "PERM_BUSINESS_GET_USERS" | "PERM_BUSINESS_GET_WEBHOOK_EVENT_TEST" | "PERM_BUSINESS_GET_WEBHOOK_TOKENS" | "PERM_BUSINESS_GET_WEBHOOKS" | "PERM_BUSINESS_GET_MY_NOTIFICATIONS_PUSH" | "PERM_BUSINESS_GET_MY_SCAAA" | "PERM_BUSINESS_GET_MY_SCAAAS" | "PERM_BUSINESS_GET_BATCHES" | "PERM_BUSINESS_GET_BATCH" | "PERM_BUSINESS_GET_BATCH_INTERNALTRANSFERS" | "PERM_BUSINESS_GET_BATCH_BANKTRANSFERS" | "PERM_BUSINESS_GET_BATCH_NEWPAYEES" | "PERM_BUSINESS_GET_BATCH_APPROVALS" | "PERM_BUSINESS_GET_MANDATE" | "PERM_BUSINESS_GET_MANDATES" | "PERM_BUSINESS_GET_DIRECT_DEBIT" | "PERM_BUSINESS_GET_DIRECT_DEBITS" | "PERM_BUSINESS_POST_ACCOUNT_WITHDRAWAL" | "PERM_BUSINESS_POST_ACCOUNTS" | "PERM_BUSINESS_POST_ACCOUNTS_TRANSFER" | "PERM_BUSINESS_POST_APPS" | "PERM_BUSINESS_POST_CARDS" | "PERM_BUSINESS_POST_CONNECTION_EXTERNAL_ACCOUNT_PAY" | "PERM_BUSINESS_POST_CONNECTION_PAY" | "PERM_BUSINESS_POST_CONNECTION_PAYMENT_REQUESTS" | "PERM_BUSINESS_POST_CONNECTIONS" | "PERM_BUSINESS_POST_FUNDING_SOURCES" | "PERM_BUSINESS_POST_FX_TRANSFER" | "PERM_BUSINESS_POST_IDENTITY_DOCUMENTS_POLICY" | "PERM_BUSINESS_POST_MY_CARD_ACTIVATE" | "PERM_BUSINESS_POST_MY_CARD_BLOCK" | "PERM_BUSINESS_POST_MY_CARD_UNBLOCK" | "PERM_BUSINESS_POST_MY_PIN_RESET" | "PERM_BUSINESS_POST_MY_PIN_RESET_INITIATE" | "PERM_BUSINESS_POST_PAYMENT_REQUEST" | "PERM_BUSINESS_POST_PIN" | "PERM_BUSINESS_POST_USERS" | "PERM_BUSINESS_POST_WEBHOOKS" | "PERM_BUSINESS_POST_BATCHES" | "PERM_BUSINESS_POST_BATCH_INTERNALTRANSFERS" | "PERM_BUSINESS_POST_BATCH_BANKTRANSFERS" | "PERM_BUSINESS_PUT_ACCOUNT" | "PERM_BUSINESS_PUT_APP" | "PERM_BUSINESS_PUT_CONNECTION" | "PERM_BUSINESS_PUT_FUNDING_SOURCE_ARCHIVE" | "PERM_BUSINESS_PUT_IDENTITY" | "PERM_BUSINESS_PUT_MY_AUTHENTICATORSECRET" | "PERM_BUSINESS_PUT_PAYMENT_REQUEST_STATUS" | "PERM_BUSINESS_PUT_REGISTRATION_DETAILS" | "PERM_BUSINESS_PUT_USER_DISABLE" | "PERM_BUSINESS_PUT_USER_RESEND_EMAIL" | "PERM_BUSINESS_PUT_MY_NOTIFICATION_PUSH" | "PERM_BUSINESS_PUT_OTHERS_NOTIFICATION_PUSH" | "PERM_BUSINESS_PUT_MY_SCAAA" | "PERM_BUSINESS_PUT_BATCH" | "PERM_BUSINESS_DELETE_CONNECTION" | "PERM_BUSINESS_DELETE_IDENTITY_DOCUMENT" | "PERM_BUSINESS_DELETE_WEBHOOK" | "PERM_BUSINESS_DELETE_BATCH" | "PERM_BUSINESS_DELETE_BATCH_INTERNALTRANSFERS" | "PERM_BUSINESS_DELETE_BATCH_BANKTRANSFERS" | "PERM_BUSINESS_GET_TERMINAL_PAYMENT_REQUEST" | "PERM_BUSINESS_GET_TERMINAL_PAYMENT_REQUEST_PAYMENTS" | "PERM_BUSINESS_GET_TERMINAL_ACCOUNTS";
                    requiresElevatedPrivilege?: boolean;
                }[];
            }
            export interface $401 {
            }
        }
    }
    namespace GetPublicPaymentRequestV2 {
        namespace Parameters {
            /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            export type PaymentRequestCode = string;
        }
        export interface PathParameters {
            paymentRequestCode: /**
             * The unique 8-character code identifying the payment request.
             * example:
             * 1234abcd
             */
            Parameters.PaymentRequestCode;
        }
        namespace Responses {
            /**
             * Public Payment request
             */
            export interface $200 {
                /**
                 * This is the payment request code
                 * example:
                 * abcdefgh
                 */
                code?: string;
                /**
                 * Payment Initiation Service Provider
                 * example:
                 * FIRE
                 */
                pisp?: string;
                /**
                 * This is the status of the payment request
                 * example:
                 * ACTIVE
                 */
                status?: string;
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * The amount sent in the payment request
                 */
                amount?: number; // int64
                /**
                 * This is the reference description that was added to the payment request
                 * example:
                 * test
                 */
                description?: string;
                /**
                 * This is the date the payment was initiated.
                 * example:
                 * 2024-09-12T14:55:03.857Z
                 */
                dateCreated?: string;
                /**
                 * For the hosted option, these fields will be madatory for the payer to fill in on the hosted payment page. You can choose to collect any the payer's `ADDRESS`, `REFERENCE` and/or `COMMENT1`. If you choose to collect these fields from the payer, you cannot set 'delivery’, 'variableReference’ or  'comment1’ fields respectively.
                 * example:
                 * REFERNCE
                 */
                mandatoryFields?: string;
                /**
                 * sender
                 */
                sender?: {
                    /**
                     * This is the type of account the sender holds
                     * example:
                     * BUSINESS
                     */
                    type?: string;
                    /**
                     * This is the name of the sender
                     * example:
                     * johndoe
                     */
                    name?: string;
                    /**
                     * businessAddress
                     */
                    businessAddress?: {
                        /**
                         * This is the type of account the sender holds
                         * example:
                         * BUSINESS
                         */
                        type?: string;
                        /**
                         * This is the address of the sender
                         * example:
                         * 1, 1 street, Dublin
                         */
                        address1?: string;
                        /**
                         * This is the city the sender lives in
                         * example:
                         * Dublin 1
                         */
                        city?: string;
                        /**
                         * country
                         */
                        country?: {
                            /**
                             * The 2-letter code for the country - e.g. `IE`, `GP`...
                             * example:
                             * GB
                             */
                            code?: string;
                            /**
                             * The name of the country
                             * example:
                             * United Kingdom
                             */
                            description?: string;
                        };
                    };
                };
            }
        }
    }
    namespace GetServices {
        namespace Responses {
            /**
             * businessServices
             */
            export type $200 = {
                /**
                 * The service type of the action
                 */
                service?: "PAYMENT" | "WITHDRAWAL" | "LODGEMENT" | "ADD_ACCOUNT" | "INTERNAL_TRANSFER" | "PAYMENT_REQUEST" | "FX_INT_TRANS_FROM" | "FX_INT_TRANS_TO" | "CARD_TOP_UP" | "CREATE_CARD" | "NB2P_TO" | "NP2B_FROM" | "NP2P_TO" | "NP2P_FROM" | "CARAPAY_TRANSFER_FROM" | "CARAPAY_TRANSFER_TO" | "CARD_POS_CONTACT_DEBIT" | "CARD_POS_CONTACT_CREDIT" | "CARD_POS_CONTACTLESS_DEBIT" | "CARD_POS_CONTACTLESS_CREDIT" | "CARD_ECOMMERCE_DEBIT" | "CARD_ECOMMERCE_CREDIT" | "CARD_ATM_DEBIT" | "CARD_ATM_CREDIT" | "CARD_INTERNATIONAL_POS_CONTACT_DEBIT" | "CARD_INTERNATIONAL_POS_CONTACT_CREDIT" | "CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT" | "CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT" | "CARD_INTERNATIONAL_ECOMMERCE_DEBIT" | "CARD_INTERNATIONAL_ECOMMERCE_CREDIT" | "CARD_INTERNATIONAL_ATM_DEBIT" | "CARD_INTERNATIONAL_ATM_CREDIT" | "CARD_POS_CONTACT_DEBIT_REVERSAL" | "CARD_POS_CONTACT_CREDIT_REVERSAL" | "CARD_POS_CONTACTLESS_DEBIT_REVERSAL" | "CARD_POS_CONTACTLESS_CREDIT_REVERSAL" | "CARD_ECOMMERCE_DEBIT_REVERSAL" | "CARD_ECOMMERCE_CREDIT_REVERSAL" | "CARD_ATM_DEBIT_REVERSAL" | "CARD_ATM_CREDIT_REVERSAL" | "CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL" | "CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL" | "CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL" | "CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL" | "CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL" | "CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL" | "CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL" | "CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL";
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency.
                     * example:
                     * EUR
                     */
                    code?: string;
                    /**
                     * The name of the currency
                     * example:
                     * Euro
                     */
                    description?: string;
                };
                /**
                 * feeRule
                 * The rules around the fee being applied
                 */
                feeRule?: /**
                 * feeRule
                 * The rules around the fee being applied
                 */
                {
                    /**
                     * The ID of the rule
                     * example:
                     * 25816
                     */
                    feeRuleId?: number; // int64
                    /**
                     * This is the fixed amount for the fee for each event
                     * example:
                     * 29
                     */
                    fixedAmount?: number; // int64
                } | {
                    /**
                     * The ID of the rule
                     * example:
                     * 25816
                     */
                    feeRuleId?: number; // int64
                    /**
                     * This is the minimum fee amount that can be charged for an event
                     * example:
                     * 10
                     */
                    minimumAmount?: number; // int64
                    /**
                     * This is the maximum fee amount that can be charged for an event
                     * example:
                     * 29
                     */
                    maximumAmount?: number; // int64
                    /**
                     * This is the fixed % amount of a transaction the fee can be
                     * example:
                     * 1000
                     */
                    fixedPercentage4d?: number; // int64
                };
            }[];
            export interface $401 {
            }
        }
    }
    namespace GetTransactionsByAccountIdFiltered {
        namespace Parameters {
            /**
             * A millisecond epoch time specifying the date range start date.
             */
            export type DateRangeFrom = number; // int64
            /**
             * A millisecond epoch time specifying the date range end date.
             */
            export type DateRangeTo = number; // int64
            /**
             * The ican of the account to retrieve
             */
            export type Ican = number; // int64
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             */
            export type Offset = number; // int64
            /**
             * Search term to filter by from the reference field (`myRef`).
             */
            export type SearchKeyword = string;
            /**
             * One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
             */
            export type TransactionTypes = string[];
        }
        export interface PathParameters {
            ican: /* The ican of the account to retrieve */ Parameters.Ican /* int64 */;
        }
        export interface QueryParameters {
            dateRangeFrom: /* A millisecond epoch time specifying the date range start date. */ Parameters.DateRangeFrom /* int64 */;
            dateRangeTo: /* A millisecond epoch time specifying the date range end date. */ Parameters.DateRangeTo /* int64 */;
            searchKeyword: /* Search term to filter by from the reference field (`myRef`). */ Parameters.SearchKeyword;
            transactionTypes: /* One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types. */ Parameters.TransactionTypes;
            offset: /* The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59. */ Parameters.Offset /* int64 */;
            limit: /* The number of records to return. Defaults to 10 - max is 200. */ Parameters.Limit /* int64 */;
        }
        namespace Responses {
            /**
             * transactionsv1
             */
            export interface $200 {
                /**
                 * The total number of card transactions in the list.
                 * example:
                 * 1
                 */
                total?: number; // int64
                /**
                 * milisecond timestamp of date range to value.
                 * example:
                 * 1547744156603
                 */
                dateRangeTo?: number; // int64
                transactions?: {
                    /**
                     * The id of this side of the transaction (each transaction has two sides - a to and a from). This is used to get the details of the transaction.
                     * example:
                     * 30157
                     */
                    txnId?: number; // int64
                    /**
                     * The id of the transaction.
                     * example:
                     * 26774
                     */
                    refId?: number; // int64
                    /**
                     * identifier for the fire.com account (assigned by fire.com) This field is only used in the condensed version.
                     * example:
                     * 1951
                     */
                    ican?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * Amount of the transaction before the fees and taxes were applied.
                     * example:
                     * 5000
                     */
                    amountBeforeCharges?: number; // int64
                    /**
                     * The amount of the fee, if any.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * The amount of the tax, if any (e.g. Stamp duty for ATM transactions)
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * Net amount lodged or taken from the account after fees and charges were applied.
                     * example:
                     * 5000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                     * example:
                     * 8500
                     */
                    balance?: number; // int64
                    /**
                     * The comment/reference on the transaction
                     * example:
                     * Transfer to main account
                     */
                    myRef?: string;
                    /**
                     * The comment/reference on the transaction that appears on the recipients statement. Only for withdrawals
                     * example:
                     * From John Smith
                     */
                    yourRef?: string;
                    /**
                     * Date of the transaction
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    date?: string; // date-time
                    /**
                     * (FOP payments only) The FOP Payment Code that was used to make this payment.
                     * example:
                     * 1abcdefg
                     */
                    paymentRequestPublicCode?: string;
                    /**
                     * relatedCard
                     * Details of the card used (if applicable)
                     */
                    card?: {
                        cardId?: number; // int64
                        provider?: string;
                        alias?: string;
                        maskedPan?: string;
                        embossCardName?: string;
                        embossBusinessName?: string;
                        expiryDate?: string; // date-time
                    };
                    /**
                     * The type of the transaction:
                     * * `LODGEMENT` - Bank Transfer received
                     * * `PIS_LODGEMENT` - Fire Open Payments Lodgement received
                     * * `MANUAL_TRANSFER` - Manual Transfer to
                     * * `WITHDRAWAL` - Bank Transfer sent
                     * * `REVERSAL` - Credit Reversal
                     * * `DIRECT_DEBIT` - A direct debit.
                     * * `DIRECT_DEBIT_REPRESENTED` - A Direct Debit that was requested again after initially failing.
                     * * `DIRECT_DEBIT_REFUND` - A refund of a Direct debit.
                     * * `INTERNAL_TRANSFER_TO` - Internal Transfer sent (between two of my accounts of the same currency)
                     * * `INTERNAL_TRANSFER_FROM` - Internal Transfer received (between two of my accounts of the same currency)
                     * * `WITHDRAWAL_RETURNED` - Bank Transfer sent returned
                     * * `LODGEMENT_REVERSED` - Bank Transfer received returned
                     * * `FX_INTERNAL_TRANSFER_FROM` - FX Internal Transfer received (between two of my accounts of different currency)
                     * * `FX_INTERNAL_TRANSFER_TO` - FX Internal Transfer sent (between two of my accounts of different currency)
                     * * `CREATE_CARD` - The fee taken when a debit card is issued.
                     * * `ADD_ACCOUNT` - The fee taken when an account is created.
                     * * `CREATE_ADDITIONAL_USER` - The fee taken when an additional user is created.
                     * * `CARD_POS_CONTACT_DEBIT` - Card used in store; read by magnetic stripe or pin
                     * * `CARD_POS_CONTACT_CREDIT` - Card used in store; read by magnetic stripe or pin
                     * * `CARD_POS_CONTACTLESS_DEBIT` - Card used in store; read by NFC
                     * * `CARD_POS_CONTACTLESS_CREDIT` - Card used in store; read by NFC
                     * * `CARD_ECOMMERCE_DEBIT` - Card used on the internet
                     * * `CARD_ECOMMERCE_CREDIT` - Card used on the internet
                     * * `CARD_ATM_DEBIT` - Card used in an ATM
                     * * `CARD_ATM_CREDIT` - Card used in an ATM
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT` - Card used in store in non-processing currency; read by NFC
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT` - Card used in store in non-processing currency; read by NFC
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT	` - Card used on the internet in non-processing currency
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT` - Card used on the internet in non-processing currency
                     * * `CARD_INTERNATIONAL_ATM_DEBIT` - Card used in an ATM in non-processing currency
                     * * `CARD_INTERNATIONAL_ATM_CREDIT` - Card used in an ATM in non-processing currency
                     * * `CARD_POS_CONTACT_DEBIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
                     * * `CARD_POS_CONTACT_CREDIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
                     * * `CARD_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store; read by NFC - reversed
                     * * `CARD_POS_CONTACTLESS_CREDIT_REVERSAL` - Card used in store; read by NFC - reversed
                     * * `CARD_ECOMMERCE_DEBIT_REVERSAL	` - Card used on the internet - reversed
                     * * `CARD_ECOMMERCE_CREDIT_REVERSAL` - Card used on the internet - reversed
                     * * `CARD_ATM_DEBIT_REVERSAL` - Card used in an ATM - reversed
                     * * `CARD_ATM_CREDIT_REVERSAL` - Card used in an ATM - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
                     * * `CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
                     *
                     * example:
                     * WITHDRAWAL
                     */
                    type?: string;
                    /**
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    dateAcknowledged?: string; // date-time
                    /**
                     * fxTrade
                     * Details of the FX trade (if applicable)
                     */
                    fxTradeDetails?: {
                        /**
                         * currency which is being bought
                         * example:
                         * GBP
                         */
                        buyCurrency?: string;
                        /**
                         * currency which is being sold
                         * example:
                         * EUR
                         */
                        sellCurrency?: string;
                        /**
                         * type of trade - BUY or SELL
                         * example:
                         * SELL
                         */
                        fixedSide?: string;
                        /**
                         * amount of buyCurrency being bought
                         * example:
                         * 359
                         */
                        buyAmount?: number; // int64
                        /**
                         * amount of sellCurrency being sold
                         * example:
                         * 500
                         */
                        sellAmount?: number; // int64
                        /**
                         * exchange rate
                         * example:
                         * 7180
                         */
                        rate4d?: number; // int64
                        /**
                         * The FX provider used to make the trade.
                         * example:
                         * TCC
                         */
                        provider?: string;
                    };
                    /**
                     * batchItemDetails
                     * Details of the batch run if this transaction was part of a batch.
                     */
                    batchItemDetails?: {
                        /**
                         * The UUID for this batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchPublicUuid?: string;
                        /**
                         * The UUID for this item in the batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchItemPublicUuid?: string;
                        /**
                         * The optional name given to the batch at creation time.
                         * example:
                         * Payroll 2022-11
                         */
                        batchName?: string;
                        /**
                         * The optional job number given to the batch to link it to your own system.
                         * example:
                         * 2018-01-PR
                         */
                        jobNumber?: string;
                    };
                    /**
                     * directDebitDetails
                     * Details of the direct debit (if applicable)
                     */
                    directDebitDetails?: {
                        /**
                         * The UUID for the direct debit payment
                         * example:
                         * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                         */
                        directDebitUuid?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * f171b143-e3eb-47de-85a6-1c1f1108c701
                         */
                        mandateUUid?: string;
                        /**
                         * Set by party who sets up the direct debit.
                         * example:
                         * VODA-123456
                         */
                        originatorReference?: string;
                        /**
                         * The creator of the party who sets up the direct debit.
                         * example:
                         * Vodafone PLC
                         */
                        originatorName?: string;
                        /**
                         * The Alias of the party who sets up the direct debit.
                         * example:
                         * Three
                         */
                        originatorAlias?: string;
                        /**
                         * The direct debit reference.
                         * example:
                         * VODA-ABC453-1
                         */
                        directDebitReference?: string;
                        /**
                         * URL pointing to a small version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlSmall?: string;
                        /**
                         * URL pointing to a large version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlLarge?: string;
                        /**
                         * the reference of the mandate
                         * example:
                         * CRZ-102190123
                         */
                        mandateReference?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * 28d627c3-1889-44c8-ae59-6f6b20239260
                         */
                        mandateUuid?: string;
                    };
                    /**
                     * proprietarySchemeDetails
                     * Extra details about the transaction based on the scheme used to make the payment.
                     */
                    proprietarySchemeDetails?: {
                        /**
                         * the type of proprietary scheme - SCT for SEPA, FPS for Faster Payments etc.
                         * example:
                         * SCT
                         */
                        type?: string;
                        /**
                         * the scheme proprietary data - key pairs separated by | and key/values separated by ^
                         * example:
                         * remittanceInfoUnstructured^FIRE440286865OD1|instructionId^O223151336499079
                         */
                        data?: string;
                    }[];
                    /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    relatedParty?: /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    {
                        type?: "FIRE_ACCOUNT";
                        account?: {
                            /**
                             * identifier for the fire.com account (assigned by fire.com)
                             * example:
                             * 42
                             */
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                        };
                    } | {
                        type?: "EXTERNAL_ACCOUNT";
                        account?: {
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "WITHDRAWAL_ACCOUNT";
                        account?: {
                            /**
                             * The ID of the payee.
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The name of the payee.
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * The sort code of the payee (for GBP payments)
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the payee (for GBP payments)
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the payee (for EUR payments)
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The IBAN of the payee (for EUR payments)
                             * example:
                             * IE76CPAY99119900000000
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "CARD_MERCHANT" | "CARD_ATM";
                        cardMerchant?: {
                            /**
                             * example:
                             * 06011329
                             */
                            acquirerIdDe32?: string;
                            additionalAmtDe54?: string;
                            /**
                             * example:
                             * 177449
                             */
                            authCodeDe38?: string;
                            /**
                             * example:
                             * -1000
                             */
                            billAmt?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            billCcy?: string;
                            expiryDate?: string;
                            /**
                             * example:
                             * 5521
                             */
                            mccCode?: string;
                            /**
                             * example:
                             * 013152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 000001000030037299999
                             */
                            posDataDe61?: string;
                            /**
                             * example:
                             * 80266721
                             */
                            posTermnlDe41?: string;
                            /**
                             * example:
                             * 051
                             */
                            posDataDe22?: string;
                            /**
                             * example:
                             * 000000
                             */
                            procCode?: string;
                            /**
                             * example:
                             * 00
                             */
                            respCodeDe39?: string;
                            /**
                             * example:
                             * 010900006720
                             */
                            retRefNoDe37?: string;
                            /**
                             * example:
                             * 00
                             */
                            statusCode?: string;
                            /**
                             * example:
                             * 976307363
                             */
                            token?: string;
                            /**
                             * example:
                             * 1000
                             */
                            txnAmt4d?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            txnCcy?: string;
                            /**
                             * example:
                             * IRL
                             */
                            txnCtry?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            txnDesc?: string;
                            /**
                             * example:
                             * A
                             */
                            txnStatCode?: string;
                            /**
                             * example:
                             * A
                             */
                            txnType?: string;
                            /**
                             * example:
                             * 010X610500000
                             */
                            additionalDataDe48?: string;
                            /**
                             * example:
                             * N
                             */
                            authorisedByGps?: string;
                            /**
                             * example:
                             * N
                             */
                            avsResult?: string;
                            /**
                             * example:
                             * 0100
                             */
                            mtId?: string;
                            recordDataDe120?: string;
                            additionalDataDe124?: string;
                        };
                    };
                    /**
                     * An internal Fire reference for the transaction (UUID)
                     * example:
                     * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                     */
                    eventUuid?: string;
                }[];
            }
        }
    }
    namespace GetTransactionsByAccountIdv1 {
        namespace Parameters {
            /**
             * The ican of the account to retrieve
             */
            export type Ican = number; // int64
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             */
            export type Limit = number; // int64
            /**
             * The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
             */
            export type Offset = number; // int64
        }
        export interface PathParameters {
            ican: /* The ican of the account to retrieve */ Parameters.Ican /* int64 */;
        }
        export interface QueryParameters {
            limit: /* The number of records to return. Defaults to 10 - max is 200. */ Parameters.Limit /* int64 */;
            offset: /* The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59. */ Parameters.Offset /* int64 */;
        }
        namespace Responses {
            /**
             * transactionsv1
             */
            export interface $200 {
                /**
                 * The total number of card transactions in the list.
                 * example:
                 * 1
                 */
                total?: number; // int64
                /**
                 * milisecond timestamp of date range to value.
                 * example:
                 * 1547744156603
                 */
                dateRangeTo?: number; // int64
                transactions?: {
                    /**
                     * The id of this side of the transaction (each transaction has two sides - a to and a from). This is used to get the details of the transaction.
                     * example:
                     * 30157
                     */
                    txnId?: number; // int64
                    /**
                     * The id of the transaction.
                     * example:
                     * 26774
                     */
                    refId?: number; // int64
                    /**
                     * identifier for the fire.com account (assigned by fire.com) This field is only used in the condensed version.
                     * example:
                     * 1951
                     */
                    ican?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * Amount of the transaction before the fees and taxes were applied.
                     * example:
                     * 5000
                     */
                    amountBeforeCharges?: number; // int64
                    /**
                     * The amount of the fee, if any.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * The amount of the tax, if any (e.g. Stamp duty for ATM transactions)
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * Net amount lodged or taken from the account after fees and charges were applied.
                     * example:
                     * 5000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                     * example:
                     * 8500
                     */
                    balance?: number; // int64
                    /**
                     * The comment/reference on the transaction
                     * example:
                     * Transfer to main account
                     */
                    myRef?: string;
                    /**
                     * The comment/reference on the transaction that appears on the recipients statement. Only for withdrawals
                     * example:
                     * From John Smith
                     */
                    yourRef?: string;
                    /**
                     * Date of the transaction
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    date?: string; // date-time
                    /**
                     * (FOP payments only) The FOP Payment Code that was used to make this payment.
                     * example:
                     * 1abcdefg
                     */
                    paymentRequestPublicCode?: string;
                    /**
                     * relatedCard
                     * Details of the card used (if applicable)
                     */
                    card?: {
                        cardId?: number; // int64
                        provider?: string;
                        alias?: string;
                        maskedPan?: string;
                        embossCardName?: string;
                        embossBusinessName?: string;
                        expiryDate?: string; // date-time
                    };
                    /**
                     * The type of the transaction:
                     * * `LODGEMENT` - Bank Transfer received
                     * * `PIS_LODGEMENT` - Fire Open Payments Lodgement received
                     * * `MANUAL_TRANSFER` - Manual Transfer to
                     * * `WITHDRAWAL` - Bank Transfer sent
                     * * `REVERSAL` - Credit Reversal
                     * * `DIRECT_DEBIT` - A direct debit.
                     * * `DIRECT_DEBIT_REPRESENTED` - A Direct Debit that was requested again after initially failing.
                     * * `DIRECT_DEBIT_REFUND` - A refund of a Direct debit.
                     * * `INTERNAL_TRANSFER_TO` - Internal Transfer sent (between two of my accounts of the same currency)
                     * * `INTERNAL_TRANSFER_FROM` - Internal Transfer received (between two of my accounts of the same currency)
                     * * `WITHDRAWAL_RETURNED` - Bank Transfer sent returned
                     * * `LODGEMENT_REVERSED` - Bank Transfer received returned
                     * * `FX_INTERNAL_TRANSFER_FROM` - FX Internal Transfer received (between two of my accounts of different currency)
                     * * `FX_INTERNAL_TRANSFER_TO` - FX Internal Transfer sent (between two of my accounts of different currency)
                     * * `CREATE_CARD` - The fee taken when a debit card is issued.
                     * * `ADD_ACCOUNT` - The fee taken when an account is created.
                     * * `CREATE_ADDITIONAL_USER` - The fee taken when an additional user is created.
                     * * `CARD_POS_CONTACT_DEBIT` - Card used in store; read by magnetic stripe or pin
                     * * `CARD_POS_CONTACT_CREDIT` - Card used in store; read by magnetic stripe or pin
                     * * `CARD_POS_CONTACTLESS_DEBIT` - Card used in store; read by NFC
                     * * `CARD_POS_CONTACTLESS_CREDIT` - Card used in store; read by NFC
                     * * `CARD_ECOMMERCE_DEBIT` - Card used on the internet
                     * * `CARD_ECOMMERCE_CREDIT` - Card used on the internet
                     * * `CARD_ATM_DEBIT` - Card used in an ATM
                     * * `CARD_ATM_CREDIT` - Card used in an ATM
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT` - Card used in store in non-processing currency; read by magnetic stripe or pin
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT` - Card used in store in non-processing currency; read by NFC
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT` - Card used in store in non-processing currency; read by NFC
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT	` - Card used on the internet in non-processing currency
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT` - Card used on the internet in non-processing currency
                     * * `CARD_INTERNATIONAL_ATM_DEBIT` - Card used in an ATM in non-processing currency
                     * * `CARD_INTERNATIONAL_ATM_CREDIT` - Card used in an ATM in non-processing currency
                     * * `CARD_POS_CONTACT_DEBIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
                     * * `CARD_POS_CONTACT_CREDIT_REVERSAL` - Card used in store; read by magnetic stripe or pin - reversed
                     * * `CARD_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store; read by NFC - reversed
                     * * `CARD_POS_CONTACTLESS_CREDIT_REVERSAL` - Card used in store; read by NFC - reversed
                     * * `CARD_ECOMMERCE_DEBIT_REVERSAL	` - Card used on the internet - reversed
                     * * `CARD_ECOMMERCE_CREDIT_REVERSAL` - Card used on the internet - reversed
                     * * `CARD_ATM_DEBIT_REVERSAL` - Card used in an ATM - reversed
                     * * `CARD_ATM_CREDIT_REVERSAL` - Card used in an ATM - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by magnetic stripe or pin - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL` - Card used in store in non-processing currency; read by NFC - reversed
                     * * `CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
                     * * `CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL` - Card used on the internet in non-processing currency - reversed
                     *
                     * example:
                     * WITHDRAWAL
                     */
                    type?: string;
                    /**
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    dateAcknowledged?: string; // date-time
                    /**
                     * fxTrade
                     * Details of the FX trade (if applicable)
                     */
                    fxTradeDetails?: {
                        /**
                         * currency which is being bought
                         * example:
                         * GBP
                         */
                        buyCurrency?: string;
                        /**
                         * currency which is being sold
                         * example:
                         * EUR
                         */
                        sellCurrency?: string;
                        /**
                         * type of trade - BUY or SELL
                         * example:
                         * SELL
                         */
                        fixedSide?: string;
                        /**
                         * amount of buyCurrency being bought
                         * example:
                         * 359
                         */
                        buyAmount?: number; // int64
                        /**
                         * amount of sellCurrency being sold
                         * example:
                         * 500
                         */
                        sellAmount?: number; // int64
                        /**
                         * exchange rate
                         * example:
                         * 7180
                         */
                        rate4d?: number; // int64
                        /**
                         * The FX provider used to make the trade.
                         * example:
                         * TCC
                         */
                        provider?: string;
                    };
                    /**
                     * batchItemDetails
                     * Details of the batch run if this transaction was part of a batch.
                     */
                    batchItemDetails?: {
                        /**
                         * The UUID for this batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchPublicUuid?: string;
                        /**
                         * The UUID for this item in the batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchItemPublicUuid?: string;
                        /**
                         * The optional name given to the batch at creation time.
                         * example:
                         * Payroll 2022-11
                         */
                        batchName?: string;
                        /**
                         * The optional job number given to the batch to link it to your own system.
                         * example:
                         * 2018-01-PR
                         */
                        jobNumber?: string;
                    };
                    /**
                     * directDebitDetails
                     * Details of the direct debit (if applicable)
                     */
                    directDebitDetails?: {
                        /**
                         * The UUID for the direct debit payment
                         * example:
                         * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                         */
                        directDebitUuid?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * f171b143-e3eb-47de-85a6-1c1f1108c701
                         */
                        mandateUUid?: string;
                        /**
                         * Set by party who sets up the direct debit.
                         * example:
                         * VODA-123456
                         */
                        originatorReference?: string;
                        /**
                         * The creator of the party who sets up the direct debit.
                         * example:
                         * Vodafone PLC
                         */
                        originatorName?: string;
                        /**
                         * The Alias of the party who sets up the direct debit.
                         * example:
                         * Three
                         */
                        originatorAlias?: string;
                        /**
                         * The direct debit reference.
                         * example:
                         * VODA-ABC453-1
                         */
                        directDebitReference?: string;
                        /**
                         * URL pointing to a small version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlSmall?: string;
                        /**
                         * URL pointing to a large version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlLarge?: string;
                        /**
                         * the reference of the mandate
                         * example:
                         * CRZ-102190123
                         */
                        mandateReference?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * 28d627c3-1889-44c8-ae59-6f6b20239260
                         */
                        mandateUuid?: string;
                    };
                    /**
                     * proprietarySchemeDetails
                     * Extra details about the transaction based on the scheme used to make the payment.
                     */
                    proprietarySchemeDetails?: {
                        /**
                         * the type of proprietary scheme - SCT for SEPA, FPS for Faster Payments etc.
                         * example:
                         * SCT
                         */
                        type?: string;
                        /**
                         * the scheme proprietary data - key pairs separated by | and key/values separated by ^
                         * example:
                         * remittanceInfoUnstructured^FIRE440286865OD1|instructionId^O223151336499079
                         */
                        data?: string;
                    }[];
                    /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    relatedParty?: /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    {
                        type?: "FIRE_ACCOUNT";
                        account?: {
                            /**
                             * identifier for the fire.com account (assigned by fire.com)
                             * example:
                             * 42
                             */
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                        };
                    } | {
                        type?: "EXTERNAL_ACCOUNT";
                        account?: {
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "WITHDRAWAL_ACCOUNT";
                        account?: {
                            /**
                             * The ID of the payee.
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The name of the payee.
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * The sort code of the payee (for GBP payments)
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the payee (for GBP payments)
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the payee (for EUR payments)
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The IBAN of the payee (for EUR payments)
                             * example:
                             * IE76CPAY99119900000000
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "CARD_MERCHANT" | "CARD_ATM";
                        cardMerchant?: {
                            /**
                             * example:
                             * 06011329
                             */
                            acquirerIdDe32?: string;
                            additionalAmtDe54?: string;
                            /**
                             * example:
                             * 177449
                             */
                            authCodeDe38?: string;
                            /**
                             * example:
                             * -1000
                             */
                            billAmt?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            billCcy?: string;
                            expiryDate?: string;
                            /**
                             * example:
                             * 5521
                             */
                            mccCode?: string;
                            /**
                             * example:
                             * 013152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 000001000030037299999
                             */
                            posDataDe61?: string;
                            /**
                             * example:
                             * 80266721
                             */
                            posTermnlDe41?: string;
                            /**
                             * example:
                             * 051
                             */
                            posDataDe22?: string;
                            /**
                             * example:
                             * 000000
                             */
                            procCode?: string;
                            /**
                             * example:
                             * 00
                             */
                            respCodeDe39?: string;
                            /**
                             * example:
                             * 010900006720
                             */
                            retRefNoDe37?: string;
                            /**
                             * example:
                             * 00
                             */
                            statusCode?: string;
                            /**
                             * example:
                             * 976307363
                             */
                            token?: string;
                            /**
                             * example:
                             * 1000
                             */
                            txnAmt4d?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            txnCcy?: string;
                            /**
                             * example:
                             * IRL
                             */
                            txnCtry?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            txnDesc?: string;
                            /**
                             * example:
                             * A
                             */
                            txnStatCode?: string;
                            /**
                             * example:
                             * A
                             */
                            txnType?: string;
                            /**
                             * example:
                             * 010X610500000
                             */
                            additionalDataDe48?: string;
                            /**
                             * example:
                             * N
                             */
                            authorisedByGps?: string;
                            /**
                             * example:
                             * N
                             */
                            avsResult?: string;
                            /**
                             * example:
                             * 0100
                             */
                            mtId?: string;
                            recordDataDe120?: string;
                            additionalDataDe124?: string;
                        };
                    };
                    /**
                     * An internal Fire reference for the transaction (UUID)
                     * example:
                     * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                     */
                    eventUuid?: string;
                }[];
            }
        }
    }
    namespace GetTransactionsByAccountIdv3 {
        namespace Parameters {
            /**
             * A millisecond epoch time specifying the date range start date.
             */
            export type DateRangeFrom = number; // int64
            /**
             * A millisecond epoch time specifying the date range end date.
             */
            export type DateRangeTo = number; // int64
            /**
             * The ican of the account to retrieve
             */
            export type Ican = number; // int64
            /**
             * The number of records to return. Defaults to 10 - max is 200.
             */
            export type Limit = number; // int64
            /**
             * A pointer to the position in the resultset to start from. Used when paging through results using the linked pages.
             */
            export type StartAfter = string;
        }
        export interface PathParameters {
            ican: /* The ican of the account to retrieve */ Parameters.Ican /* int64 */;
        }
        export interface QueryParameters {
            limit?: /* The number of records to return. Defaults to 10 - max is 200. */ Parameters.Limit /* int64 */;
            dateRangeFrom?: /* A millisecond epoch time specifying the date range start date. */ Parameters.DateRangeFrom /* int64 */;
            dateRangeTo?: /* A millisecond epoch time specifying the date range end date. */ Parameters.DateRangeTo /* int64 */;
            startAfter?: /* A pointer to the position in the resultset to start from. Used when paging through results using the linked pages. */ Parameters.StartAfter;
        }
        namespace Responses {
            /**
             * transactionsv3
             */
            export interface $200 {
                links?: {
                    /**
                     * The relationship of this link to the current object - self, next, prev page.
                     * example:
                     * self
                     */
                    rel?: string;
                    /**
                     * The URL of the linked page
                     * example:
                     * https://api.fire.com/business/v3/accounts/1/transactions?startAfter=eyJpY2F
                     */
                    href?: string;
                }[];
                content?: {
                    /**
                     * The id of this side of the transaction (each transaction has two sides - a to and a from). This is used to get the details of the transaction.
                     * example:
                     * 30157
                     */
                    txnId?: number; // int64
                    /**
                     * The id of the transaction.
                     * example:
                     * 26774
                     */
                    refId?: number; // int64
                    /**
                     * identifier for the fire.com account (assigned by fire.com) This field is only used in the condensed version.
                     * example:
                     * 1951
                     */
                    ican?: number; // int64
                    /**
                     * currency
                     * The currency.
                     */
                    currency?: {
                        /**
                         * The three letter code for the currency.
                         * example:
                         * EUR
                         */
                        code?: string;
                        /**
                         * The name of the currency
                         * example:
                         * Euro
                         */
                        description?: string;
                    };
                    /**
                     * Amount of the transaction before the fees and taxes were applied.
                     * example:
                     * 5000
                     */
                    amountBeforeCharges?: number; // int64
                    /**
                     * The amount of the fee, if any.
                     * example:
                     * 0
                     */
                    feeAmount?: number; // int64
                    /**
                     * The amount of the tax, if any (e.g. Stamp duty for ATM transactions)
                     * example:
                     * 0
                     */
                    taxAmount?: number; // int64
                    /**
                     * Net amount lodged or taken from the account after fees and charges were applied.
                     * example:
                     * 5000
                     */
                    amountAfterCharges?: number; // int64
                    /**
                     * the balance of the account (in minor currency units - pence, cent etc. 434050 == 4,340.50 GBP for a GBP account).
                     * example:
                     * 8500
                     */
                    balance?: number; // int64
                    /**
                     * The comment/reference on the transaction
                     * example:
                     * Transfer to main account
                     */
                    myRef?: string;
                    /**
                     * The comment/reference on the transaction that appears on the recipients statement. Only for withdrawals
                     * example:
                     * From John Smith
                     */
                    yourRef?: string;
                    /**
                     * Date of the transaction
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    date?: string; // date-time
                    /**
                     * (FOP payments only) The FOP Payment Code that was used to make this payment.
                     * example:
                     * 1abcdefg
                     */
                    paymentRequestPublicCode?: string;
                    /**
                     * relatedCard
                     * Details of the card used (if applicable)
                     */
                    card?: {
                        cardId?: number; // int64
                        provider?: string;
                        alias?: string;
                        maskedPan?: string;
                        embossCardName?: string;
                        embossBusinessName?: string;
                        expiryDate?: string; // date-time
                    };
                    /**
                     * The type of the transaction:
                     * * `LODGEMENT` - Bank Transfer received
                     * * `PIS_LODGEMENT` - Open Banking Payment received
                     * * `MANUAL_TRANSFER` - Manual Transfer
                     * * `WITHDRAWAL` - Bank Transfer from the account
                     * * `REVERSAL` - Credit Reversal
                     * * `DIRECT_DEBIT` - A direct debit.
                     * * `DIRECT_DEBIT_REPRESENTED` - A Direct Debit that was requested again after initially failing.
                     * * `DIRECT_DEBIT_REFUND` - Refund of a Direct debit.
                     * * `INTERNAL_TRANSFER_TO` - Internal Transfer sent between Fire accounts
                     * * `INTERNAL_TRANSFER_FROM` - Internal Transfer received between Fire accounts
                     * * `WITHDRAWAL_RETURNED` - Bank Transfer returned to your account
                     * * `LODGEMENT_REVERSED` - Bank Transfer reversed out of your account
                     * * `FX_INTERNAL_TRANSFER_FROM` - FX Internal Transfer received between Fire accounts
                     * * `FX_INTERNAL_TRANSFER_TO` - FX Internal Transfer sent between Fire accounts
                     * * `CREATE_CARD` - The fee taken when a debit card is issued.
                     * * `ADD_ACCOUNT` - The fee taken when an account is created.
                     * * `CREATE_ADDITIONAL_USER` - The fee taken when an additional user is created.
                     * * `CARD_POS_CONTACT_DEBIT` - Debit Card Chip and PIN payment
                     * * `CARD_POS_CONTACT_CREDIT` - Debit Card Chip and PIN payment refund
                     * * `CARD_POS_CONTACTLESS_DEBIT` - Debit Card contactless payment
                     * * `CARD_POS_CONTACTLESS_CREDIT` - Debit Card contactless payment refund
                     * * `CARD_ECOMMERCE_DEBIT` - Debit Card online payment
                     * * `CARD_ECOMMERCE_CREDIT` - Debit Card online payment refund
                     * * `CARD_ATM_DEBIT` - Debit Card ATM withdrawal
                     * * `CARD_ATM_CREDIT` - Debit Card ATM refund
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT` - Debit Card Chip and PIN payment (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT` - Debit Card Chip and PIN payment refund (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT` - Debit Card contactless payment (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT` - Debit Card contactless payment refund (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT	` - Debit Card online payment (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT` - Debit Card online payment refund (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_ATM_DEBIT` - Debit Card ATM withdrawal (non EUR/GBP)
                     * * `CARD_INTERNATIONAL_ATM_CREDIT` - Debit Card ATM refund (non EUR/GBP)
                     * * `CARD_POS_CONTACT_DEBIT_REVERSAL` - Debit Card Chip and PIN payment (Reversed)
                     * * `CARD_POS_CONTACT_CREDIT_REVERSAL` - Debit Card Chip and PIN payment refund (Reversed)
                     * * `CARD_POS_CONTACTLESS_DEBIT_REVERSAL` - Debit Card contactless payment (Reversed)
                     * * `CARD_POS_CONTACTLESS_CREDIT_REVERSAL` - Debit Card contactless payment refund (Reversed)
                     * * `CARD_ECOMMERCE_DEBIT_REVERSAL	` - Debit Card online payment (Reversed)
                     * * `CARD_ECOMMERCE_CREDIT_REVERSAL` - Debit Card online payment refund (Reversed)
                     * * `CARD_ATM_DEBIT_REVERSAL` - Debit Card ATM withdrawal (Reversed)
                     * * `CARD_ATM_CREDIT_REVERSAL` - Debit Card ATM refund (Reversed)
                     * * `CARD_INTERNATIONAL_POS_CONTACT_DEBIT_REVERSAL` - Debit Card Chip and PIN payment (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_POS_CONTACT_CREDIT_REVERSAL` - Debit Card Chip and PIN payment refund (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_DEBIT_REVERSAL` - Debit Card contactless payment (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_POS_CONTACTLESS_CREDIT_REVERSAL` - Debit Card contactless payment refund (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_ECOMMERCE_DEBIT_REVERSAL` - Debit Card online payment (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_ECOMMERCE_CREDIT_REVERSAL` - Debit Card online payment refund (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_ATM_DEBIT_REVERSAL` - Debit Card ATM withdrawal (non EUR/GBP) (Reversed)
                     * * `CARD_INTERNATIONAL_ATM_CREDIT_REVERSAL` - Debit Card ATM refund (non EUR/GBP) (Reversed)
                     *
                     * example:
                     * WITHDRAWAL
                     */
                    type?: string;
                    /**
                     * example:
                     * 2021-04-13T11:06:32.437Z
                     */
                    dateAcknowledged?: string; // date-time
                    /**
                     * fxTrade
                     * Details of the FX trade (if applicable)
                     */
                    fxTradeDetails?: {
                        /**
                         * currency which is being bought
                         * example:
                         * GBP
                         */
                        buyCurrency?: string;
                        /**
                         * currency which is being sold
                         * example:
                         * EUR
                         */
                        sellCurrency?: string;
                        /**
                         * type of trade - BUY or SELL
                         * example:
                         * SELL
                         */
                        fixedSide?: string;
                        /**
                         * amount of buyCurrency being bought
                         * example:
                         * 359
                         */
                        buyAmount?: number; // int64
                        /**
                         * amount of sellCurrency being sold
                         * example:
                         * 500
                         */
                        sellAmount?: number; // int64
                        /**
                         * exchange rate
                         * example:
                         * 7180
                         */
                        rate4d?: number; // int64
                        /**
                         * The FX provider used to make the trade.
                         * example:
                         * TCC
                         */
                        provider?: string;
                    };
                    /**
                     * batchItemDetails
                     * Details of the batch run if this transaction was part of a batch.
                     */
                    batchItemDetails?: {
                        /**
                         * The UUID for this batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchPublicUuid?: string;
                        /**
                         * The UUID for this item in the batch.
                         * example:
                         * F2AF3F2B-4406-4199-B249-B354F2CC6019
                         */
                        batchItemPublicUuid?: string;
                        /**
                         * The optional name given to the batch at creation time.
                         * example:
                         * Payroll 2022-11
                         */
                        batchName?: string;
                        /**
                         * The optional job number given to the batch to link it to your own system.
                         * example:
                         * 2018-01-PR
                         */
                        jobNumber?: string;
                    };
                    /**
                     * directDebitDetails
                     * Details of the direct debit (if applicable)
                     */
                    directDebitDetails?: {
                        /**
                         * The UUID for the direct debit payment
                         * example:
                         * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                         */
                        directDebitUuid?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * f171b143-e3eb-47de-85a6-1c1f1108c701
                         */
                        mandateUUid?: string;
                        /**
                         * Set by party who sets up the direct debit.
                         * example:
                         * VODA-123456
                         */
                        originatorReference?: string;
                        /**
                         * The creator of the party who sets up the direct debit.
                         * example:
                         * Vodafone PLC
                         */
                        originatorName?: string;
                        /**
                         * The Alias of the party who sets up the direct debit.
                         * example:
                         * Three
                         */
                        originatorAlias?: string;
                        /**
                         * The direct debit reference.
                         * example:
                         * VODA-ABC453-1
                         */
                        directDebitReference?: string;
                        /**
                         * URL pointing to a small version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlSmall?: string;
                        /**
                         * URL pointing to a large version of the Originator Logo (if available)
                         * example:
                         * https://s3-eu-west-1.amazonaws.com/live-fire-assets/prod/49dc9a01-8261-4d98-bebf-c3842c2d3c5d-small.png
                         */
                        originatorLogoUrlLarge?: string;
                        /**
                         * the reference of the mandate
                         * example:
                         * CRZ-102190123
                         */
                        mandateReference?: string;
                        /**
                         * The UUID for the mandate
                         * example:
                         * 28d627c3-1889-44c8-ae59-6f6b20239260
                         */
                        mandateUuid?: string;
                    };
                    /**
                     * proprietarySchemeDetails
                     * Extra details about the transaction based on the scheme used to make the payment.
                     */
                    proprietarySchemeDetails?: {
                        /**
                         * the type of proprietary scheme - SCT for SEPA, FPS for Faster Payments etc.
                         * example:
                         * SCT
                         */
                        type?: string;
                        /**
                         * the scheme proprietary data - key pairs separated by | and key/values separated by ^
                         * example:
                         * remittanceInfoUnstructured^FIRE440286865OD1|instructionId^O223151336499079
                         */
                        data?: string;
                    }[];
                    /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    relatedParty?: /**
                     * relatedParty
                     * Details of the related third party involved in the transaction.
                     */
                    {
                        type?: "FIRE_ACCOUNT";
                        account?: {
                            /**
                             * identifier for the fire.com account (assigned by fire.com)
                             * example:
                             * 42
                             */
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                        };
                    } | {
                        type?: "EXTERNAL_ACCOUNT";
                        account?: {
                            id?: number; // int64
                            /**
                             * the name the user gives to the account to help them identify it.
                             * example:
                             * Main Account
                             */
                            alias?: string;
                            /**
                             * the Sort Code of the account.
                             * example:
                             * 232221
                             */
                            nsc?: string;
                            /**
                             * the Account Number of the account.
                             * example:
                             * 11111111
                             */
                            accountNumber?: string;
                            /**
                             * the BIC of the account (provided if currency is EUR).
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * the IBAN of the account (provided if currency is EUR).
                             * example:
                             * IE54CPAY99119911111111
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "WITHDRAWAL_ACCOUNT";
                        account?: {
                            /**
                             * The ID of the payee.
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The name of the payee.
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * The sort code of the payee (for GBP payments)
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the payee (for GBP payments)
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the payee (for EUR payments)
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The IBAN of the payee (for EUR payments)
                             * example:
                             * IE76CPAY99119900000000
                             */
                            iban?: string;
                        };
                    } | {
                        type?: "CARD_MERCHANT" | "CARD_ATM";
                        cardMerchant?: {
                            /**
                             * example:
                             * 06011329
                             */
                            acquirerIdDe32?: string;
                            additionalAmtDe54?: string;
                            /**
                             * example:
                             * 177449
                             */
                            authCodeDe38?: string;
                            /**
                             * example:
                             * -1000
                             */
                            billAmt?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            billCcy?: string;
                            expiryDate?: string;
                            /**
                             * example:
                             * 5521
                             */
                            mccCode?: string;
                            /**
                             * example:
                             * 013152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 000001000030037299999
                             */
                            posDataDe61?: string;
                            /**
                             * example:
                             * 80266721
                             */
                            posTermnlDe41?: string;
                            /**
                             * example:
                             * 051
                             */
                            posDataDe22?: string;
                            /**
                             * example:
                             * 000000
                             */
                            procCode?: string;
                            /**
                             * example:
                             * 00
                             */
                            respCodeDe39?: string;
                            /**
                             * example:
                             * 010900006720
                             */
                            retRefNoDe37?: string;
                            /**
                             * example:
                             * 00
                             */
                            statusCode?: string;
                            /**
                             * example:
                             * 976307363
                             */
                            token?: string;
                            /**
                             * example:
                             * 1000
                             */
                            txnAmt4d?: number; // int64
                            /**
                             * example:
                             * 978
                             */
                            txnCcy?: string;
                            /**
                             * example:
                             * IRL
                             */
                            txnCtry?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            txnDesc?: string;
                            /**
                             * example:
                             * A
                             */
                            txnStatCode?: string;
                            /**
                             * example:
                             * A
                             */
                            txnType?: string;
                            /**
                             * example:
                             * 010X610500000
                             */
                            additionalDataDe48?: string;
                            /**
                             * example:
                             * N
                             */
                            authorisedByGps?: string;
                            /**
                             * example:
                             * N
                             */
                            avsResult?: string;
                            /**
                             * example:
                             * 0100
                             */
                            mtId?: string;
                            recordDataDe120?: string;
                            additionalDataDe124?: string;
                        };
                    };
                    /**
                     * An internal Fire reference for the transaction (UUID)
                     * example:
                     * 42de0705-e3f1-44fa-8c41-79973eb80eb2
                     */
                    eventUuid?: string;
                }[];
            }
        }
    }
    namespace GetUser {
        namespace Parameters {
            /**
             * Lists a specific User
             * example:
             * 14059
             */
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: /**
             * Lists a specific User
             * example:
             * 14059
             */
            Parameters.UserId /* int64 */;
        }
        namespace Responses {
            /**
             * user
             */
            export interface $200 {
                /**
                 * The User ID for this User
                 * example:
                 * 14059
                 */
                id?: number; // int64
                /**
                 * email address for user
                 * example:
                 * user@example.com
                 */
                emailAddress?: string;
                /**
                 * User first name
                 * example:
                 * Colm
                 */
                firstName?: string;
                /**
                 * User second name
                 * example:
                 * User
                 */
                lastName?: string;
                /**
                 * User mobile number
                 * example:
                 * +353871234567
                 */
                mobileNumber?: string;
                /**
                 * User role
                 */
                role?: "ADMIN" | "FULL_USER" | "PAYMENT_ONLY_USER" | "PAYEE_MANAGEMENT" | "READ_ONLY" | "CARD_ONLY";
                /**
                 * Status of user
                 */
                status?: "LIVE" | "CLOSED" | "FROZEN" | "INVITE_SENT" | "SMS_CODE_SENT";
                /**
                 * Timestamp on when user last logged in.
                 * example:
                 * 2012-01-20T11:21:35.000Z
                 */
                lastlogin?: string;
                /**
                 * Users Cvl type ID (shows up when status is LIVE)
                 * example:
                 * FULL
                 */
                userCvl?: string;
                /**
                 * mobileApplication
                 */
                mobileApplicationDetails?: {
                    /**
                     * Business user ID
                     * example:
                     * 14059
                     */
                    businessUserId?: number; // int64
                    /**
                     * Mobile application id for user.
                     * example:
                     * 18967
                     */
                    mobileApplicationId?: number; // int64
                    /**
                     * Client ID of user.
                     * example:
                     * EBB10F29-A653-4DBA-9C8C-BA79F72F78B0
                     */
                    clientID?: string;
                    /**
                     * Status of user
                     */
                    status?: "LIVE" | "CLOSED" | "LOCKED" | "SMS_SENT";
                    /**
                     * type of device.
                     */
                    deviceName?: "iPhone" | "Android" | "Other";
                    /**
                     * Operating system of device.
                     */
                    OS?: "Android" | "IOS" | "OTHER";
                    /**
                     * OS version for device.
                     * example:
                     * 14.4
                     */
                    deviceOSVersion?: string;
                };
            }
        }
    }
    namespace GetUserAddress {
        namespace Parameters {
            /**
             * Lists a specific User
             * example:
             * 14059
             */
            export type UserId = number; // int64
        }
        export interface PathParameters {
            userId: /**
             * Lists a specific User
             * example:
             * 14059
             */
            Parameters.UserId /* int64 */;
        }
        namespace Responses {
            /**
             * Get User Address
             */
            export interface $200 {
                /**
                 * The type of address this is for the user
                 */
                type?: "HOME" | "BUSINESS";
                /**
                 * This is the 1st line of the address
                 * example:
                 * 1, Road 1
                 */
                address1?: string;
                /**
                 * This is the city listed for the address
                 * example:
                 * Dublin
                 */
                city?: string;
                /**
                 * country
                 */
                country?: {
                    /**
                     * The 2-letter code for the country - e.g. `IE`, `GP`...
                     * example:
                     * GB
                     */
                    code?: string;
                    /**
                     * The name of the country
                     * example:
                     * United Kingdom
                     */
                    description?: string;
                };
                /**
                 * This is the postcode listed for the address
                 * example:
                 * D01 E100
                 */
                postcode?: string;
            }
        }
    }
    namespace GetUsers {
        namespace Responses {
            export type $200 = {
                /**
                 * The User ID for this User
                 * example:
                 * 14059
                 */
                id?: number; // int64
                /**
                 * email address for user
                 * example:
                 * user@example.com
                 */
                emailAddress?: string;
                /**
                 * User first name
                 * example:
                 * Colm
                 */
                firstName?: string;
                /**
                 * User second name
                 * example:
                 * User
                 */
                lastName?: string;
                /**
                 * User mobile number
                 * example:
                 * +353871234567
                 */
                mobileNumber?: string;
                /**
                 * User role
                 */
                role?: "ADMIN" | "FULL_USER" | "PAYMENT_ONLY_USER" | "PAYEE_MANAGEMENT" | "READ_ONLY" | "CARD_ONLY";
                /**
                 * Status of user
                 */
                status?: "LIVE" | "CLOSED" | "FROZEN" | "INVITE_SENT" | "SMS_CODE_SENT";
                /**
                 * Timestamp on when user last logged in.
                 * example:
                 * 2012-01-20T11:21:35.000Z
                 */
                lastlogin?: string;
                /**
                 * Users Cvl type ID (shows up when status is LIVE)
                 * example:
                 * FULL
                 */
                userCvl?: string;
                /**
                 * mobileApplication
                 */
                mobileApplicationDetails?: {
                    /**
                     * Business user ID
                     * example:
                     * 14059
                     */
                    businessUserId?: number; // int64
                    /**
                     * Mobile application id for user.
                     * example:
                     * 18967
                     */
                    mobileApplicationId?: number; // int64
                    /**
                     * Client ID of user.
                     * example:
                     * EBB10F29-A653-4DBA-9C8C-BA79F72F78B0
                     */
                    clientID?: string;
                    /**
                     * Status of user
                     */
                    status?: "LIVE" | "CLOSED" | "LOCKED" | "SMS_SENT";
                    /**
                     * type of device.
                     */
                    deviceName?: "iPhone" | "Android" | "Other";
                    /**
                     * Operating system of device.
                     */
                    OS?: "Android" | "IOS" | "OTHER";
                    /**
                     * OS version for device.
                     * example:
                     * 14.4
                     */
                    deviceOSVersion?: string;
                };
            }[];
        }
    }
    namespace NewPaymentRequest {
        /**
         * newPaymentRequest
         */
        export interface RequestBody {
            /**
             * Either `EUR` or `GBP`, and must correspond to the currency of the account the funds are being lodged into in the `icanTo`.
             */
            currency: "EUR" | "GBP";
            /**
             * The type of Fire Open Payment that was created
             */
            type: "OTHER";
            /**
             * The ican of the account to collect the funds into. Must be one of your fire.com Accounts.
             * example:
             * 42
             */
            icanTo: number; // int64
            /**
             * The requested amount to pay. Note the last two digits represent pennies/cents, (e.g., £1.00 = 100).
             * example:
             * 1000
             */
            amount?: number; // int64
            /**
             * An internal description of the request.
             * example:
             * Fees
             */
            myRef: string;
            /**
             * A public facing description of the request. This will be shown to the user when they tap or scan the request. Fire will truncate to 18 characters to ensure it is accepted by all banks. It is safest to use only numbers, letters, spaces and a fullstop (.) Special characters are not accepted by most banks and errors will only occur after the customer has approved the payment.
             * example:
             * Gym Fees Oct 2020
             */
            description: string;
            /**
             * The max number of people who can pay this request. Must be set to 1 for the ECOMMERCE_GOODS and ECOMMERCE_SERVICES types.
             * example:
             * 1
             */
            maxNumberPayments?: number;
            /**
             * This is the expiry of the payment request. After this time, the payment cannot be paid.
             * example:
             * 2020-10-22T07:48:56.460Z
             */
            expiry?: string; // date-time
            /**
             * The merchant return URL where the customer will be re-directed to with the result of the transaction.
             * example:
             * https://example.com/callback
             */
            returnUrl?: string;
            /**
             * orderDetails
             */
            orderDetails?: {
                /**
                 * Your Merchant Number (if applicable).
                 * example:
                 * 1234567
                 */
                merchantNumber?: string;
                /**
                 * Use this field to store the order id for the transaction. The Order Id cannot be set unless the `maxNumberPayments` is 1.
                 * example:
                 * 6c28a47d-4502-4111
                 */
                orderId?: string;
                /**
                 * Use this field to store a product id for the transaction (for example).
                 * example:
                 * ZFDAA-1221
                 */
                productId?: string;
                /**
                 * Use this field to store a customer number for the transaction (for example).
                 * example:
                 * 123645
                 */
                customerNumber?: string;
                /**
                 * Use this field to store any other reference for the transaction (for example, a phone number).
                 * example:
                 * John Doe
                 */
                variableReference?: string;
                /**
                 * This is your own comment for the transaction.
                 * example:
                 * Additional comments about the transaction
                 */
                comment1?: string;
                /**
                 * This is your own comment for the transaction.
                 * example:
                 * Additional comments about the transaction
                 */
                comment2?: string;
                /**
                 * This is a reference you use to uniquely identify each of your customers.
                 * example:
                 * 08303863544
                 */
                merchantCustomerIdentification?: string;
                /**
                 * The first line of the delivery address.
                 * example:
                 * 12 The Street
                 */
                deliveryAddressLine1?: string;
                /**
                 * The second line of the delivery address.
                 * example:
                 * The Way
                 */
                deliveryAddressLine2?: string;
                /**
                 * Delivery address city
                 * example:
                 * London
                 */
                deliveryCity?: string;
                /**
                 * Delivery address post code
                 * example:
                 * EC15155
                 */
                deliveryPostCode?: string;
                /**
                 * 2-digit code for the country
                 * example:
                 * GB
                 */
                deliveryCountry?: string;
            };
            /**
             * For the hosted option, the payer will be asked to fill in these fields but they will not be mandatory. You can choose to collect any of the payer's `ADDRESS`, `REFERENCE` and/or `COMMENT1`. If you choose to collect these fields from the payer, you cannot set 'delivery’, 'variableReference’ or 'comment1’ fields respectively.
             * example:
             * ADDRESS|REFERENCE|COMMENT1
             */
            collectFields?: string;
            /**
             * For the hosted option, these fields will be madatory for the payer to fill in on the hosted payment page. You can choose to collect any the payer's `ADDRESS`, `REFERENCE` and/or `COMMENT1`. If you choose to collect these fields from the payer, you cannot set 'delivery’, 'variableReference’ or 'comment1’ fields respectively.
             * example:
             * ADDRESS|REFERENCE|COMMENT1
             */
            mandatoryFields?: string;
            /**
             * These fields will be displayed to the payer when using the hosted option. You can choose to display any of `ORDER_ID`, `PRODUCT_ID`, `CUSTOMER_ID`, `CUSTOMER_NUMBER` and `COMMENT2` to the payer.
             * example:
             * ORDER_ID|PRODUCT_ID|CUSTOMER_ID|CUSTOMER_NUMBER|COMMENT2
             */
            additionalFields?: string;
        }
        namespace Responses {
            /**
             * newPaymentRequestResponse
             */
            export interface $200 {
                /**
                 * The code for this request. Create a URL in this format: `https://payments.fire.com/{code}` and share to your customers.
                 *
                 * example:
                 * 1234abcd
                 */
                code?: string;
                /**
                 * The type of Fire Open Payment that was created.
                 */
                type?: "OTHER";
            }
        }
    }
    namespace RejectDirectDebit {
        namespace Parameters {
            /**
             * The uuid of the direct debit to retrieve.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type DirectDebitUuid = string;
        }
        export interface PathParameters {
            directDebitUuid: /**
             * The uuid of the direct debit to retrieve.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.DirectDebitUuid;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace SendTestWebhook {
        namespace Parameters {
            /**
             * The type of event to send. Currently only one event type is associated with each webhook, however this may change in future.
             * example:
             * CARD_AUTHORISATION
             */
            export type Event = "LODGEMENT_RECEIVED" | "PAYMENT_RECEIVED" | "PAYMENT_REQUEST_PAYMENT_RECEIVED" | "ACCOUNT_CREATED" | "CARD_CREATED" | "CARD_AUTHORISATION" | "CARD_SETTLEMENT" | "PAYMENT_REQUEST_PAYMENT_AUTHORISED" | "PIS_LODGEMENT_RECEIVED";
            /**
             * The ID of the webhook to test
             * example:
             * 32
             */
            export type WebhookId = number; // int64
        }
        export interface PathParameters {
            webhookId: /**
             * The ID of the webhook to test
             * example:
             * 32
             */
            Parameters.WebhookId /* int64 */;
            event: /**
             * The type of event to send. Currently only one event type is associated with each webhook, however this may change in future.
             * example:
             * CARD_AUTHORISATION
             */
            Parameters.Event;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace SubmitBatch {
        namespace Parameters {
            /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type BatchUuid = string;
        }
        export interface PathParameters {
            batchUuid: /**
             * The uuid of the batch.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.BatchUuid;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace UnblockCard {
        namespace Parameters {
            /**
             * The cardid of the card to unblock
             */
            export type CardId = number; // int64
        }
        export interface PathParameters {
            cardId: /* The cardid of the card to unblock */ Parameters.CardId /* int64 */;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace UpdateMandateAlias {
        namespace Parameters {
            /**
             * The uuid of the mandate to update.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            export type MandateUuid = string;
        }
        export interface PathParameters {
            mandateUuid: /**
             * The uuid of the mandate to update.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            Parameters.MandateUuid;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace UpdatePaymentRequests {
        namespace Parameters {
            /**
             * The code of the payment request to update
             * example:
             * xyzabcde
             */
            export type PaymentRequestCode = string;
        }
        export interface PathParameters {
            paymentRequestCode: /**
             * The code of the payment request to update
             * example:
             * xyzabcde
             */
            Parameters.PaymentRequestCode;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * authenticate - Authenticate with the API.
   * 
   * Access to the API is by Bearer Access Tokens. These are valid for 15 minutes. You can have multiple Access Tokens active at the same time if needed. See the [Guide to Authentication](/docs/authentication) for full details.
   */
  'authenticate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Authenticate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Authenticate.Responses.$200>
  /**
   * getAccounts - List Accounts
   * 
   * Returns all your fire.com Accounts. Ordered by Alias ascending. Can be paginated.
   */
  'getAccounts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccounts.Responses.$200>
  /**
   * addAccount - Create a new Fire Account
   * 
   * Creates a new fire.com account.
   * 
   * **Please note there is a charge associated with creating a new account.**
   * 
   */
  'addAccount'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddAccount.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddAccount.Responses.$201>
  /**
   * getActivities - Get Account Activity
   * 
   * Retrieve the details of activity on your fire.com Account
   */
  'getActivities'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetActivities.Responses.$200>
  /**
   * getAccountById - Get details of an Account
   * 
   * You can retrieve the details of a fire.com Account by its `ican`.
   */
  'getAccountById'(
    parameters?: Parameters<Paths.GetAccountById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccountById.Responses.$200>
  /**
   * getTransactionsByAccountIdv1 - List transactions on an account (v1)
   * 
   * Retrieve a list of transactions against an account. Recommended to use the v3 endpoint instead.
   */
  'getTransactionsByAccountIdv1'(
    parameters?: Parameters<Paths.GetTransactionsByAccountIdv1.QueryParameters & Paths.GetTransactionsByAccountIdv1.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsByAccountIdv1.Responses.$200>
  /**
   * getTransactionsByAccountIdv3 - List transactions for an account (v3)
   * 
   * Retrieve a list of transactions against an account. Initially, use the optional `limit`, `dateRangeFrom` and `dateRangeTo` query params to limit your query, then use the embedded `next` or `prev` links in the response to get newer or older pages.
   * 
   */
  'getTransactionsByAccountIdv3'(
    parameters?: Parameters<Paths.GetTransactionsByAccountIdv3.QueryParameters & Paths.GetTransactionsByAccountIdv3.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsByAccountIdv3.Responses.$200>
  /**
   * getTransactionsByAccountIdFiltered - Filter transactions on an account (v1)
   * 
   * Retrieve a filtered list of transactions against an account. Recommended to use the v3 endpoint instead.
   * * `dateRangeFrom` - A millisecond epoch time specifying the date range start date.
   * * `dateRangeTo` - A millisecond epoch time specifying the date range end date.
   * * `searchKeyword` - Search term to filter by from the reference field (`myRef`).
   * * `transactionTypes` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
   * * `offset` - The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
   * * `limit` - the number of items to return. 
   * 
   */
  'getTransactionsByAccountIdFiltered'(
    parameters?: Parameters<Paths.GetTransactionsByAccountIdFiltered.QueryParameters & Paths.GetTransactionsByAccountIdFiltered.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsByAccountIdFiltered.Responses.$200>
  /**
   * getListofCards - List Debit Cards
   * 
   * Returns a list of cards related to your fire.com account.
   */
  'getListofCards'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListofCards.Responses.$200>
  /**
   * createNewCard - Create a new Fire debit card
   * 
   * You can create multiple debit cards which can be linked to your fire.com accounts.
   */
  'createNewCard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateNewCard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateNewCard.Responses.$200>
  /**
   * getListofCardTransactions - Get a list of Debit Card Transactions
   * 
   * Returns a list of cards transactions related to your fire.com card.
   */
  'getListofCardTransactions'(
    parameters?: Parameters<Paths.GetListofCardTransactions.QueryParameters & Paths.GetListofCardTransactions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListofCardTransactions.Responses.$200>
  /**
   * blockCard - Block a Fire Debit card
   * 
   * Updates status of an existing card to block which prevents any transactions being carried out with that card.
   */
  'blockCard'(
    parameters?: Parameters<Paths.BlockCard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BlockCard.Responses.$204>
  /**
   * unblockCard - Unblock a Fire debit card
   * 
   * Updates status of an existing card to unblock which means that transactions can be carried out with that card.
   */
  'unblockCard'(
    parameters?: Parameters<Paths.UnblockCard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnblockCard.Responses.$204>
  /**
   * newPaymentRequest - Create a Payment request
   * 
   * This request creates a new Open Banking Payment request. A code is returned that can be shared to your customers as a URL by any channel you wish. See our [Guide to Fire Open Payments](/docs/fire-open-payments) for more details. You will need to enable the `PERM_BUSINESS_POST_PAYMENT_REQUEST` permission to use this endpoint.
   * 
   */
  'newPaymentRequest'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NewPaymentRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewPaymentRequest.Responses.$200>
  /**
   * getPaymentRequestDetails - Get Payment Details
   * 
   * Retrieve the details of an Open Banking Payment request
   * 
   */
  'getPaymentRequestDetails'(
    parameters?: Parameters<Paths.GetPaymentRequestDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentRequestDetails.Responses.$200>
  /**
   * getPaymentRequestPayments - Get list of all Payment Attempts related to a Payment Request
   * 
   * Retrieve the list of payments attempted against an Open Banking Payment request
   * 
   */
  'getPaymentRequestPayments'(
    parameters?: Parameters<Paths.GetPaymentRequestPayments.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentRequestPayments.Responses.$200>
  /**
   * getPaymentRequestPaymentsv2 - Get list of all Payment Attempts related to a Payment Request
   * 
   * Retrieve the list of payments attempted against an Open Banking Payment request
   * 
   */
  'getPaymentRequestPaymentsv2'(
    parameters?: Parameters<Paths.GetPaymentRequestPaymentsv2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentRequestPaymentsv2.Responses.$200>
  /**
   * getPaymentRequestReportV2 - Get a report from a Payment Request
   * 
   * Retrieve a report for an Open Banking Payment request
   * 
   */
  'getPaymentRequestReportV2'(
    parameters?: Parameters<Paths.GetPaymentRequestReportV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentRequestReportV2.Responses.$200>
  /**
   * getPaymentRequestsSentV2 - Get a list of Payment Request transactions
   * 
   * Retrieve the list of open banking payment requests made on your account
   * 
   */
  'getPaymentRequestsSentV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentRequestsSentV2.Responses.$200>
  /**
   * GetPublicPaymentRequestV2 - List details of a public payment request
   * 
   * Returns an object of payment request information
   */
  'GetPublicPaymentRequestV2'(
    parameters?: Parameters<Paths.GetPublicPaymentRequestV2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPublicPaymentRequestV2.Responses.$200>
  /**
   * getPayeeAccountInfo - Get details of a Payee Account
   * 
   * Retrieve the list of payee account details for a specific payee
   * 
   */
  'getPayeeAccountInfo'(
    parameters?: Parameters<Paths.GetPayeeAccountInfo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPayeeAccountInfo.Responses.$200>
  /**
   * getPayeeTransactionInfo - List transaction to a Payee Account
   * 
   * Retrieves the list of transactions and transaction information associated with a payee
   * 
   */
  'getPayeeTransactionInfo'(
    parameters?: Parameters<Paths.GetPayeeTransactionInfo.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPayeeTransactionInfo.Responses.$200>
  /**
   * GetFXRates - Get FX Rates
   * 
   * Return exchange rate between two currencies
   */
  'GetFXRates'(
    parameters?: Parameters<Paths.GetFXRates.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFXRates.Responses.$200>
  /**
   * GetLimits - List all Limits
   * 
   * Returns an array of limit information
   */
  'GetLimits'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLimits.Responses.$200>
  /**
   * changeAccountConfig - Update Account Configuration
   * 
   * Changes the name associated with an account
   */
  'changeAccountConfig'(
    parameters?: Parameters<Paths.ChangeAccountConfig.PathParameters> | null,
    data?: Paths.ChangeAccountConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ChangeAccountConfig.Responses.$204>
  /**
   * SendTestWebhook - Send test webhooks
   * 
   * Sends a test webhook response for a selected event to the chosen URL
   */
  'SendTestWebhook'(
    parameters?: Parameters<Paths.SendTestWebhook.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SendTestWebhook.Responses.$200>
  /**
   * getNewPayeeBatch - List new payees in a batch
   * 
   * Retrieve a list of details of batch items with new payees
   * 
   */
  'getNewPayeeBatch'(
    parameters?: Parameters<Paths.GetNewPayeeBatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNewPayeeBatch.Responses.$200>
  /**
   * getPaymentDetails - Get Payment Details
   * 
   * Returns the details of a specific payment.
   * 
   * As the customer goes through the process of making the payment the status of the payment will change.
   * 
   * * `AWAITING_AUTHORISATION` -This is the initial status of all your payments.
   * * `AWAITING_MULTI_AUTHORISATION` - Some business accounts such as charities require dual authorisation.
   * * `NOT_AUTHORISED` - Either your customer clicked on cancel or the payment was rejected by their ASPSP / bank.
   * * `PENDING` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank but the bank may want to carry out another check before funding the transaction.
   * * `AUTHORISED` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank.
   * * `PAID` - Funds were received into your fire.com GBP or EUR account from your customer’s ASPSP / bank.
   * 
   * 
   * You will need to enable the `PERM_BUSINESS_GET_PAYMENT` permission to use this endpoint.
   * 
   */
  'getPaymentDetails'(
    parameters?: Parameters<Paths.GetPaymentDetails.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentDetails.Responses.$200>
  /**
   * getPaymentDetailsv2 - Get Payment Details (v2)
   * 
   * Returns the details of a specific payment.
   * 
   * You will need to enable the `PERM_BUSINESS_GET_PAYMENT` permission to use this endpoint.
   * 
   * As your customer goes through the payment submission journey, the payment status will change. The endpoint will return one of the following statuses:
   * 
   * * `AWAITING_AUTHORISATION` - This is the initial status of all payments, indicating that the user has consented to be directed to their ASPSP/Bank's application. Payments remaining at this status may be considered abandoned.
   * * `AWAITING_MULTI_AUTHORISATION` - Some business accounts require dual authorisation for payments.
   * * `NOT_AUTHORISED` - This is a final status, and indicates that the payment initiation was cancelled by the customer, rejected by the ASPSP/Bank, an error response returned by the ASPSP/Bank, eg. low balance in the customers account.
   * * `PENDING` - The customer has authorised the payment in their app, but their ASPSP/bank may want to carry out an internal check before funding the transaction.
   * * `AUTHORISED` - The payment is successfully initiated, having been authorised by your customer and their ASPSP/Bank.
   * 
   * Once the payment is successfully initiated, ie. `AUTHORISED`, the ASPSP/Bank should settle the funds, which are then applied to your Fire account.
   * 
   * * `FUNDS_CONFIRMED` - This status is currently available for GBP payments only. The payment has been received by Fire and will be applied to your account in the next file run.
   * * `SETTLED` - This is a final status, indicating that funds have been applied to your Fire GBP or EUR account.
   * 
   */
  'getPaymentDetailsv2'(
    parameters?: Parameters<Paths.GetPaymentDetailsv2.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentDetailsv2.Responses.$200>
  /**
   * getListOfAspsps - Get list of ASPSPs / Banks
   * 
   * Returns all ASPSPs (Account Servicing Payment Service Provider) / banks. The list can be filtered by currency. You will need to enable the `PERM_BUSINESS_GET_ASPSPS` permission to use this endpoint.
   * ***This endpoint is only required if you intend to host the “Select ASPSP / bank” page yourself.***
   * 
   */
  'getListOfAspsps'(
    parameters?: Parameters<Paths.GetListOfAspsps.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListOfAspsps.Responses.$200>
  /**
   * getUsers - List all Users
   * 
   * You can retrieve the details of all fire.com users on your acount.
   */
  'getUsers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUsers.Responses.$200>
  /**
   * getUser - Get the details of a User
   * 
   * You can retrieve the details of a specific fire.com user
   */
  'getUser'(
    parameters?: Parameters<Paths.GetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUser.Responses.$200>
  /**
   * getApiApplications - List all API Applications
   * 
   * Returns a list of API applications created under your fire.com account
   */
  'getApiApplications'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetApiApplications.Responses.$200>
  /**
   * createApiApplication - Create an API Application
   * 
   * Create a new API Application with specified permissions
   */
  'createApiApplication'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateApiApplication.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateApiApplication.Responses.$200>
  /**
   * GetPermissions - List all permissions for an API application
   * 
   * Get all permissions allowed for a specific API application on your fire.com account
   */
  'GetPermissions'(
    parameters?: Parameters<Paths.GetPermissions.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPermissions.Responses.$200>
  /**
   * GetAllPermissions - List all permissions for API applications
   * 
   * Get all permissions available for any API application on your fire.com account
   */
  'GetAllPermissions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllPermissions.Responses.$200>
  /**
   * getPayees - List Payee Bank Accounts
   * 
   * Returns all your payee bank accounts. 
   * 
   * Ordered by payee name ascending. 
   * 
   * Can be paginated.
   * 
   */
  'getPayees'(
    parameters?: Parameters<Paths.GetPayees.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPayees.Responses.$200>
  /**
   * getDirectDebitsForMandateUuid - List all Direct Debits
   * 
   * Retrieve all direct debit payments associated with a direct debit mandate.
   * The permision needed to access this endpoint is PERM_BUSINESS_GET_DIRECT_DEBITS
   * 
   */
  'getDirectDebitsForMandateUuid'(
    parameters?: Parameters<Paths.GetDirectDebitsForMandateUuid.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDirectDebitsForMandateUuid.Responses.$200>
  /**
   * getDirectDebitByUuid - Get the details of a direct debit
   * 
   * Retrieve all details of a single direct debit collection/payment, whether successful or not.
   * The permision needed to access this endpoint is **PERM_BUSINESS_GET_DIRECT_DEBIT**
   * 
   */
  'getDirectDebitByUuid'(
    parameters?: Parameters<Paths.GetDirectDebitByUuid.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDirectDebitByUuid.Responses.$200>
  /**
   * rejectDirectDebit - Reject a direct debit
   * 
   * This endpoint allows you to reject a direct debit payment where the status is still set to RECEIVED.
   * Permission name PERM_BUSINESS_POST_DIRECT_DEBIT_REJECT
   * 
   */
  'rejectDirectDebit'(
    parameters?: Parameters<Paths.RejectDirectDebit.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RejectDirectDebit.Responses.$204>
  /**
   * getDirectDebitMandates - List all direct debit mandates
   * 
   * The permision needed to access this endpoint is PERM_BUSINESS_GET_MANDATES
   * 
   */
  'getDirectDebitMandates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDirectDebitMandates.Responses.$200>
  /**
   * getMandate - Get the details of a direct debit mandate
   * 
   * Retrieve all details for a direct debit mandate.
   * The permision needed to access this endpoint is PERM_BUSINESS_GET_MANDATE
   * 
   */
  'getMandate'(
    parameters?: Parameters<Paths.GetMandate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMandate.Responses.$200>
  /**
   * updateMandateAlias - Update direct debit mandate alias
   * 
   * Update Direct Debit Mandate Alias
   * The permision needed to access this endpoint is PERM_BUSINESS_PUT_MANDATE
   * 
   */
  'updateMandateAlias'(
    parameters?: Parameters<Paths.UpdateMandateAlias.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateMandateAlias.Responses.$204>
  /**
   * cancelMandateByUuid - Cancel a direct debit mandate
   * 
   * This endpoint allows you to cancel a direct debit mandate.
   * The permision needed to access this endpoint is PERM_BUSINESS_POST_MANDATE_CANCEL
   * 
   */
  'cancelMandateByUuid'(
    parameters?: Parameters<Paths.CancelMandateByUuid.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelMandateByUuid.Responses.$204>
  /**
   * activateMandate - Activate a direct debit mandate
   * 
   * This endpoint can only be used to activate a direct debit mandate when it is in the status REJECT_REQUESTED (even if the account has direct debits disabled). This action will also enable the account for direct debits if it was previously set to be disabled.
   * The permision needed to access this endpoint is PERM_BUSINESS_POST_MANDATE_ACTIVATE
   * 
   */
  'activateMandate'(
    parameters?: Parameters<Paths.ActivateMandate.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ActivateMandate.Responses.$204>
  /**
   * getBatches - List all Batches
   * 
   * Returns the list of batch with the specified types and statuses.
   * 
   */
  'getBatches'(
    parameters?: Parameters<Paths.GetBatches.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBatches.Responses.$200>
  /**
   * createBatchPayment - Create a new Batch
   * 
   * Opens a new batch container to hold specific transaction types in a certain currency.
   * 
   */
  'createBatchPayment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBatchPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBatchPayment.Responses.$200>
  /**
   * getItemsBatchInternalTrasnfer - List items for an Internal Transfer Batch
   * 
   * Returns a paginated list of items in the specified batch.
   */
  'getItemsBatchInternalTrasnfer'(
    parameters?: Parameters<Paths.GetItemsBatchInternalTrasnfer.QueryParameters & Paths.GetItemsBatchInternalTrasnfer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetItemsBatchInternalTrasnfer.Responses.$200>
  /**
   * addInternalTransferBatchPayment - Add an internal transfer to a Batch
   * 
   * Simply specify the source account, destination account, amount and a reference.
   */
  'addInternalTransferBatchPayment'(
    parameters?: Parameters<Paths.AddInternalTransferBatchPayment.PathParameters> | null,
    data?: Paths.AddInternalTransferBatchPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddInternalTransferBatchPayment.Responses.$200>
  /**
   * getItemsBatchBankTransfer - List items for a Bank Transfer Batch
   * 
   * Returns a paginated list of items in the specified batch.
   */
  'getItemsBatchBankTransfer'(
    parameters?: Parameters<Paths.GetItemsBatchBankTransfer.QueryParameters & Paths.GetItemsBatchBankTransfer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetItemsBatchBankTransfer.Responses.$200>
  /**
   * addBankTransferBatchPayment - Add a Bank Transfer to a Batch
   * 
   * There are two ways to process bank transfers - by Payee ID (**Mode 1**) or by Payee Account Details (**Mode 2**).
   * 
   * **Mode 1:** Use the payee IDs of existing approved payees set up against your account. These batches can be approved in the normal manner.
   * 
   * **Mode 2:** Use the account details of the payee. In the event that these details correspond to an existing approved payee, the batch can be approved as normal. If the account details are new, a batch of New Payees will automatically be created. This batch will need to be approved before the Payment batch can be approved. These payees will then exist as approved payees for future batches.
   * 
   */
  'addBankTransferBatchPayment'(
    parameters?: Parameters<Paths.AddBankTransferBatchPayment.PathParameters> | null,
    data?: Paths.AddBankTransferBatchPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddBankTransferBatchPayment.Responses.$200>
  /**
   * getItemsBatchInternationalTransfer - List items for an International Transfer Batch
   * 
   * Returns a paginated list of items in the specified batch.
   */
  'getItemsBatchInternationalTransfer'(
    parameters?: Parameters<Paths.GetItemsBatchInternationalTransfer.QueryParameters & Paths.GetItemsBatchInternationalTransfer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetItemsBatchInternationalTransfer.Responses.$200>
  /**
   * addInternationalTransferBatchPayment - Add an international transfer to a Batch
   * 
   * International transfers must be added to a batch using the Payee ID (**Mode 1**). Payees must be set up using the web application.
   * 
   * **Mode 1:** Use the payee IDs of existing approved payees set up against your account. These batches can be approved in the normal manner.
   * 
   */
  'addInternationalTransferBatchPayment'(
    parameters?: Parameters<Paths.AddInternationalTransferBatchPayment.PathParameters> | null,
    data?: Paths.AddInternationalTransferBatchPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddInternationalTransferBatchPayment.Responses.$200>
  /**
   * deleteInternalTransferBatchPayment - Remove an internal transfer from a Batch
   * 
   * Removes a Payment from the Batch (Internal Transfer). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
   */
  'deleteInternalTransferBatchPayment'(
    parameters?: Parameters<Paths.DeleteInternalTransferBatchPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteInternalTransferBatchPayment.Responses.$200>
  /**
   * deleteBankTransferBatchPayment - Remove a Bank Transfer from a Batch
   * 
   * Removes a Payment from the Batch (Bank Transfers). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
   */
  'deleteBankTransferBatchPayment'(
    parameters?: Parameters<Paths.DeleteBankTransferBatchPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBankTransferBatchPayment.Responses.$200>
  /**
   * deleteInternationalTransferBatchPayment - Remove an international transfer from a Batch
   * 
   * Removes a Payment from the Batch (International Transfers). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
   */
  'deleteInternationalTransferBatchPayment'(
    parameters?: Parameters<Paths.DeleteInternationalTransferBatchPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteInternationalTransferBatchPayment.Responses.$200>
  /**
   * getDetailsSingleBatch - Get the details of a Batch
   * 
   * Returns the details of the batch specified in the API endpoint - {batchUuid}.
   */
  'getDetailsSingleBatch'(
    parameters?: Parameters<Paths.GetDetailsSingleBatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDetailsSingleBatch.Responses.$200>
  /**
   * submitBatch - Submit a Batch
   * 
   * Submits the Batch (for approval in the case of a **BANK_TRANSFER** or **INTERNATIONAL_TRANSFER**). If this is an **INTERNAL_TRANSFER** batch, the transfers are immediately queued for processing. If this is a **BANK_TRANSFER** or **INTERNATIONAL_TRANSFER** batch, this will trigger requests for approval to the firework mobile apps of authorised users. Once those users approve the batch, it is queued for processing.
   * 
   * You can only submit a batch while it is in the OPEN state.
   * 
   */
  'submitBatch'(
    parameters?: Parameters<Paths.SubmitBatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SubmitBatch.Responses.$204>
  /**
   * cancelBatchPayment - Cancel a batch
   * 
   * Cancels the Batch. You can only cancel a batch before it is submitted for approval (while it is in the OPEN state).
   */
  'cancelBatchPayment'(
    parameters?: Parameters<Paths.CancelBatchPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelBatchPayment.Responses.$200>
  /**
   * getListofApproversForBatch - List Approvals for a Batch
   * 
   * Returns a list of approvers for this batch.
   */
  'getListofApproversForBatch'(
    parameters?: Parameters<Paths.GetListofApproversForBatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListofApproversForBatch.Responses.$200>
  /**
   * getUserAddress - Get the address of a User
   * 
   * You can retrieve the address of a specific fire.com user
   */
  'getUserAddress'(
    parameters?: Parameters<Paths.GetUserAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserAddress.Responses.$200>
  /**
   * getServices - Get Service Fees and Info
   * 
   * Returns an array of the services and fees associated with them
   */
  'getServices'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetServices.Responses.$200>
  /**
   * updatePaymentRequests - Update the status of a payment request
   * 
   * Update the status of a payment request. The payment request should be active or removed.
   * 
   */
  'updatePaymentRequests'(
    parameters?: Parameters<Paths.UpdatePaymentRequests.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdatePaymentRequests.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/apps/accesstokens']: {
    /**
     * authenticate - Authenticate with the API.
     * 
     * Access to the API is by Bearer Access Tokens. These are valid for 15 minutes. You can have multiple Access Tokens active at the same time if needed. See the [Guide to Authentication](/docs/authentication) for full details.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Authenticate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Authenticate.Responses.$200>
  }
  ['/v1/accounts']: {
    /**
     * getAccounts - List Accounts
     * 
     * Returns all your fire.com Accounts. Ordered by Alias ascending. Can be paginated.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccounts.Responses.$200>
    /**
     * addAccount - Create a new Fire Account
     * 
     * Creates a new fire.com account.
     * 
     * **Please note there is a charge associated with creating a new account.**
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddAccount.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddAccount.Responses.$201>
  }
  ['/v2/activites']: {
    /**
     * getActivities - Get Account Activity
     * 
     * Retrieve the details of activity on your fire.com Account
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetActivities.Responses.$200>
  }
  ['/v1/accounts/{ican}']: {
    /**
     * getAccountById - Get details of an Account
     * 
     * You can retrieve the details of a fire.com Account by its `ican`.
     */
    'get'(
      parameters?: Parameters<Paths.GetAccountById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccountById.Responses.$200>
  }
  ['/v1/accounts/{ican}/transactions']: {
    /**
     * getTransactionsByAccountIdv1 - List transactions on an account (v1)
     * 
     * Retrieve a list of transactions against an account. Recommended to use the v3 endpoint instead.
     */
    'get'(
      parameters?: Parameters<Paths.GetTransactionsByAccountIdv1.QueryParameters & Paths.GetTransactionsByAccountIdv1.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsByAccountIdv1.Responses.$200>
  }
  ['/v3/accounts/{ican}/transactions']: {
    /**
     * getTransactionsByAccountIdv3 - List transactions for an account (v3)
     * 
     * Retrieve a list of transactions against an account. Initially, use the optional `limit`, `dateRangeFrom` and `dateRangeTo` query params to limit your query, then use the embedded `next` or `prev` links in the response to get newer or older pages.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTransactionsByAccountIdv3.QueryParameters & Paths.GetTransactionsByAccountIdv3.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsByAccountIdv3.Responses.$200>
  }
  ['/v1/accounts/{ican}/transactions/filter']: {
    /**
     * getTransactionsByAccountIdFiltered - Filter transactions on an account (v1)
     * 
     * Retrieve a filtered list of transactions against an account. Recommended to use the v3 endpoint instead.
     * * `dateRangeFrom` - A millisecond epoch time specifying the date range start date.
     * * `dateRangeTo` - A millisecond epoch time specifying the date range end date.
     * * `searchKeyword` - Search term to filter by from the reference field (`myRef`).
     * * `transactionTypes` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
     * * `offset` - The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
     * * `limit` - the number of items to return. 
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTransactionsByAccountIdFiltered.QueryParameters & Paths.GetTransactionsByAccountIdFiltered.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsByAccountIdFiltered.Responses.$200>
  }
  ['/v1/cards']: {
    /**
     * getListofCards - List Debit Cards
     * 
     * Returns a list of cards related to your fire.com account.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListofCards.Responses.$200>
    /**
     * createNewCard - Create a new Fire debit card
     * 
     * You can create multiple debit cards which can be linked to your fire.com accounts.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateNewCard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateNewCard.Responses.$200>
  }
  ['/v1/cards/{cardId}/transactions']: {
    /**
     * getListofCardTransactions - Get a list of Debit Card Transactions
     * 
     * Returns a list of cards transactions related to your fire.com card.
     */
    'get'(
      parameters?: Parameters<Paths.GetListofCardTransactions.QueryParameters & Paths.GetListofCardTransactions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListofCardTransactions.Responses.$200>
  }
  ['/v1/cards/{cardId}/block']: {
    /**
     * blockCard - Block a Fire Debit card
     * 
     * Updates status of an existing card to block which prevents any transactions being carried out with that card.
     */
    'post'(
      parameters?: Parameters<Paths.BlockCard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BlockCard.Responses.$204>
  }
  ['/v1/cards/{cardId}/unblock']: {
    /**
     * unblockCard - Unblock a Fire debit card
     * 
     * Updates status of an existing card to unblock which means that transactions can be carried out with that card.
     */
    'post'(
      parameters?: Parameters<Paths.UnblockCard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnblockCard.Responses.$204>
  }
  ['/v1/paymentrequests']: {
    /**
     * newPaymentRequest - Create a Payment request
     * 
     * This request creates a new Open Banking Payment request. A code is returned that can be shared to your customers as a URL by any channel you wish. See our [Guide to Fire Open Payments](/docs/fire-open-payments) for more details. You will need to enable the `PERM_BUSINESS_POST_PAYMENT_REQUEST` permission to use this endpoint.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NewPaymentRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewPaymentRequest.Responses.$200>
  }
  ['/v1/paymentrequests/{paymentRequestCode}']: {
    /**
     * getPaymentRequestDetails - Get Payment Details
     * 
     * Retrieve the details of an Open Banking Payment request
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPaymentRequestDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentRequestDetails.Responses.$200>
  }
  ['/v1/paymentrequests/{paymentRequestCode}/payments']: {
    /**
     * getPaymentRequestPayments - Get list of all Payment Attempts related to a Payment Request
     * 
     * Retrieve the list of payments attempted against an Open Banking Payment request
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPaymentRequestPayments.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentRequestPayments.Responses.$200>
  }
  ['/v2/paymentrequests/{paymentRequestCode}/payments']: {
    /**
     * getPaymentRequestPaymentsv2 - Get list of all Payment Attempts related to a Payment Request
     * 
     * Retrieve the list of payments attempted against an Open Banking Payment request
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPaymentRequestPaymentsv2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentRequestPaymentsv2.Responses.$200>
  }
  ['/v2/paymentrequests/{paymentRequestCode}/reports']: {
    /**
     * getPaymentRequestReportV2 - Get a report from a Payment Request
     * 
     * Retrieve a report for an Open Banking Payment request
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPaymentRequestReportV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentRequestReportV2.Responses.$200>
  }
  ['/v2/paymentrequests/sent']: {
    /**
     * getPaymentRequestsSentV2 - Get a list of Payment Request transactions
     * 
     * Retrieve the list of open banking payment requests made on your account
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentRequestsSentV2.Responses.$200>
  }
  ['/v2/paymentrequests/{paymentRequestCode}/public']: {
    /**
     * GetPublicPaymentRequestV2 - List details of a public payment request
     * 
     * Returns an object of payment request information
     */
    'get'(
      parameters?: Parameters<Paths.GetPublicPaymentRequestV2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPublicPaymentRequestV2.Responses.$200>
  }
  ['/v2/payees/{fundingSrcId}']: {
    /**
     * getPayeeAccountInfo - Get details of a Payee Account
     * 
     * Retrieve the list of payee account details for a specific payee
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPayeeAccountInfo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPayeeAccountInfo.Responses.$200>
  }
  ['/v2/payees/{fundingSrcId}/transactions']: {
    /**
     * getPayeeTransactionInfo - List transaction to a Payee Account
     * 
     * Retrieves the list of transactions and transaction information associated with a payee
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPayeeTransactionInfo.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPayeeTransactionInfo.Responses.$200>
  }
  ['/v2/rates/{fromCurrency}/{toCurrency}']: {
    /**
     * GetFXRates - Get FX Rates
     * 
     * Return exchange rate between two currencies
     */
    'get'(
      parameters?: Parameters<Paths.GetFXRates.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFXRates.Responses.$200>
  }
  ['/v2/limits']: {
    /**
     * GetLimits - List all Limits
     * 
     * Returns an array of limit information
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLimits.Responses.$200>
  }
  ['/v2/accounts/{ican}']: {
    /**
     * changeAccountConfig - Update Account Configuration
     * 
     * Changes the name associated with an account
     */
    'put'(
      parameters?: Parameters<Paths.ChangeAccountConfig.PathParameters> | null,
      data?: Paths.ChangeAccountConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ChangeAccountConfig.Responses.$204>
  }
  ['/v2/webhooks/{webhookId}/events/{event}/test']: {
    /**
     * SendTestWebhook - Send test webhooks
     * 
     * Sends a test webhook response for a selected event to the chosen URL
     */
    'get'(
      parameters?: Parameters<Paths.SendTestWebhook.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SendTestWebhook.Responses.$200>
  }
  ['/v2/batches/{batchUuid}/newpayees']: {
    /**
     * getNewPayeeBatch - List new payees in a batch
     * 
     * Retrieve a list of details of batch items with new payees
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetNewPayeeBatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNewPayeeBatch.Responses.$200>
  }
  ['/v1/payments/{paymentUuid}']: {
    /**
     * getPaymentDetails - Get Payment Details
     * 
     * Returns the details of a specific payment.
     * 
     * As the customer goes through the process of making the payment the status of the payment will change.
     * 
     * * `AWAITING_AUTHORISATION` -This is the initial status of all your payments.
     * * `AWAITING_MULTI_AUTHORISATION` - Some business accounts such as charities require dual authorisation.
     * * `NOT_AUTHORISED` - Either your customer clicked on cancel or the payment was rejected by their ASPSP / bank.
     * * `PENDING` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank but the bank may want to carry out another check before funding the transaction.
     * * `AUTHORISED` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank.
     * * `PAID` - Funds were received into your fire.com GBP or EUR account from your customer’s ASPSP / bank.
     * 
     * 
     * You will need to enable the `PERM_BUSINESS_GET_PAYMENT` permission to use this endpoint.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPaymentDetails.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentDetails.Responses.$200>
  }
  ['/v2/payments/{paymentUuid}']: {
    /**
     * getPaymentDetailsv2 - Get Payment Details (v2)
     * 
     * Returns the details of a specific payment.
     * 
     * You will need to enable the `PERM_BUSINESS_GET_PAYMENT` permission to use this endpoint.
     * 
     * As your customer goes through the payment submission journey, the payment status will change. The endpoint will return one of the following statuses:
     * 
     * * `AWAITING_AUTHORISATION` - This is the initial status of all payments, indicating that the user has consented to be directed to their ASPSP/Bank's application. Payments remaining at this status may be considered abandoned.
     * * `AWAITING_MULTI_AUTHORISATION` - Some business accounts require dual authorisation for payments.
     * * `NOT_AUTHORISED` - This is a final status, and indicates that the payment initiation was cancelled by the customer, rejected by the ASPSP/Bank, an error response returned by the ASPSP/Bank, eg. low balance in the customers account.
     * * `PENDING` - The customer has authorised the payment in their app, but their ASPSP/bank may want to carry out an internal check before funding the transaction.
     * * `AUTHORISED` - The payment is successfully initiated, having been authorised by your customer and their ASPSP/Bank.
     * 
     * Once the payment is successfully initiated, ie. `AUTHORISED`, the ASPSP/Bank should settle the funds, which are then applied to your Fire account.
     * 
     * * `FUNDS_CONFIRMED` - This status is currently available for GBP payments only. The payment has been received by Fire and will be applied to your account in the next file run.
     * * `SETTLED` - This is a final status, indicating that funds have been applied to your Fire GBP or EUR account.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPaymentDetailsv2.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentDetailsv2.Responses.$200>
  }
  ['/v1/aspsps']: {
    /**
     * getListOfAspsps - Get list of ASPSPs / Banks
     * 
     * Returns all ASPSPs (Account Servicing Payment Service Provider) / banks. The list can be filtered by currency. You will need to enable the `PERM_BUSINESS_GET_ASPSPS` permission to use this endpoint.
     * ***This endpoint is only required if you intend to host the “Select ASPSP / bank” page yourself.***
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetListOfAspsps.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListOfAspsps.Responses.$200>
  }
  ['/v1/users']: {
    /**
     * getUsers - List all Users
     * 
     * You can retrieve the details of all fire.com users on your acount.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUsers.Responses.$200>
  }
  ['/v1/user/{userId}']: {
    /**
     * getUser - Get the details of a User
     * 
     * You can retrieve the details of a specific fire.com user
     */
    'get'(
      parameters?: Parameters<Paths.GetUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUser.Responses.$200>
  }
  ['/v1/apps']: {
    /**
     * getApiApplications - List all API Applications
     * 
     * Returns a list of API applications created under your fire.com account
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetApiApplications.Responses.$200>
    /**
     * createApiApplication - Create an API Application
     * 
     * Create a new API Application with specified permissions
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateApiApplication.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateApiApplication.Responses.$200>
  }
  ['/v1/apps/{applicationId}/permissions']: {
    /**
     * GetPermissions - List all permissions for an API application
     * 
     * Get all permissions allowed for a specific API application on your fire.com account
     */
    'get'(
      parameters?: Parameters<Paths.GetPermissions.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPermissions.Responses.$200>
  }
  ['/v1/apps/permissions']: {
    /**
     * GetAllPermissions - List all permissions for API applications
     * 
     * Get all permissions available for any API application on your fire.com account
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllPermissions.Responses.$200>
  }
  ['/v1/payees']: {
    /**
     * getPayees - List Payee Bank Accounts
     * 
     * Returns all your payee bank accounts. 
     * 
     * Ordered by payee name ascending. 
     * 
     * Can be paginated.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetPayees.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPayees.Responses.$200>
  }
  ['/v1/directdebits']: {
    /**
     * getDirectDebitsForMandateUuid - List all Direct Debits
     * 
     * Retrieve all direct debit payments associated with a direct debit mandate.
     * The permision needed to access this endpoint is PERM_BUSINESS_GET_DIRECT_DEBITS
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetDirectDebitsForMandateUuid.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDirectDebitsForMandateUuid.Responses.$200>
  }
  ['/v1/directdebits/{directDebitUuid}']: {
    /**
     * getDirectDebitByUuid - Get the details of a direct debit
     * 
     * Retrieve all details of a single direct debit collection/payment, whether successful or not.
     * The permision needed to access this endpoint is **PERM_BUSINESS_GET_DIRECT_DEBIT**
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetDirectDebitByUuid.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDirectDebitByUuid.Responses.$200>
  }
  ['/v1/directdebits/{directDebitUuid}/reject']: {
    /**
     * rejectDirectDebit - Reject a direct debit
     * 
     * This endpoint allows you to reject a direct debit payment where the status is still set to RECEIVED.
     * Permission name PERM_BUSINESS_POST_DIRECT_DEBIT_REJECT
     * 
     */
    'post'(
      parameters?: Parameters<Paths.RejectDirectDebit.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RejectDirectDebit.Responses.$204>
  }
  ['/v1/mandates']: {
    /**
     * getDirectDebitMandates - List all direct debit mandates
     * 
     * The permision needed to access this endpoint is PERM_BUSINESS_GET_MANDATES
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDirectDebitMandates.Responses.$200>
  }
  ['/v1/mandates/{mandateUuid}']: {
    /**
     * getMandate - Get the details of a direct debit mandate
     * 
     * Retrieve all details for a direct debit mandate.
     * The permision needed to access this endpoint is PERM_BUSINESS_GET_MANDATE
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetMandate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMandate.Responses.$200>
    /**
     * updateMandateAlias - Update direct debit mandate alias
     * 
     * Update Direct Debit Mandate Alias
     * The permision needed to access this endpoint is PERM_BUSINESS_PUT_MANDATE
     * 
     */
    'post'(
      parameters?: Parameters<Paths.UpdateMandateAlias.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateMandateAlias.Responses.$204>
  }
  ['/v1/mandates/{mandateUuid}/cancel']: {
    /**
     * cancelMandateByUuid - Cancel a direct debit mandate
     * 
     * This endpoint allows you to cancel a direct debit mandate.
     * The permision needed to access this endpoint is PERM_BUSINESS_POST_MANDATE_CANCEL
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CancelMandateByUuid.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelMandateByUuid.Responses.$204>
  }
  ['/v1/mandates/{mandateUuid}/activate']: {
    /**
     * activateMandate - Activate a direct debit mandate
     * 
     * This endpoint can only be used to activate a direct debit mandate when it is in the status REJECT_REQUESTED (even if the account has direct debits disabled). This action will also enable the account for direct debits if it was previously set to be disabled.
     * The permision needed to access this endpoint is PERM_BUSINESS_POST_MANDATE_ACTIVATE
     * 
     */
    'post'(
      parameters?: Parameters<Paths.ActivateMandate.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ActivateMandate.Responses.$204>
  }
  ['/v1/batches']: {
    /**
     * createBatchPayment - Create a new Batch
     * 
     * Opens a new batch container to hold specific transaction types in a certain currency.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBatchPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBatchPayment.Responses.$200>
    /**
     * getBatches - List all Batches
     * 
     * Returns the list of batch with the specified types and statuses.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetBatches.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBatches.Responses.$200>
  }
  ['/v1/batches/{batchUuid}/internaltransfers']: {
    /**
     * addInternalTransferBatchPayment - Add an internal transfer to a Batch
     * 
     * Simply specify the source account, destination account, amount and a reference.
     */
    'post'(
      parameters?: Parameters<Paths.AddInternalTransferBatchPayment.PathParameters> | null,
      data?: Paths.AddInternalTransferBatchPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddInternalTransferBatchPayment.Responses.$200>
    /**
     * getItemsBatchInternalTrasnfer - List items for an Internal Transfer Batch
     * 
     * Returns a paginated list of items in the specified batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetItemsBatchInternalTrasnfer.QueryParameters & Paths.GetItemsBatchInternalTrasnfer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetItemsBatchInternalTrasnfer.Responses.$200>
  }
  ['/v1/batches/{batchUuid}/banktransfers']: {
    /**
     * addBankTransferBatchPayment - Add a Bank Transfer to a Batch
     * 
     * There are two ways to process bank transfers - by Payee ID (**Mode 1**) or by Payee Account Details (**Mode 2**).
     * 
     * **Mode 1:** Use the payee IDs of existing approved payees set up against your account. These batches can be approved in the normal manner.
     * 
     * **Mode 2:** Use the account details of the payee. In the event that these details correspond to an existing approved payee, the batch can be approved as normal. If the account details are new, a batch of New Payees will automatically be created. This batch will need to be approved before the Payment batch can be approved. These payees will then exist as approved payees for future batches.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AddBankTransferBatchPayment.PathParameters> | null,
      data?: Paths.AddBankTransferBatchPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddBankTransferBatchPayment.Responses.$200>
    /**
     * getItemsBatchBankTransfer - List items for a Bank Transfer Batch
     * 
     * Returns a paginated list of items in the specified batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetItemsBatchBankTransfer.QueryParameters & Paths.GetItemsBatchBankTransfer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetItemsBatchBankTransfer.Responses.$200>
  }
  ['/v2/batches/{batchUuid}/internationaltransfers']: {
    /**
     * addInternationalTransferBatchPayment - Add an international transfer to a Batch
     * 
     * International transfers must be added to a batch using the Payee ID (**Mode 1**). Payees must be set up using the web application.
     * 
     * **Mode 1:** Use the payee IDs of existing approved payees set up against your account. These batches can be approved in the normal manner.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.AddInternationalTransferBatchPayment.PathParameters> | null,
      data?: Paths.AddInternationalTransferBatchPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddInternationalTransferBatchPayment.Responses.$200>
    /**
     * getItemsBatchInternationalTransfer - List items for an International Transfer Batch
     * 
     * Returns a paginated list of items in the specified batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetItemsBatchInternationalTransfer.QueryParameters & Paths.GetItemsBatchInternationalTransfer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetItemsBatchInternationalTransfer.Responses.$200>
  }
  ['/v1/batches/{batchUuid}/internaltransfers/{itemUuid}']: {
    /**
     * deleteInternalTransferBatchPayment - Remove an internal transfer from a Batch
     * 
     * Removes a Payment from the Batch (Internal Transfer). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteInternalTransferBatchPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteInternalTransferBatchPayment.Responses.$200>
  }
  ['/v1/batches/{batchUuid}/banktransfers/{itemUuid}']: {
    /**
     * deleteBankTransferBatchPayment - Remove a Bank Transfer from a Batch
     * 
     * Removes a Payment from the Batch (Bank Transfers). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBankTransferBatchPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBankTransferBatchPayment.Responses.$200>
  }
  ['/v2/batches/{batchUuid}/internationaltransfers/{itemUuid}']: {
    /**
     * deleteInternationalTransferBatchPayment - Remove an international transfer from a Batch
     * 
     * Removes a Payment from the Batch (International Transfers). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteInternationalTransferBatchPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteInternationalTransferBatchPayment.Responses.$200>
  }
  ['/v1/batches/{batchUuid}']: {
    /**
     * cancelBatchPayment - Cancel a batch
     * 
     * Cancels the Batch. You can only cancel a batch before it is submitted for approval (while it is in the OPEN state).
     */
    'delete'(
      parameters?: Parameters<Paths.CancelBatchPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelBatchPayment.Responses.$200>
    /**
     * getDetailsSingleBatch - Get the details of a Batch
     * 
     * Returns the details of the batch specified in the API endpoint - {batchUuid}.
     */
    'get'(
      parameters?: Parameters<Paths.GetDetailsSingleBatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDetailsSingleBatch.Responses.$200>
    /**
     * submitBatch - Submit a Batch
     * 
     * Submits the Batch (for approval in the case of a **BANK_TRANSFER** or **INTERNATIONAL_TRANSFER**). If this is an **INTERNAL_TRANSFER** batch, the transfers are immediately queued for processing. If this is a **BANK_TRANSFER** or **INTERNATIONAL_TRANSFER** batch, this will trigger requests for approval to the firework mobile apps of authorised users. Once those users approve the batch, it is queued for processing.
     * 
     * You can only submit a batch while it is in the OPEN state.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.SubmitBatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SubmitBatch.Responses.$204>
  }
  ['/v1/batches/{batchUuid}/approvals']: {
    /**
     * getListofApproversForBatch - List Approvals for a Batch
     * 
     * Returns a list of approvers for this batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetListofApproversForBatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListofApproversForBatch.Responses.$200>
  }
  ['/v2/users/{userId}/address']: {
    /**
     * getUserAddress - Get the address of a User
     * 
     * You can retrieve the address of a specific fire.com user
     */
    'get'(
      parameters?: Parameters<Paths.GetUserAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserAddress.Responses.$200>
  }
  ['/v2/services']: {
    /**
     * getServices - Get Service Fees and Info
     * 
     * Returns an array of the services and fees associated with them
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetServices.Responses.$200>
  }
  ['/v2/paymentrequests/{paymentRequestCode}/status']: {
    /**
     * updatePaymentRequests - Update the status of a payment request
     * 
     * Update the status of a payment request. The payment request should be active or removed.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdatePaymentRequests.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdatePaymentRequests.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Account = Components.Schemas.Account;
export type Transaction = Components.Schemas.Transaction;
