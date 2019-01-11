import { GoCardlessApi, GoCardlessResponse, IndexRequestParams } from "./goCardlessApi";
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
            before: GoCardlessResponse;
            after: GoCardlessResponse;
        };
        limit: number;
    };
}
export declare class GoCardlessPayoutApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params: IndexRequestParams): Promise<IGoCardlessIndexResponse>;
    find(id: string): Promise<{
        payouts: IGoCardlessApiPayout;
    }>;
}
export {};
