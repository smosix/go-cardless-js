import { GoCardlessApi, IndexRequestParams } from "./GoCardlessApi";
export interface IGoCardlessMandate {
    scheme: "autogiro" | "bacs" | "becs" | "becs_nz" | "betalingsservice" | "sepa_core" | "pad";
    metadata?: Object;
    customer_bank_account: string;
    creditor?: string;
}
export interface IGoCardlessApiMandate {
    id: string;
    created_at: string;
    reference: string;
    status: string;
    scheme: string;
    next_possible_charge_date: string;
    metadata: Object;
    links: {
        customer_bank_account: string;
        creditor: string;
        customer: string;
    };
}
interface IGoCardlessIndexResponse {
    mandates: IGoCardlessApiMandate[];
    meta: {
        cursors: {
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessMandateApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    create(mandate: IGoCardlessMandate): Promise<IGoCardlessApiMandate>;
    update(id: string, mandate: {
        metadata: Object;
    }): Promise<IGoCardlessApiMandate>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessApiMandate>;
}
export {};
