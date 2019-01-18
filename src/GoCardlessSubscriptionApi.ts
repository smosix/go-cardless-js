import { GoCardlessApi, IndexRequestParams, urlParams } from "./GoCardlessApi";

export type IGoCardlessSubscriptionInterval = "weekly" | "monthly" | "yearly";
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
  upcoming_payments: { charge_date: string; amount: number }[];
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

export class GoCardlessSubscriptionApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(
    params?: IndexRequestParams | { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`subscriptions${urlParams(params)}`);
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<{ subscriptions: IGoCardlessApiSubscription }> {
    const result = await this.api.request(
      `subscriptions/${id}${urlParams(params)}`
    );
    return { ...result.subscriptions };
  }

  async create(
    Subscription: IGoCardlessSubscription
  ): Promise<{ subscriptions: IGoCardlessApiSubscription }> {
    const {
      amount,
      currency,
      name,
      intervalUnit,
      metadata,
      mandateId,
      count,
      month,
      startDate,
      dayOfMonth
    } = Subscription;
    const result = await this.api.request("subscriptions", "POST", {
      subscriptions: {
        start_date: startDate,
        day_of_month: dayOfMonth,
        month,
        amount,
        currency,
        name,
        interval_unit: intervalUnit,
        metadata,
        count,
        links: {
          mandate: mandateId
        }
      }
    });
    return { ...result.subscriptions };
  }

  async cancel(
    id: string,
    data?: { metadata: Object }
  ): Promise<{ subscriptions: IGoCardlessApiSubscription }> {
    const result = await this.api.request(
      `subscriptions/${id}/actions/cancel`,
      "POST",
      data
    );
    return { ...result.subscriptions };
  }
}
