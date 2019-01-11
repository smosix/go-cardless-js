import { GoCardlessApi, IndexRequestParams, urlParams } from "./goCardlessApi";

export type IGoCardlessPlanInterval = "weekly" | "monthly" | "yearly";
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
  end_date: string;
  interval: number;
  interval_unit: IGoCardlessPlanInterval;
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
  subscriptions: IGoCardlessApiPlan[];
  meta: {
    cursors: {
      before: string;
      after: string;
    };
    limit: number;
  };
}

export class GoCardlessPlanApi {
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
  ): Promise<{ subscriptions: IGoCardlessApiPlan }> {
    return this.api.request(`subscriptions/${id}${urlParams(params)}`);
  }

  async create(
    plan: IGoCardlessPlan
  ): Promise<{ subscriptions: IGoCardlessApiPlan }> {
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
    } = plan;
    return this.api.request("subscriptions", "POST", {
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
  }

  async cancel(
    id: string,
    data: { metadata: Object }
  ): Promise<{ subscriptions: IGoCardlessApiPlan }> {
    return this.api.request(`subscriptions/${id}/actions/cancel`, "POST", data);
  }
}
