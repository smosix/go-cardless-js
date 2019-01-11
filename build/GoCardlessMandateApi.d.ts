import { GoCardlessApi, GoCardlessResponse, IndexRequestParams } from "./goCardlessApi";
export interface IGoCardlessMandate {
    scheme?: string;
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
            before: GoCardlessResponse;
            after: GoCardlessResponse;
        };
        limit: number;
    };
}
export declare class GoCardlessMandateApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params: IndexRequestParams): Promise<IGoCardlessIndexResponse>;
    create(mandate: IGoCardlessMandate): Promise<{
        mandates: IGoCardlessApiMandate;
    }>;
    update(id: string, mandate: {
        metadata: Object;
    }): Promise<{
        mandates: IGoCardlessApiMandate;
    }>;
    find(id: string): Promise<{
        mandates: IGoCardlessApiMandate;
    }>;
}
export {};
