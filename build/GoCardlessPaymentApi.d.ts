import { GoCardlessApi, GoCardlessResponse, IndexRequestParams } from "./goCardlessApi";
export interface IGoCardlessPayment {
    amount: number;
    currency: string;
    charge_date: string;
    reference?: string;
    metadata?: Object;
    mandateId: string;
}
export interface IGoCardlessApiPayment {
    id: GoCardlessResponse;
    created_at: GoCardlessResponse;
    charge_date: GoCardlessResponse;
    amount: number;
    description: GoCardlessResponse;
    currency: GoCardlessResponse;
    status: GoCardlessResponse;
    reference: GoCardlessResponse;
    metadata: Object;
    amount_refunded: number;
    links: {
        mandate: string;
        creditor: string;
    };
}
interface IGoCardlessIndexResponse {
    payments: IGoCardlessApiPayment[];
    meta: {
        cursors: {
            before: GoCardlessResponse;
            after: GoCardlessResponse;
        };
        limit: number;
    };
}
export declare class GoCardlessPaymentApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params: IndexRequestParams): Promise<IGoCardlessIndexResponse>;
    create(payment: IGoCardlessPayment): Promise<{
        payments: IGoCardlessApiPayment;
    }>;
    update(id: string, payment: {
        metadata: Object;
    }): Promise<{
        payments: IGoCardlessApiPayment;
    }>;
    find(id: string): Promise<{
        payments: IGoCardlessApiPayment;
    }>;
    cancel(id: string, data: {
        metadata: Object;
    }): Promise<{
        payments: IGoCardlessApiPayment;
    }>;
    retry(id: string, data: {
        metadata: Object;
    }): Promise<{
        payments: IGoCardlessApiPayment;
    }>;
}
export {};
