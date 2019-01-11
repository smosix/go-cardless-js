import { GoCardlessApi, IndexRequestParams } from "./goCardlessApi";
export interface IGoCardlessApiPayout {
    id: string;
    amount: number;
    deducted_fees: number;
    currency: string;
    created_at: string;
    reference: string;
    arrival_date: string;
    status: string;
    links: {
        creditor_bank_account: string;
        creditor: string;
    };
}
interface IGoCardlessIndexResponse {
    payouts: IGoCardlessApiPayout[];
    meta: {
        cursors: {
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessPayoutApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<{
        payouts: IGoCardlessApiPayout;
    }>;
}
export {};
