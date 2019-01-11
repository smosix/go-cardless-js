import { GoCardlessBankAccountApi } from "./GoCardlessBankAccountApi";
import { GoCardlessCustomerApi } from "./GoCardlessCustomerApi";
import { GoCardlessMandateApi } from "./GoCardlessMandateApi";
import { GoCardlessPaymentApi } from "./GoCardlessPaymentApi";
import { GoCardlessPayoutApi } from "./GoCardlessPayoutApi";
import { GoCardlessPlanApi } from "./GoCardlessPlanApi";
export declare type GoCardlessResponse = string | undefined;
export declare const goCardlessTestUrl = "https://api-sandbox.gocardless.com/";
export declare const goCardlessLiveUrl = "https://api.gocardless.com";
export declare type IGoCardlessHeaders = {
    environment: "sandbox" | "live";
    "Content-Type": "application/json";
    Accept: "application/json";
    "GoCardless-Version": "2015-07-06";
    Authorization: string;
    session_token: string;
};
export declare type IndexRequestParams = {
    limit?: number;
    after?: string;
    before?: string;
};
export declare function urlParams(params?: {
    [key: string]: string | number | undefined;
}): string;
export declare class GoCardlessApi {
    session_token: string;
    accessToken: string;
    sandbox: boolean;
    customer: GoCardlessCustomerApi;
    bankAccount: GoCardlessBankAccountApi;
    mandate: GoCardlessMandateApi;
    payment: GoCardlessPaymentApi;
    payout: GoCardlessPayoutApi;
    plan: GoCardlessPlanApi;
    constructor(accessToken: string, sandbox?: boolean);
    loadApis(): void;
    generateSessionToken(): string;
    getHeaders(): IGoCardlessHeaders;
    getBaseUrl(): "https://api-sandbox.gocardless.com/" | "https://api.gocardless.com";
    request(path: string, method?: "GET" | "POST" | "PUT", data?: {
        [key: string]: any;
    }): Promise<any>;
    handleGoCardlessResponse(response: any): Promise<any>;
}
