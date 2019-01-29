import { GoCardlessApi, IndexRequestParams } from "./GoCardlessApi";
export interface IGoCardlessPayment {
    amount: number;
    currency: string;
    charge_date: string;
    reference?: string;
    metadata?: Object;
    mandateId: string;
}
export interface IGoCardlessApiPayment {
    id: string;
    created_at: string;
    charge_date: string;
    amount: number;
    description: string;
    currency: string;
    status: string;
    reference: string;
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
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessPaymentApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    create(payment: IGoCardlessPayment): Promise<IGoCardlessApiPayment>;
    update(id: string, payment: {
        metadata: Object;
    }): Promise<IGoCardlessApiPayment>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessApiPayment>;
    cancel(id: string, data?: {
        metadata: Object;
    }): Promise<IGoCardlessApiPayment>;
    retry(id: string, data?: {
        metadata: Object;
    }): Promise<IGoCardlessApiPayment>;
}
export {};
