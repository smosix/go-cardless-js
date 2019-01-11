import { GoCardlessApi, GoCardlessResponse, IndexRequestParams } from "./goCardlessApi";
export declare type IGoCardlessPlanInterval = "weekly" | "monthly" | "yearly";
export interface IGoCardlessPlan {
    month?: string;
    dayOfMonth?: string;
    startDate?: string;
    amount: number;
    currency: string;
    name: string;
    intervalUnit: IGoCardlessPlanInterval;
    count: number;
    metadata?: Object;
    mandateId: string;
}
export interface IGoCardlessApiPlan {
    id: string;
    created_at: string;
    amount: number;
    currency: string;
    status: string;
    name: string;
    start_date: string;
    end_date: GoCardlessResponse;
    interval: number;
    interval_unit: IGoCardlessPlanInterval;
    day_of_month: number;
    month: GoCardlessResponse;
    payment_reference: GoCardlessResponse;
    app_fee: string | number | null;
    upcoming_payments: {
        charge_date: string;
        amount: number;
    }[];
    metadata: {
        order_no: string;
    };
    links: {
        mandate: string;
    };
}
interface IGoCardlessIndexResponse {
    subscriptions: IGoCardlessApiPlan[];
    meta: {
        cursors: {
            before: GoCardlessResponse;
            after: GoCardlessResponse;
        };
        limit: number;
    };
}
export declare class GoCardlessPlanApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params: IndexRequestParams): Promise<IGoCardlessIndexResponse>;
    find(id: string): Promise<{
        subscriptions: IGoCardlessApiPlan;
    }>;
    create(plan: IGoCardlessPlan): Promise<{
        subscriptions: IGoCardlessApiPlan;
    }>;
    cancel(id: string, data: {
        metadata: Object;
    }): Promise<{
        subscriptions: IGoCardlessApiPlan;
    }>;
}
export {};
