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
                     * The three letter code for the currency - either `EUR` or `GBP`.
                     */
                    code?: "EUR" | "GBP";
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
             * The value of the transaction
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
             * The value of the transaction
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
             * amount of funds to be transfered
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
                 * The ID of the API Application
                 * example:
                 * 45345
                 */
                applicationId?: number; // int64
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
                 * The Client ID of the new API Application
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                clientId?: string;
                /**
                 * The Client Key of the new API Application
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                clientKey?: string;
                /**
                 * The Refresh Token of the new API Application
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                refreshToken?: string;
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
            type?: "BANK_TRANSFER" | "INTERNAL_TRANSFER";
            /**
             * GBP or EUR
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
                     * The three letter code for the currency - either `EUR` or `GBP`.
                     */
                    code?: "EUR" | "GBP";
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
    namespace GetBatches {
        namespace Parameters {
            /**
             * The status of the batch if internal transfer.
             * example:
             * SUBMITTED
             */
            export type BatchStatus = "SUBMITTED" | "REMOVED" | "SUCCEEDED" | "FAILED";
            /**
             * The type of the batch. Can be one of the 3 listed enums.
             * example:
             * INTERNAL_TRANSFER
             */
            export type BatchTypes = "INTERNAL_TRANSFER" | "BANK_TRANSFER" | "NEW_PAYEE";
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
             * The type of the batch. Can be one of the 3 listed enums.
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
                 * The type of the batch - can be one of the listed 3
                 */
                type?: "INTERNAL_TRANSFER" | "BANK_TRANSFER" | "NEW_PAYEE";
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
                 * All payments in the batch must be the same currency - either EUR or GBP
                 * example:
                 * EUR
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
                     * The three letter code for the currency - either `EUR` or `GBP`.
                     */
                    code?: "EUR" | "GBP";
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                total?: number;
                /**
                 * milisecond timestamp of date range to value.
                 * example:
                 * 1547744156603
                 */
                dateRangeTo?: number;
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                             * The ID number of the Withdrawl account in reference
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The Alias name of the Withdrawl account in reference
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * (Conditional) Provide this field if using Mode 2 and the payee account is in GBP.
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the Withdrawl account in reference
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
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
                             * 6011329
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
                             * 13152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 1000030037299999
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
                             * 10900006720
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
                     * The three letter code for the currency - either `EUR` or `GBP`.
                     */
                    code?: "EUR" | "GBP";
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
    namespace GetPayees {
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                    createdBy?: "CUSTOMER" | "LODGEMENT" | "DIRECT DEBIT" | "OPEN BANKING" | "FIRE OPEN PAYMENT" | "FIRE DIRECT";
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
                status?: "AWAITING_AUTHORISATION" | "AUTHORISED" | "AWAITING_MULTI_AUTHORISATION" | "NOT_AUTHORISED" | "PAID" | "REJECTED" | "ACCEPTED" | "RECEIVED";
                /**
                 * currency
                 * The currency.
                 */
                currency?: {
                    /**
                     * The three letter code for the currency - either `EUR` or `GBP`.
                     */
                    code?: "EUR" | "GBP";
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
                 * A public facing description of the request. This will be shown to the user when they tap or scan the request.
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
                     * 8303863544
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
    namespace GetTransactionsByIdv1 {
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
             * cardTransactionsv1
             */
            export interface $200 {
                /**
                 * The total number of card transactions in the list.
                 * example:
                 * 1
                 */
                total?: number;
                /**
                 * milisecond timestamp of date range to value.
                 * example:
                 * 1547744156603
                 */
                dateRangeTo?: number;
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                             * The ID number of the Withdrawl account in reference
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The Alias name of the Withdrawl account in reference
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * (Conditional) Provide this field if using Mode 2 and the payee account is in GBP.
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the Withdrawl account in reference
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
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
                             * 6011329
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
                             * 13152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 1000030037299999
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
                             * 10900006720
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
    namespace GetTransactionsByIdv3 {
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
             * cardTransactionsv3
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
                     * https://api.fire.com/business/v3/accounts/1/transactions?startAfter=eyJpY2F
                     * example:
                     * The URL of the linked page
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                             * The ID number of the Withdrawl account in reference
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The Alias name of the Withdrawl account in reference
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * (Conditional) Provide this field if using Mode 2 and the payee account is in GBP.
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the Withdrawl account in reference
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
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
                             * 6011329
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
                             * 13152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 1000030037299999
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
                             * 10900006720
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
    namespace GetTransactionsFilteredById {
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
        }
        namespace Responses {
            /**
             * cardTransactionsv1
             */
            export interface $200 {
                /**
                 * The total number of card transactions in the list.
                 * example:
                 * 1
                 */
                total?: number;
                /**
                 * milisecond timestamp of date range to value.
                 * example:
                 * 1547744156603
                 */
                dateRangeTo?: number;
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
                         * The three letter code for the currency - either `EUR` or `GBP`.
                         */
                        code?: "EUR" | "GBP";
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
                             * The ID number of the Withdrawl account in reference
                             * example:
                             * 123
                             */
                            id?: number; // int64
                            /**
                             * The Alias name of the Withdrawl account in reference
                             * example:
                             * Smyth and Co.
                             */
                            alias?: string;
                            /**
                             * (Conditional) Provide this field if using Mode 2 and the payee account is in GBP.
                             * example:
                             * 991199
                             */
                            nsc?: string;
                            /**
                             * The account number of the Withdrawl account in reference
                             * example:
                             * 00000000
                             */
                            accountNumber?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
                             * example:
                             * CPAYIE2D
                             */
                            bic?: string;
                            /**
                             * The BIC of the Withdrawl account in reference
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
                             * 6011329
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
                             * 13152429
                             */
                            merchIdDe42?: string;
                            /**
                             * example:
                             * ABC Coffee Shop
                             */
                            merchNameDe43?: string;
                            /**
                             * example:
                             * 1000030037299999
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
                             * 10900006720
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
                role?: "ADMIN" | "FULL_USER" | "READ_ONLY" | "CARD_ONLY";
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
                role?: "ADMIN" | "FULL_USER" | "READ_ONLY" | "CARD_ONLY";
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
             * A public facing description of the request. This will be shown to the user when they tap or scan the request.
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
                 * 8303863544
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
}

export interface OperationMethods {
  /**
   * authenticate - Authenticate with the API.
   * 
   * Access to the API is by Bearer Tokens. The process is somewhat similar to OAuth2.0, but with some changes to improve security.
   * 
   *   1. You must first log into the firework online application and create a new Application in the Profile > API page. (You will need your PIN digits and 2-Factor Authentication device).
   *   
   *   2. Give your application a Name and select the scope/permissions you need the application to have (more on Scopes below).
   *   
   *   3. You will be provided with three pieces of information - the App Refresh Token, Client ID and Client Key. You need to take note of the Client Key when it is displayed - it will not be shown again.
   *   
   *   
   *   You now use these pieces of data to retrieve a short-term Access Token which you can use to access the API. The Access Token expires within a relatively short time, so even if it is compromised, the attacker will not have long to use it. The Client Key is the most important piece of information to keep secret. This should only ever be stored on a backend server, and never in a front end client or mobile app.
   * 
   * 
   *   **If you ever accidentally reveal the Client Key (or accidentally commit it to Github for instance) it is vital that you log into firework online and delete/recreate the App Tokens as soon as possible. Anyone who has these three pieces of data can access the API to view your data and set up payments from your account (depending on the scope of the tokens).**
   *   
   *   
   *   Once you have the access token, pass it as a header for every call, like so:
   * 
   *   `Authorization: Bearer $ACCESS_TOKEN`
   * 
   *   Whenever it expires, create a new nonce and get a new access token again.
   * 
   */
  'authenticate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Authenticate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Authenticate.Responses.$200>
  /**
   * getAccounts - List all fire.com Accounts
   * 
   * Returns all your fire.com Accounts. Ordered by Alias ascending. Can be paginated.
   */
  'getAccounts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccounts.Responses.$200>
  /**
   * addAccount - Add a new account
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
   * getAccountById - Retrieve the details of a fire.com Account
   * 
   * You can retrieve the details of a fire.com Account by its `ican`.
   */
  'getAccountById'(
    parameters?: Parameters<Paths.GetAccountById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccountById.Responses.$200>
  /**
   * getTransactionsByIdv1 - List transactions for an account (v1)
   * 
   * Retrieve a list of transactions against an account. Recommended to use the v3 endpoint instead.
   */
  'getTransactionsByIdv1'(
    parameters?: Parameters<Paths.GetTransactionsByIdv1.PathParameters & Paths.GetTransactionsByIdv1.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsByIdv1.Responses.$200>
  /**
   * getTransactionsByIdv3 - List transactions for an account (v3)
   * 
   * Retrieve a list of transactions against an account. Initially, use the optional `limit`, `dateRangeFrom` and `dateRangeTo` query params to limit your query, then use the embedded `next` or `prev` links in the response to get newer or older pages.
   * 
   */
  'getTransactionsByIdv3'(
    parameters?: Parameters<Paths.GetTransactionsByIdv3.PathParameters & Paths.GetTransactionsByIdv3.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsByIdv3.Responses.$200>
  /**
   * getTransactionsFilteredById - Filtered list of transactions for an account (v1)
   * 
   * Retrieve a filtered list of transactions against an account. Recommended to use the v3 endpoint instead.
   * * `dateRangeFrom` - A millisecond epoch time specifying the date range start date.
   * * `dateRangeTo` - A millisecond epoch time specifying the date range end date.
   * * `searchKeyword` - Search term to filter by from the reference field (`myRef`).
   * * `transactionTypes` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
   * * `offset` - The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
   * 
   */
  'getTransactionsFilteredById'(
    parameters?: Parameters<Paths.GetTransactionsFilteredById.PathParameters & Paths.GetTransactionsFilteredById.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsFilteredById.Responses.$200>
  /**
   * getListofCards - View List of Cards.
   * 
   * Returns a list of cards related to your fire.com account.
   */
  'getListofCards'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListofCards.Responses.$200>
  /**
   * createNewCard - Create a new debit card.
   * 
   * You can create multiple debit cards which can be linked to your fire.com accounts.
   */
  'createNewCard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateNewCard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateNewCard.Responses.$200>
  /**
   * getListofCardTransactions - List Card Transactions.
   * 
   * Returns a list of cards transactions related to your fire.com card.
   */
  'getListofCardTransactions'(
    parameters?: Parameters<Paths.GetListofCardTransactions.PathParameters & Paths.GetListofCardTransactions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListofCardTransactions.Responses.$200>
  /**
   * blockCard - Block a card
   * 
   * Updates status of an existing card to block which prevents any transactions being carried out with that card.
   */
  'blockCard'(
    parameters?: Parameters<Paths.BlockCard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BlockCard.Responses.$204>
  /**
   * unblockCard - Unblock a card
   * 
   * Updates status of an existing card to unblock which means that transactions can be carried out with that card.
   */
  'unblockCard'(
    parameters?: Parameters<Paths.UnblockCard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnblockCard.Responses.$204>
  /**
   * newPaymentRequest - Create a Fire Open Payment request
   * 
   * Fire Open Payments is a feature of the fire.com business account that leverages Open Banking to allow your customers to pay you via bank transfer and to reconcile those payments as they are received into your fire.com GBP or EUR account.
   * 
   * To set up each Fire Open Payment you first need to create a payment request. This contains the details of the payment such as the amount, destination account, description as well as various other specific fields that you want to associate with the payment. The payment request is represented as a URL with a unique code which can then be incorporated into an eCommerce shopping cart as an alternative form of payment. For example, you can put “Pay by Bank” on your website along with “Pay by Card” and “Pay by PayPal”. It can also be distributed by a variety of means such as by email, SMS, WhatsApp, encoded as a QR code, NFC tag, etc.
   * 
   * Consumers confirm the payment details such as the amount are correct, select their bank and authorise the payment. Payments can be made from all major UK banks.
   * 
   * The funds are settled into your fire.com account, fully reconciled, with your specified fields provided.
   * 
   * There are two implementation options you can use to display payment pages with Fire Open Payments.
   * 1. **Hosted Payment Pages:** fire.com hosts the payment pages - this option allows you to re-direct your customer to the hosted fire.com payment pages displaying the payment details confirmation, bank selection, consent and response pages.
   * 2. **Integrated Payment Pages:** You host the payments page yourself - this option allows you to have control of the UI and UX for displaying the payment details confirmation, bank selection and response pages. Once the response is received, fire.com can re-direct the payer back to your website.
   * 
   * ## Hosted Payment Pages Option
   * ![Image](https://fire.com/docs/images/fop-hosted-flow.png)
   * 
   * The payer is brought through 5 stages to complete the payment:
   * 1. **View Payment Details page:** The payer must first be clear on the amount of the payment, who they are paying and the reason for the payment.
   * 2. **Select Bank / Account Provider page:** The payer then selects their bank. Again this step is offered as part of the fire.com payment UI.
   * 3. **Consent page:**  The payer must provide consent to the PISP (fire.com) prior to authorising the payment. This is a regulatory requirement, this page must be hosted by fire.com.
   * 4. **Authenticate and Authorise Payment:** The payer will be redirected to their bank’s online site or mobile banking app. After authenticating, the details of the payment will be displayed, and the payer will authorise the payment.
   * 5. **Response page:** It is a regulatory requirement that the PISP (fire.com) display the results of the payment and provide the same information that would be provided if the payer had made the payment via their banking application. fire.com must display this page, before optionally redirecting the payer back to your website.
   * 
   * To implement the hosted Fire Open Payments option you need to do the following:
   * 1. You can create a new Fire Open Payment request either within Firework Online or via the API.
   * 2. Create your new API application with the appropriate permissions required in Firework Online, as outlined in the “Authentication” steps. The permissions needed are:
   *     - “Create a Payment Request”
   *     - “Get Payment Details”
   * 
   * 3. Use the Refresh Token, Client ID and Client Key to create an access token as outlined in the “Authentication” steps.
   * 4. On your website, create a “Pay by Bank” button alongside your other available payment methods, such as Cards and PayPal.
   * 5. After the user clicks on “Pay by Bank”, you need to create a new Fire Open Payment request as outlined in the “Create a Fire Open Payment” steps. The Create a Fire Open Payment request endpoint returns a unique code for the payment request.
   * 6. Create a URL using the code returned in this format: `https://payments.fire.com/{code}` and redirect your customer to this page.
   * 7. fire.com will host all the pages that the customer needs to review and authorise the payment. fire.com will will return the paymentUUID of the successful or failed transaction to the returnUrl that you supplied when creating the Fire Open Payment request. fire.com can also optionally send a “webhook” to your website notifying you of the transaction’s outcome.
   * 8. Once fire.com responds with the paymentUUID and/or the webhook to your website, you need to call the “Get Payment Details” endpoint to get the details of the transaction. This will let you know whether the transaction was successful or not. You can set up the “Payment Request Payment Authorised” webhook to notify you once the payment is authorised or cancelled.
   * 9. The funds will be received into your GBP or EUR account. Funding will typically be within 6 business hours.
   * 
   * Once the code is returned the payment can be viewed and paid by going to the following URL: `https://payments.fire.com/{code}`
   * 
   * This request creates a new Fire Open Payment Payment. A code is returned that can be shared to your customers as a URL by any channel you wish.
   * You will need to enable the `PERM_BUSINESS_POST_PAYMENT_REQUEST` permission to use this endpoint.
   * 
   */
  'newPaymentRequest'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NewPaymentRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewPaymentRequest.Responses.$200>
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
   * getPaymentDetails - Get Payment Details
   * 
   * Returns the details of a specific payment.
   * 
   * As the customer goes through the process of making the payment the status of the payment will change.
   * 
   * * `AWAITING_AUTHORISATION` -This is the initial status of all your payments.
   * * `AUTHORISED` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank.
   * * `AWAITING_MULTI_AUTHORISATION` - Some business accounts such as charities require dual authorisation.
   * * `NOT_AUTHORISED` - Either your customer clicked on cancel or the payment was rejected by their ASPSP / bank.
   * * `PENDING` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank but the bank may want to carry out another check before funding the transaction.
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
   * getUsers - Returns list of all users on your fire.com account
   * 
   * You can retrieve the details of all fire.com users on your acount.
   */
  'getUsers'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUsers.Responses.$200>
  /**
   * getUser - Returns details of a specific fire.com user.
   * 
   * You can retrieve the details of a specific fire.com user
   */
  'getUser'(
    parameters?: Parameters<Paths.GetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUser.Responses.$200>
  /**
   * createApiApplication - Create a new API Application
   * 
   * Create a new API Application with specified permissions
   */
  'createApiApplication'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateApiApplication.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateApiApplication.Responses.$200>
  /**
   * getPayees - List all Payee Bank Accounts
   * 
   * Returns all your payee bank accounts. 
   * 
   * Ordered by payee name ascending. 
   * 
   * Can be paginated.
   * 
   */
  'getPayees'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPayees.Responses.$200>
  /**
   * getDirectDebitsForMandateUuid - Get all DD payments associated with a direct debit mandate
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
   * rejectDirectDebit - Reject a direct debit payment
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
   * getMandate - Get direct debit mandate details
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
   * updateMandateAlias - Update a direct debit mandate alias
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
   * getBatches - List batches
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
   * createBatchPayment - Create a new batch of payments
   * 
   * The fire.com API allows businesses to automate payments between their accounts or to third parties across the UK and Europe.
   * 
   * For added security, the API can only set up the payments in batches. These batches must be approved by an authorised user via the firework mobile app.
   * 
   * 
   * The process is as follows:
   * 
   * **1.**Create a new batch
   * 
   * **2.**Add payments to the batch
   * 
   * **3.**Submit the batch for approval
   * 
   * Once the batch is submitted, the authorised users will receive notifications to their firework mobile apps. They can review the contents of the batch and then approve or reject it. If approved, the batch is then processed. You can avail of enhanced security by using Dual Authorisation to verify payments if you wish. Dual Authorisation can be enabled by you when setting up your API application in firework online.
   * 
   * **Batch Life Cycle Events**
   * 
   * A batch webhook can be specified to receive details of all the payments as they are processed. This webhook receives notifications for every event in the batch lifecycle.
   * 
   * The following events are triggered during a batch:
   * 
   * **batch.opened:** Contains the details of the batch opened. Checks that the callback URL exists - unless a HTTP 200 response is returned, the callback URL will not be configured.
   * 
   * **batch.item-added:** Details of the item added to the batch
   * 
   * **batch.item-removed:** Details of the item removed from the batch
   * 
   * **batch.cancelled:** Notifies that the batch was cancelled.
   * 
   * **batch.submitted:** Notifes that the batch was submitted
   * 
   * **batch.approved:** Notifies that the batch was approved.
   * 
   * **batch.rejected:** Notifies that the batch was rejected.
   * 
   * **batch.failed:** Notifies that the batch failed - includes the details of the failure (insufficient funds etc)
   * 
   * **batch.completed:** Notifies that the batch completed successfully. Includes a summary.
   * 
   * Push notifications are sent to the firework mobile app for many of these events too - these can be configured from within the app.
   * 
   * This is the first step in creating a batch payment.
   * 
   */
  'createBatchPayment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateBatchPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateBatchPayment.Responses.$200>
  /**
   * getItemsBatchInternalTrasnfer - List items in a Batch
   * 
   * Returns a paginated list of items in the specified batch.
   */
  'getItemsBatchInternalTrasnfer'(
    parameters?: Parameters<Paths.GetItemsBatchInternalTrasnfer.PathParameters & Paths.GetItemsBatchInternalTrasnfer.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetItemsBatchInternalTrasnfer.Responses.$200>
  /**
   * addInternalTransferBatchPayment - Add an internal transfer payment to the batch
   * 
   * Simply specify the source account, destination account, amount and a reference.
   */
  'addInternalTransferBatchPayment'(
    parameters?: Parameters<Paths.AddInternalTransferBatchPayment.PathParameters> | null,
    data?: Paths.AddInternalTransferBatchPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddInternalTransferBatchPayment.Responses.$200>
  /**
   * getItemsBatchBankTransfer - List items in a Batch
   * 
   * Returns a paginated list of items in the specified batch.
   */
  'getItemsBatchBankTransfer'(
    parameters?: Parameters<Paths.GetItemsBatchBankTransfer.PathParameters & Paths.GetItemsBatchBankTransfer.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetItemsBatchBankTransfer.Responses.$200>
  /**
   * addBankTransferBatchPayment - Add a bank transfer payment to the batch.
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
   * deleteInternalTransferBatchPayment - Remove a Payment from the Batch (Internal Transfer)
   * 
   * Removes a Payment from the Batch (Internal Transfer). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
   */
  'deleteInternalTransferBatchPayment'(
    parameters?: Parameters<Paths.DeleteInternalTransferBatchPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteInternalTransferBatchPayment.Responses.$200>
  /**
   * deleteBankTransferBatchPayment - Remove a Payment from the Batch (Bank Transfers)
   * 
   * Removes a Payment from the Batch (Bank Transfers). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
   */
  'deleteBankTransferBatchPayment'(
    parameters?: Parameters<Paths.DeleteBankTransferBatchPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBankTransferBatchPayment.Responses.$200>
  /**
   * getDetailsSingleBatch - Get details of a single Batch
   * 
   * Returns the details of the batch specified in the API endpoint - {batchUuid}.
   */
  'getDetailsSingleBatch'(
    parameters?: Parameters<Paths.GetDetailsSingleBatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDetailsSingleBatch.Responses.$200>
  /**
   * submitBatch - Submit a batch for approval
   * 
   * Submits the Batch (for approval in the case of a **BANK_TRANSFER**). If this is an **INTERNAL_TRANSFER** batch, the transfers are immediately queued for processing. If this is a **BANK_TRANSFER** batch, this will trigger requests for approval to the firework mobile apps of authorised users. Once those users approve the batch, it is queued for processing.
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
   * getListofApproversForBatch - List Approvers for a Batch
   * 
   * Returns a list of approvers for this batch.
   */
  'getListofApproversForBatch'(
    parameters?: Parameters<Paths.GetListofApproversForBatch.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetListofApproversForBatch.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/apps/accesstokens']: {
    /**
     * authenticate - Authenticate with the API.
     * 
     * Access to the API is by Bearer Tokens. The process is somewhat similar to OAuth2.0, but with some changes to improve security.
     * 
     *   1. You must first log into the firework online application and create a new Application in the Profile > API page. (You will need your PIN digits and 2-Factor Authentication device).
     *   
     *   2. Give your application a Name and select the scope/permissions you need the application to have (more on Scopes below).
     *   
     *   3. You will be provided with three pieces of information - the App Refresh Token, Client ID and Client Key. You need to take note of the Client Key when it is displayed - it will not be shown again.
     *   
     *   
     *   You now use these pieces of data to retrieve a short-term Access Token which you can use to access the API. The Access Token expires within a relatively short time, so even if it is compromised, the attacker will not have long to use it. The Client Key is the most important piece of information to keep secret. This should only ever be stored on a backend server, and never in a front end client or mobile app.
     * 
     * 
     *   **If you ever accidentally reveal the Client Key (or accidentally commit it to Github for instance) it is vital that you log into firework online and delete/recreate the App Tokens as soon as possible. Anyone who has these three pieces of data can access the API to view your data and set up payments from your account (depending on the scope of the tokens).**
     *   
     *   
     *   Once you have the access token, pass it as a header for every call, like so:
     * 
     *   `Authorization: Bearer $ACCESS_TOKEN`
     * 
     *   Whenever it expires, create a new nonce and get a new access token again.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Authenticate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Authenticate.Responses.$200>
  }
  ['/v1/accounts']: {
    /**
     * getAccounts - List all fire.com Accounts
     * 
     * Returns all your fire.com Accounts. Ordered by Alias ascending. Can be paginated.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccounts.Responses.$200>
    /**
     * addAccount - Add a new account
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
  ['/v1/accounts/{ican}']: {
    /**
     * getAccountById - Retrieve the details of a fire.com Account
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
     * getTransactionsByIdv1 - List transactions for an account (v1)
     * 
     * Retrieve a list of transactions against an account. Recommended to use the v3 endpoint instead.
     */
    'get'(
      parameters?: Parameters<Paths.GetTransactionsByIdv1.PathParameters & Paths.GetTransactionsByIdv1.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsByIdv1.Responses.$200>
  }
  ['/v3/accounts/{ican}/transactions']: {
    /**
     * getTransactionsByIdv3 - List transactions for an account (v3)
     * 
     * Retrieve a list of transactions against an account. Initially, use the optional `limit`, `dateRangeFrom` and `dateRangeTo` query params to limit your query, then use the embedded `next` or `prev` links in the response to get newer or older pages.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTransactionsByIdv3.PathParameters & Paths.GetTransactionsByIdv3.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsByIdv3.Responses.$200>
  }
  ['/v1/accounts/{ican}/transactions/filter']: {
    /**
     * getTransactionsFilteredById - Filtered list of transactions for an account (v1)
     * 
     * Retrieve a filtered list of transactions against an account. Recommended to use the v3 endpoint instead.
     * * `dateRangeFrom` - A millisecond epoch time specifying the date range start date.
     * * `dateRangeTo` - A millisecond epoch time specifying the date range end date.
     * * `searchKeyword` - Search term to filter by from the reference field (`myRef`).
     * * `transactionTypes` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
     * * `offset` - The page offset. Defaults to 0. This is the record number that the returned list will start at. E.g. offset = 40 and limit = 20 will return records 40 to 59.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetTransactionsFilteredById.PathParameters & Paths.GetTransactionsFilteredById.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsFilteredById.Responses.$200>
  }
  ['/v1/cards']: {
    /**
     * getListofCards - View List of Cards.
     * 
     * Returns a list of cards related to your fire.com account.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListofCards.Responses.$200>
    /**
     * createNewCard - Create a new debit card.
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
     * getListofCardTransactions - List Card Transactions.
     * 
     * Returns a list of cards transactions related to your fire.com card.
     */
    'get'(
      parameters?: Parameters<Paths.GetListofCardTransactions.PathParameters & Paths.GetListofCardTransactions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListofCardTransactions.Responses.$200>
  }
  ['/v1/cards/{cardId}/block']: {
    /**
     * blockCard - Block a card
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
     * unblockCard - Unblock a card
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
     * newPaymentRequest - Create a Fire Open Payment request
     * 
     * Fire Open Payments is a feature of the fire.com business account that leverages Open Banking to allow your customers to pay you via bank transfer and to reconcile those payments as they are received into your fire.com GBP or EUR account.
     * 
     * To set up each Fire Open Payment you first need to create a payment request. This contains the details of the payment such as the amount, destination account, description as well as various other specific fields that you want to associate with the payment. The payment request is represented as a URL with a unique code which can then be incorporated into an eCommerce shopping cart as an alternative form of payment. For example, you can put “Pay by Bank” on your website along with “Pay by Card” and “Pay by PayPal”. It can also be distributed by a variety of means such as by email, SMS, WhatsApp, encoded as a QR code, NFC tag, etc.
     * 
     * Consumers confirm the payment details such as the amount are correct, select their bank and authorise the payment. Payments can be made from all major UK banks.
     * 
     * The funds are settled into your fire.com account, fully reconciled, with your specified fields provided.
     * 
     * There are two implementation options you can use to display payment pages with Fire Open Payments.
     * 1. **Hosted Payment Pages:** fire.com hosts the payment pages - this option allows you to re-direct your customer to the hosted fire.com payment pages displaying the payment details confirmation, bank selection, consent and response pages.
     * 2. **Integrated Payment Pages:** You host the payments page yourself - this option allows you to have control of the UI and UX for displaying the payment details confirmation, bank selection and response pages. Once the response is received, fire.com can re-direct the payer back to your website.
     * 
     * ## Hosted Payment Pages Option
     * ![Image](https://fire.com/docs/images/fop-hosted-flow.png)
     * 
     * The payer is brought through 5 stages to complete the payment:
     * 1. **View Payment Details page:** The payer must first be clear on the amount of the payment, who they are paying and the reason for the payment.
     * 2. **Select Bank / Account Provider page:** The payer then selects their bank. Again this step is offered as part of the fire.com payment UI.
     * 3. **Consent page:**  The payer must provide consent to the PISP (fire.com) prior to authorising the payment. This is a regulatory requirement, this page must be hosted by fire.com.
     * 4. **Authenticate and Authorise Payment:** The payer will be redirected to their bank’s online site or mobile banking app. After authenticating, the details of the payment will be displayed, and the payer will authorise the payment.
     * 5. **Response page:** It is a regulatory requirement that the PISP (fire.com) display the results of the payment and provide the same information that would be provided if the payer had made the payment via their banking application. fire.com must display this page, before optionally redirecting the payer back to your website.
     * 
     * To implement the hosted Fire Open Payments option you need to do the following:
     * 1. You can create a new Fire Open Payment request either within Firework Online or via the API.
     * 2. Create your new API application with the appropriate permissions required in Firework Online, as outlined in the “Authentication” steps. The permissions needed are:
     *     - “Create a Payment Request”
     *     - “Get Payment Details”
     * 
     * 3. Use the Refresh Token, Client ID and Client Key to create an access token as outlined in the “Authentication” steps.
     * 4. On your website, create a “Pay by Bank” button alongside your other available payment methods, such as Cards and PayPal.
     * 5. After the user clicks on “Pay by Bank”, you need to create a new Fire Open Payment request as outlined in the “Create a Fire Open Payment” steps. The Create a Fire Open Payment request endpoint returns a unique code for the payment request.
     * 6. Create a URL using the code returned in this format: `https://payments.fire.com/{code}` and redirect your customer to this page.
     * 7. fire.com will host all the pages that the customer needs to review and authorise the payment. fire.com will will return the paymentUUID of the successful or failed transaction to the returnUrl that you supplied when creating the Fire Open Payment request. fire.com can also optionally send a “webhook” to your website notifying you of the transaction’s outcome.
     * 8. Once fire.com responds with the paymentUUID and/or the webhook to your website, you need to call the “Get Payment Details” endpoint to get the details of the transaction. This will let you know whether the transaction was successful or not. You can set up the “Payment Request Payment Authorised” webhook to notify you once the payment is authorised or cancelled.
     * 9. The funds will be received into your GBP or EUR account. Funding will typically be within 6 business hours.
     * 
     * Once the code is returned the payment can be viewed and paid by going to the following URL: `https://payments.fire.com/{code}`
     * 
     * This request creates a new Fire Open Payment Payment. A code is returned that can be shared to your customers as a URL by any channel you wish.
     * You will need to enable the `PERM_BUSINESS_POST_PAYMENT_REQUEST` permission to use this endpoint.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NewPaymentRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewPaymentRequest.Responses.$200>
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
  ['/v1/payments/{paymentUuid}']: {
    /**
     * getPaymentDetails - Get Payment Details
     * 
     * Returns the details of a specific payment.
     * 
     * As the customer goes through the process of making the payment the status of the payment will change.
     * 
     * * `AWAITING_AUTHORISATION` -This is the initial status of all your payments.
     * * `AUTHORISED` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank.
     * * `AWAITING_MULTI_AUTHORISATION` - Some business accounts such as charities require dual authorisation.
     * * `NOT_AUTHORISED` - Either your customer clicked on cancel or the payment was rejected by their ASPSP / bank.
     * * `PENDING` - This is the status that your payment is set to after the customer has authorised the payment with their ASPSP / bank but the bank may want to carry out another check before funding the transaction.
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
  ['/v1/users']: {
    /**
     * getUsers - Returns list of all users on your fire.com account
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
     * getUser - Returns details of a specific fire.com user.
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
     * createApiApplication - Create a new API Application
     * 
     * Create a new API Application with specified permissions
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateApiApplication.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateApiApplication.Responses.$200>
  }
  ['/v1/payees']: {
    /**
     * getPayees - List all Payee Bank Accounts
     * 
     * Returns all your payee bank accounts. 
     * 
     * Ordered by payee name ascending. 
     * 
     * Can be paginated.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPayees.Responses.$200>
  }
  ['/v1/directdebits']: {
    /**
     * getDirectDebitsForMandateUuid - Get all DD payments associated with a direct debit mandate
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
     * rejectDirectDebit - Reject a direct debit payment
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
     * getMandate - Get direct debit mandate details
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
     * updateMandateAlias - Update a direct debit mandate alias
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
     * createBatchPayment - Create a new batch of payments
     * 
     * The fire.com API allows businesses to automate payments between their accounts or to third parties across the UK and Europe.
     * 
     * For added security, the API can only set up the payments in batches. These batches must be approved by an authorised user via the firework mobile app.
     * 
     * 
     * The process is as follows:
     * 
     * **1.**Create a new batch
     * 
     * **2.**Add payments to the batch
     * 
     * **3.**Submit the batch for approval
     * 
     * Once the batch is submitted, the authorised users will receive notifications to their firework mobile apps. They can review the contents of the batch and then approve or reject it. If approved, the batch is then processed. You can avail of enhanced security by using Dual Authorisation to verify payments if you wish. Dual Authorisation can be enabled by you when setting up your API application in firework online.
     * 
     * **Batch Life Cycle Events**
     * 
     * A batch webhook can be specified to receive details of all the payments as they are processed. This webhook receives notifications for every event in the batch lifecycle.
     * 
     * The following events are triggered during a batch:
     * 
     * **batch.opened:** Contains the details of the batch opened. Checks that the callback URL exists - unless a HTTP 200 response is returned, the callback URL will not be configured.
     * 
     * **batch.item-added:** Details of the item added to the batch
     * 
     * **batch.item-removed:** Details of the item removed from the batch
     * 
     * **batch.cancelled:** Notifies that the batch was cancelled.
     * 
     * **batch.submitted:** Notifes that the batch was submitted
     * 
     * **batch.approved:** Notifies that the batch was approved.
     * 
     * **batch.rejected:** Notifies that the batch was rejected.
     * 
     * **batch.failed:** Notifies that the batch failed - includes the details of the failure (insufficient funds etc)
     * 
     * **batch.completed:** Notifies that the batch completed successfully. Includes a summary.
     * 
     * Push notifications are sent to the firework mobile app for many of these events too - these can be configured from within the app.
     * 
     * This is the first step in creating a batch payment.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateBatchPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateBatchPayment.Responses.$200>
    /**
     * getBatches - List batches
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
     * addInternalTransferBatchPayment - Add an internal transfer payment to the batch
     * 
     * Simply specify the source account, destination account, amount and a reference.
     */
    'post'(
      parameters?: Parameters<Paths.AddInternalTransferBatchPayment.PathParameters> | null,
      data?: Paths.AddInternalTransferBatchPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddInternalTransferBatchPayment.Responses.$200>
    /**
     * getItemsBatchInternalTrasnfer - List items in a Batch
     * 
     * Returns a paginated list of items in the specified batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetItemsBatchInternalTrasnfer.PathParameters & Paths.GetItemsBatchInternalTrasnfer.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetItemsBatchInternalTrasnfer.Responses.$200>
  }
  ['/v1/batches/{batchUuid}/banktransfers']: {
    /**
     * addBankTransferBatchPayment - Add a bank transfer payment to the batch.
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
     * getItemsBatchBankTransfer - List items in a Batch
     * 
     * Returns a paginated list of items in the specified batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetItemsBatchBankTransfer.PathParameters & Paths.GetItemsBatchBankTransfer.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetItemsBatchBankTransfer.Responses.$200>
  }
  ['/v1/batches/{batchUuid}/internaltransfers/{itemUuid}']: {
    /**
     * deleteInternalTransferBatchPayment - Remove a Payment from the Batch (Internal Transfer)
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
     * deleteBankTransferBatchPayment - Remove a Payment from the Batch (Bank Transfers)
     * 
     * Removes a Payment from the Batch (Bank Transfers). You can only remove payments before the batch is submitted for approval (while it is in the OPEN state).
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteBankTransferBatchPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBankTransferBatchPayment.Responses.$200>
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
     * getDetailsSingleBatch - Get details of a single Batch
     * 
     * Returns the details of the batch specified in the API endpoint - {batchUuid}.
     */
    'get'(
      parameters?: Parameters<Paths.GetDetailsSingleBatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDetailsSingleBatch.Responses.$200>
    /**
     * submitBatch - Submit a batch for approval
     * 
     * Submits the Batch (for approval in the case of a **BANK_TRANSFER**). If this is an **INTERNAL_TRANSFER** batch, the transfers are immediately queued for processing. If this is a **BANK_TRANSFER** batch, this will trigger requests for approval to the firework mobile apps of authorised users. Once those users approve the batch, it is queued for processing.
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
     * getListofApproversForBatch - List Approvers for a Batch
     * 
     * Returns a list of approvers for this batch.
     */
    'get'(
      parameters?: Parameters<Paths.GetListofApproversForBatch.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetListofApproversForBatch.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
