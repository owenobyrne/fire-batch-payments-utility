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
        export type OffsetParam = number; // int64
        export type OrderByParam = "DATE";
        export type OrderParam = "ASC" | "DESC";
    }
    export interface QueryParameters {
        orderParam?: Parameters.OrderParam;
        orderByParam?: Parameters.OrderByParam;
        limitParam?: Parameters.LimitParam;
        offsetParam?: Parameters.OffsetParam /* int64 */;
    }
    namespace Responses {
        export interface UnauthorisedError {
            errors?: {
                /**
                 * Error Code
                 * example:
                 * 50051
                 */
                code?: number; // int64
                /**
                 * The error message
                 * example:
                 * Sorry, we are unable to proceed with your request.
                 */
                message?: string;
            }[];
        }
    }
    namespace Schemas {
        export interface APIError {
            /**
             * Error Code
             * example:
             * 50051
             */
            code?: number; // int64
            /**
             * The error message
             * example:
             * Sorry, we are unable to proceed with your request.
             */
            message?: string;
        }
        export interface APIErrors {
            errors?: {
                /**
                 * Error Code
                 * example:
                 * 50051
                 */
                code?: number; // int64
                /**
                 * The error message
                 * example:
                 * Sorry, we are unable to proceed with your request.
                 */
                message?: string;
            }[];
        }
        export interface AccessToken {
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
            status?: "LIVE" | "MIGRATED";
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
        }
        export interface ApiApplication {
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
        export interface Aspsp {
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
        }
        export interface AuthenticationData {
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
             * The SHA256 hash of the nonce above and the app’s Client Key. The Client Key will only be shown to you when you create the app, so don’t forget to save it somewhere safe.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            clientSecret?: string;
        }
        export interface BankPayRefundRequest {
            /**
             * Must correspond to the currency of the original payment
             */
            currency?: "EUR" | "GBP";
            /**
             * The amount to refund. Must be within a certain percentage of the original payment.
             * example:
             * 1000
             */
            amount?: number; // int64
            /**
             * An internal description of the refund request.
             * example:
             * Fees Refunded
             */
            myRef?: string;
            /**
             * A public facing description of the refund request.
             * example:
             * Gym Fees Refunded Oct 2020
             */
            description?: string;
            orderDetails?: {
                /**
                 * Your Merchant Number (if applicable).
                 * example:
                 * 1234567
                 */
                merchantNumber?: string;
            };
            /**
             * A reason for the refund.
             * example:
             * Gym Closed for repairs.
             */
            reason?: string;
        }
        export interface BankPayRefundResponse {
            /**
             * Status of the refund request.
             */
            status?: "REQUEST_ACCEPTED" | "REQUEST_REJECTED" | "REJECTED" | "RECEIVED";
            /**
             * The unique id for the refund request
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            refundRequestUuid?: string;
            /**
             * The unique id for the original payment.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            paymentUuid?: string;
        }
        export interface Card {
            cardId?: number; // int64
            provider?: string;
            alias?: string;
            maskedPan?: string;
            embossCardName?: string;
            embossBusinessName?: string;
            expiryDate?: string; // date-time
        }
        export interface Country {
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
        }
        export interface Currency {
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
        }
        export interface FxTradeDetails {
            buyCurrency?: string;
            sellCurrency?: string;
            fixedSide?: string;
            buyAmount?: number; // int64
            sellAmount?: number; // int64
            rate4d?: number; // int64
        }
        export interface MobileApplicationDetails {
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
        }
        export interface NewAccount {
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
        export interface NewApiApplication {
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
        export interface NewPaymentRequest {
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
        export interface OrderDetails {
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
        }
        export interface PayeeBankAccount {
            /**
             * Identifier for the fire.com payee bank account (assigned by fire.com).
             * example:
             * 742
             */
            id?: number; // int64
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
             */
            nsc?: string;
            /**
             * The Account Number of the account if currency is GBP.
             * example:
             */
            accountNumber?: string;
            /**
             * The creation source of the payee.
             * example:
             * CUSTOMER
             */
            createdBy?: "CUSTOMER" | "LODGEMENT" | "DIRECT DEBIT" | "OPEN BANKING" | "FIRE OPEN PAYMENT" | "FIRE DIRECT";
            /**
             * The date the payee was created. Milliseconds since the epoch (1970).
             * example:
             * 2019-08-22T07:48:56.460Z
             */
            dateCreated?: string; // date-time
        }
        export interface PaymentRequest {
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
        export interface PaymentRequestDetails {
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
            currency: {
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
        export interface PaymentRequestPayment {
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
             * The merchant return URL where the customer will be re-directed to with the result of the transaction.
             * example:
             * https://example.com/callback
             */
            returnUrl?: string;
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
            to?: {
                /**
                 * the type of destination account.
                 * example:
                 * FIRE_ACCOUNT
                 */
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
        export interface PaymentRequestResponse {
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
        export type RelatedParty = {
            /**
             * the type of destination account.
             * example:
             * FIRE_ACCOUNT
             */
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
                alias?: string;
                nsc?: string;
                accountNumber?: string;
                bic?: string;
                iban?: string;
            };
        } | {
            type?: "WITHDRAWAL_ACCOUNT";
            account?: {
                id?: number; // int64
                alias?: string;
                nsc?: string;
                accountNumber?: string;
                bic?: string;
                iban?: string;
            };
        } | {
            type?: "CARD_MERCHANT" | "CARD_ATM";
            cardMerchant?: {
                /**
                 * example:
                 * 06011319
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
                 * -90000
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
                 * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                 * 9000000
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
                 * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                 * 018R610500001710418C
                 */
                additionalDataDe48?: string;
                /**
                 * example:
                 * N
                 */
                authorisedByGps?: string;
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
        export interface RelatedPartyCardPayment {
            type?: "CARD_MERCHANT" | "CARD_ATM";
            cardMerchant?: {
                /**
                 * example:
                 * 06011319
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
                 * -90000
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
                 * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                 * 9000000
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
                 * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                 * 018R610500001710418C
                 */
                additionalDataDe48?: string;
                /**
                 * example:
                 * N
                 */
                authorisedByGps?: string;
                avsResult?: string;
                /**
                 * example:
                 * 0100
                 */
                mtId?: string;
                recordDataDe120?: string;
                additionalDataDe124?: string;
            };
        }
        export interface RelatedPartyExternalAccount {
            type?: "EXTERNAL_ACCOUNT";
            account?: {
                id?: number; // int64
                alias?: string;
                nsc?: string;
                accountNumber?: string;
                bic?: string;
                iban?: string;
            };
        }
        export interface RelatedPartyFireAccount {
            /**
             * the type of destination account.
             * example:
             * FIRE_ACCOUNT
             */
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
        }
        export interface RelatedPartyPayee {
            type?: "WITHDRAWAL_ACCOUNT";
            account?: {
                id?: number; // int64
                alias?: string;
                nsc?: string;
                accountNumber?: string;
                bic?: string;
                iban?: string;
            };
        }
        export type To = {
            /**
             * the type of destination account.
             * example:
             * FIRE_ACCOUNT
             */
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
        export interface Transaction {
            txnId?: number; // int64
            refId?: number; // int64
            ican?: number; // int64
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
            amountBeforeCharges?: number; // int64
            feeAmount?: number; // int64
            taxAmount?: number; // int64
            amountAfterCharges?: number; // int64
            balance?: number; // int64
            myRef?: string;
            paymentRequestPublicCode?: string;
            date?: string; // date-time
            card?: {
                cardId?: number; // int64
                provider?: string;
                alias?: string;
                maskedPan?: string;
                embossCardName?: string;
                embossBusinessName?: string;
                expiryDate?: string; // date-time
            };
            type?: string;
            dateAcknowledged?: string; // date-time
            fxTradeDetails?: {
                buyCurrency?: string;
                sellCurrency?: string;
                fixedSide?: string;
                buyAmount?: number; // int64
                sellAmount?: number; // int64
                rate4d?: number; // int64
            };
            relatedParty?: {
                /**
                 * the type of destination account.
                 * example:
                 * FIRE_ACCOUNT
                 */
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
                    alias?: string;
                    nsc?: string;
                    accountNumber?: string;
                    bic?: string;
                    iban?: string;
                };
            } | {
                type?: "WITHDRAWAL_ACCOUNT";
                account?: {
                    id?: number; // int64
                    alias?: string;
                    nsc?: string;
                    accountNumber?: string;
                    bic?: string;
                    iban?: string;
                };
            } | {
                type?: "CARD_MERCHANT" | "CARD_ATM";
                cardMerchant?: {
                    /**
                     * example:
                     * 06011319
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
                     * -90000
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
                     * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                     * 9000000
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
                     * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                     * 018R610500001710418C
                     */
                    additionalDataDe48?: string;
                    /**
                     * example:
                     * N
                     */
                    authorisedByGps?: string;
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
        }
        export interface User {
            /**
             * The User ID for this User
             * example:
             * 14059
             */
            Id?: number; // int64
            /**
             * email address for user
             * example:
             * colmreid@gmail.com
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
             * Reid
             */
            lastName?: string;
            /**
             * User mobile number
             * example:
             * +353830386344
             */
            mobileNumber?: number; // int64
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
declare namespace Paths {
    namespace AddAccount {
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
                status?: "LIVE" | "MIGRATED";
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
            }
        }
    }
    namespace Authenticate {
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
             * The SHA256 hash of the nonce above and the app’s Client Key. The Client Key will only be shown to you when you create the app, so don’t forget to save it somewhere safe.
             * example:
             * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
             */
            clientSecret?: string;
        }
        namespace Responses {
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
    namespace BankPayRefundRequest {
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
        export interface RequestBody {
            /**
             * Must correspond to the currency of the original payment
             */
            currency?: "EUR" | "GBP";
            /**
             * The amount to refund. Must be within a certain percentage of the original payment.
             * example:
             * 1000
             */
            amount?: number; // int64
            /**
             * An internal description of the refund request.
             * example:
             * Fees Refunded
             */
            myRef?: string;
            /**
             * A public facing description of the refund request.
             * example:
             * Gym Fees Refunded Oct 2020
             */
            description?: string;
            orderDetails?: {
                /**
                 * Your Merchant Number (if applicable).
                 * example:
                 * 1234567
                 */
                merchantNumber?: string;
            };
            /**
             * A reason for the refund.
             * example:
             * Gym Closed for repairs.
             */
            reason?: string;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Status of the refund request.
                 */
                status?: "REQUEST_ACCEPTED" | "REQUEST_REJECTED" | "REJECTED" | "RECEIVED";
                /**
                 * The unique id for the refund request
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                refundRequestUuid?: string;
                /**
                 * The unique id for the original payment.
                 * example:
                 * 4ADFB67A-0F5B-4A9A-9D74-34437250045C
                 */
                paymentUuid?: string;
            }
            export interface $405 {
                errors?: {
                    /**
                     * Error Code
                     * example:
                     * 50051
                     */
                    code?: number; // int64
                    /**
                     * The error message
                     * example:
                     * Sorry, we are unable to proceed with your request.
                     */
                    message?: string;
                }[];
            }
        }
    }
    namespace CreateApiApplication {
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
                status?: "LIVE" | "MIGRATED";
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
            }
            export interface $401 {
                errors?: {
                    /**
                     * Error Code
                     * example:
                     * 50051
                     */
                    code?: number; // int64
                    /**
                     * The error message
                     * example:
                     * Sorry, we are unable to proceed with your request.
                     */
                    message?: string;
                }[];
            }
        }
    }
    namespace GetAccounts {
        namespace Responses {
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
                    status?: "LIVE" | "MIGRATED";
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
                }[];
            }
            export interface $401 {
                errors?: {
                    /**
                     * Error Code
                     * example:
                     * 50051
                     */
                    code?: number; // int64
                    /**
                     * The error message
                     * example:
                     * Sorry, we are unable to proceed with your request.
                     */
                    message?: string;
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
    namespace GetPayees {
        namespace Responses {
            export interface $200 {
                /**
                 * Identifier for the fire.com payee bank account (assigned by fire.com).
                 * example:
                 * 742
                 */
                id?: number; // int64
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
                 */
                nsc?: string;
                /**
                 * The Account Number of the account if currency is GBP.
                 * example:
                 */
                accountNumber?: string;
                /**
                 * The creation source of the payee.
                 * example:
                 * CUSTOMER
                 */
                createdBy?: "CUSTOMER" | "LODGEMENT" | "DIRECT DEBIT" | "OPEN BANKING" | "FIRE OPEN PAYMENT" | "FIRE DIRECT";
                /**
                 * The date the payee was created. Milliseconds since the epoch (1970).
                 * example:
                 * 2019-08-22T07:48:56.460Z
                 */
                dateCreated?: string; // date-time
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
                 * The merchant return URL where the customer will be re-directed to with the result of the transaction.
                 * example:
                 * https://example.com/callback
                 */
                returnUrl?: string;
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
                to?: {
                    /**
                     * the type of destination account.
                     * example:
                     * FIRE_ACCOUNT
                     */
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
    namespace GetTransactionsById {
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
                status?: "LIVE" | "MIGRATED";
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
            export type Limit = number;
            export type Offset = number; // int64
            /**
             * Search term to filter by from the reference field (`myRef`).
             */
            export type SearchKeyword = string; // varchar
            /**
             * One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
             */
            export type TransactionTypes = string; // varchar
        }
        export interface PathParameters {
            ican: /* The ican of the account to retrieve */ Parameters.Ican /* int64 */;
        }
        export interface QueryParameters {
            offset?: Parameters.Offset /* int64 */;
            limit?: Parameters.Limit;
            dateRangeFrom?: /* A millisecond epoch time specifying the date range start date. */ Parameters.DateRangeFrom /* int64 */;
            dateRangeTo?: /* A millisecond epoch time specifying the date range end date. */ Parameters.DateRangeTo /* int64 */;
            searchKeyword?: /* Search term to filter by from the reference field (`myRef`). */ Parameters.SearchKeyword /* varchar */;
            transactionTypes?: /* One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types. */ Parameters.TransactionTypes /* varchar */;
        }
        namespace Responses {
            export interface $200 {
                total?: number; // int64
                dateRangeTo?: number; // int64
                transactions?: {
                    txnId?: number; // int64
                    refId?: number; // int64
                    ican?: number; // int64
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
                    amountBeforeCharges?: number; // int64
                    feeAmount?: number; // int64
                    taxAmount?: number; // int64
                    amountAfterCharges?: number; // int64
                    balance?: number; // int64
                    myRef?: string;
                    paymentRequestPublicCode?: string;
                    date?: string; // date-time
                    card?: {
                        cardId?: number; // int64
                        provider?: string;
                        alias?: string;
                        maskedPan?: string;
                        embossCardName?: string;
                        embossBusinessName?: string;
                        expiryDate?: string; // date-time
                    };
                    type?: string;
                    dateAcknowledged?: string; // date-time
                    fxTradeDetails?: {
                        buyCurrency?: string;
                        sellCurrency?: string;
                        fixedSide?: string;
                        buyAmount?: number; // int64
                        sellAmount?: number; // int64
                        rate4d?: number; // int64
                    };
                    relatedParty?: {
                        /**
                         * the type of destination account.
                         * example:
                         * FIRE_ACCOUNT
                         */
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
                            alias?: string;
                            nsc?: string;
                            accountNumber?: string;
                            bic?: string;
                            iban?: string;
                        };
                    } | {
                        type?: "WITHDRAWAL_ACCOUNT";
                        account?: {
                            id?: number; // int64
                            alias?: string;
                            nsc?: string;
                            accountNumber?: string;
                            bic?: string;
                            iban?: string;
                        };
                    } | {
                        type?: "CARD_MERCHANT" | "CARD_ATM";
                        cardMerchant?: {
                            /**
                             * example:
                             * 06011319
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
                             * -90000
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
                             * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                             * 9000000
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
                             * KILLARNEY TYRE CENTRE  V93Y6NH       IRL
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
                             * 018R610500001710418C
                             */
                            additionalDataDe48?: string;
                            /**
                             * example:
                             * N
                             */
                            authorisedByGps?: string;
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
                }[];
            }
        }
    }
    namespace GetUser {
        namespace Parameters {
            /**
             * Lists a specific User
             * example:
             * 14059, colmreid@gmail.com, Colm, Reid, 353830386344, ADMIN, LIVE, 2021-02-23T10:36:59.090Z, FULL, 14059, 18967, EBB10F29-A653-4DBA-9C8C-BA79F72F78B0, LIVE, iPhone - iPhone, IOS, 14.4
             */
            export type User = string;
        }
        export interface PathParameters {
            user: /**
             * Lists a specific User
             * example:
             * 14059, colmreid@gmail.com, Colm, Reid, 353830386344, ADMIN, LIVE, 2021-02-23T10:36:59.090Z, FULL, 14059, 18967, EBB10F29-A653-4DBA-9C8C-BA79F72F78B0, LIVE, iPhone - iPhone, IOS, 14.4
             */
            Parameters.User;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * The User ID for this User
                 * example:
                 * 14059
                 */
                Id?: number; // int64
                /**
                 * email address for user
                 * example:
                 * colmreid@gmail.com
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
                 * Reid
                 */
                lastName?: string;
                /**
                 * User mobile number
                 * example:
                 * +353830386344
                 */
                mobileNumber?: number; // int64
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
        namespace Parameters {
            /**
             * Info on users
             * example:
             * 14059, colmreid@gmail.com, Colm, Reid, 353830386344, ADMIN, LIVE, 2021-02-23T10:36:59.090Z, FULL, 14059, 18967, EBB10F29-A653-4DBA-9C8C-BA79F72F78B0, LIVE, iPhone - iPhone, IOS, 14.4
             */
            export type Users = string;
        }
        export interface PathParameters {
            users: /**
             * Info on users
             * example:
             * 14059, colmreid@gmail.com, Colm, Reid, 353830386344, ADMIN, LIVE, 2021-02-23T10:36:59.090Z, FULL, 14059, 18967, EBB10F29-A653-4DBA-9C8C-BA79F72F78B0, LIVE, iPhone - iPhone, IOS, 14.4
             */
            Parameters.Users;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * The User ID for this User
                 * example:
                 * 14059
                 */
                Id?: number; // int64
                /**
                 * email address for user
                 * example:
                 * colmreid@gmail.com
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
                 * Reid
                 */
                lastName?: string;
                /**
                 * User mobile number
                 * example:
                 * +353830386344
                 */
                mobileNumber?: number; // int64
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
    namespace NewPaymentRequest {
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
        namespace Responses {
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
}

export interface OperationMethods {
  /**
   * authenticate - Authenticate with the API.
   * 
   * TODO - Authenticate with the API.
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
    parameters: Parameters<Paths.GetAccountById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAccountById.Responses.$200>
  /**
   * getTransactionsById - List transactions for an account
   * 
   * Retrieve a list of transactions against an account.
   */
  'getTransactionsById'(
    parameters: Parameters<Paths.GetTransactionsById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsById.Responses.$200>
  /**
   * getTransactionsFilteredById - Filtered list of transactions for an account
   * 
   * Retrieve a filtered list of transactions against an account.
   * * `dateRangeFrom` - A millisecond epoch time specifying the date range start date.
   * * `dateRangeTo` - A millisecond epoch time specifying the date range end date.
   * * `searchKeyword` - Search term to filter by from the reference field (`myRef`).
   * * `transactionTypes` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
   * 
   */
  'getTransactionsFilteredById'(
    parameters: Parameters<Paths.GetTransactionsFilteredById.QueryParameters & Paths.GetTransactionsFilteredById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTransactionsFilteredById.Responses.$200>
  /**
   * newPaymentRequest - Create a Fire Open Payment request
   * 
   * Creates a new Fire Open Payment Payment request. A code is returned that can be shared to your customers as a URL by any channel you wish.
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
   * bankPayRefundRequest - Request a Refund for a Payment Request Payment
   * 
   * Process a request to refund a payment. The original payment must be in the `PAID` state.
   */
  'bankPayRefundRequest'(
    parameters: Parameters<Paths.BankPayRefundRequest.PathParameters>,
    data?: Paths.BankPayRefundRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BankPayRefundRequest.Responses.$200>
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
   * * `PAID` - Funds were received into your fire.com GBP or EUR account from your customer’s ASPSP / bank.
   * 
   * You will need to enable the `PERM_BUSINESS_GET_PAYMENT` permission to use this endpoint.
   * 
   */
  'getPaymentDetails'(
    parameters: Parameters<Paths.GetPaymentDetails.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPaymentDetails.Responses.$200>
  /**
   * getUsers - Returns list of all users on your fire.com account
   * 
   * You can retrieve the details of all fire.com users on your acount.
   */
  'getUsers'(
    parameters: Parameters<Paths.GetUsers.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUsers.Responses.$200>
  /**
   * getUser - Returns details of a specific fire.com user.
   * 
   * You can retrieve the details of a specific fire.com user
   */
  'getUser'(
    parameters: Parameters<Paths.GetUser.PathParameters>,
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
   * Ordered by date added descending. 
   * 
   * Can be paginated.
   * 
   */
  'getPayees'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPayees.Responses.$200>
}

export interface PathsDictionary {
  ['/apps/accesstokens']: {
    /**
     * authenticate - Authenticate with the API.
     * 
     * TODO - Authenticate with the API.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Authenticate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Authenticate.Responses.$200>
  }
  ['/accounts']: {
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
  ['/accounts/{ican}']: {
    /**
     * getAccountById - Retrieve the details of a fire.com Account
     * 
     * You can retrieve the details of a fire.com Account by its `ican`.
     */
    'get'(
      parameters: Parameters<Paths.GetAccountById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAccountById.Responses.$200>
  }
  ['/accounts/{ican}/transactions']: {
    /**
     * getTransactionsById - List transactions for an account
     * 
     * Retrieve a list of transactions against an account.
     */
    'get'(
      parameters: Parameters<Paths.GetTransactionsById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsById.Responses.$200>
  }
  ['/accounts/{ican}/transactions/filter']: {
    /**
     * getTransactionsFilteredById - Filtered list of transactions for an account
     * 
     * Retrieve a filtered list of transactions against an account.
     * * `dateRangeFrom` - A millisecond epoch time specifying the date range start date.
     * * `dateRangeTo` - A millisecond epoch time specifying the date range end date.
     * * `searchKeyword` - Search term to filter by from the reference field (`myRef`).
     * * `transactionTypes` - One or more of the transaction types above. This field can be repeated multiple times to allow for multiple transaction types.
     * 
     */
    'get'(
      parameters: Parameters<Paths.GetTransactionsFilteredById.QueryParameters & Paths.GetTransactionsFilteredById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTransactionsFilteredById.Responses.$200>
  }
  ['/paymentrequests']: {
    /**
     * newPaymentRequest - Create a Fire Open Payment request
     * 
     * Creates a new Fire Open Payment Payment request. A code is returned that can be shared to your customers as a URL by any channel you wish.
     * You will need to enable the `PERM_BUSINESS_POST_PAYMENT_REQUEST` permission to use this endpoint.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NewPaymentRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewPaymentRequest.Responses.$200>
  }
  ['/aspsps']: {
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
  ['/payments/{paymentUuid}/bankpayrefund']: {
    /**
     * bankPayRefundRequest - Request a Refund for a Payment Request Payment
     * 
     * Process a request to refund a payment. The original payment must be in the `PAID` state.
     */
    'post'(
      parameters: Parameters<Paths.BankPayRefundRequest.PathParameters>,
      data?: Paths.BankPayRefundRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BankPayRefundRequest.Responses.$200>
  }
  ['/payments/{paymentUuid}']: {
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
     * * `PAID` - Funds were received into your fire.com GBP or EUR account from your customer’s ASPSP / bank.
     * 
     * You will need to enable the `PERM_BUSINESS_GET_PAYMENT` permission to use this endpoint.
     * 
     */
    'get'(
      parameters: Parameters<Paths.GetPaymentDetails.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPaymentDetails.Responses.$200>
  }
  ['/users']: {
    /**
     * getUsers - Returns list of all users on your fire.com account
     * 
     * You can retrieve the details of all fire.com users on your acount.
     */
    'get'(
      parameters: Parameters<Paths.GetUsers.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUsers.Responses.$200>
  }
  ['/user/{userId}']: {
    /**
     * getUser - Returns details of a specific fire.com user.
     * 
     * You can retrieve the details of a specific fire.com user
     */
    'get'(
      parameters: Parameters<Paths.GetUser.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUser.Responses.$200>
  }
  ['/apps']: {
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
  ['/payees']: {
    /**
     * getPayees - List all Payee Bank Accounts
     * 
     * Returns all your payee bank accounts. 
     * 
     * Ordered by date added descending. 
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
