import { GoCardlessApi, IndexRequestParams } from "./GoCardlessApi";
export declare type IGoCardlessSubscriptionInterval = "weekly" | "monthly" | "yearly";
export interface IGoCardlessSubscription {
    month?: string;
    dayOfMonth?: string;
    startDate?: string;
    amount: number;
    currency: string;
    name: string;
    intervalUnit: IGoCardlessSubscriptionInterval;
    count: number;
    metadata?: Object;
    mandateId: string;
}
export interface IGoCardlessApiSubscription {
    id: string;
    created_at: string;
    amount: number;
    currency: string;
    status: string;
    name: string;
    start_date: string;
    end_date: string;
    interval: number;
    interval_unit: IGoCardlessSubscriptionInterval;
    day_of_month: number;
    month: string;
    payment_reference: string;
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
    subscriptions: IGoCardlessApiSubscription[];
    meta: {
        cursors: {
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessSubscriptionApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<{
        subscriptions: IGoCardlessApiSubscription;
    }>;
    create(Subscription: IGoCardlessSubscription): Promise<{
        subscriptions: IGoCardlessApiSubscription;
    }>;
    cancel(id: string, data?: {
        metadata: Object;
    }): Promise<{
        subscriptions: IGoCardlessApiSubscription;
    }>;
}
export {};
