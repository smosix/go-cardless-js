import { GoCardlessApi, IndexRequestParams, urlParams } from "./GoCardlessApi";
import { responseDeprecationWarning } from "./utils";

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

export class GoCardlessPaymentApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(
    params?: IndexRequestParams | { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`payments${urlParams(params)}`);
  }

  async create(payment: IGoCardlessPayment): Promise<IGoCardlessApiPayment> {
    const {
      amount,
      currency,
      charge_date,
      reference,
      metadata,
      mandateId
    } = payment;
    const result = await this.api.request("payments", "POST", {
      payments: {
        amount,
        currency,
        charge_date,
        // reference,
        metadata,
        links: {
          mandate: mandateId
        }
      }
    });
    responseDeprecationWarning("payments");
    return ({
      ...result.payments,
      payments: result
    } as any) as IGoCardlessApiPayment;
  }
  async update(
    id: string,
    payment: { metadata: Object }
  ): Promise<IGoCardlessApiPayment> {
    const { metadata } = payment;
    const result = await this.api.request(`payments/${id}`, "PUT", {
      payments: {
        metadata
      }
    });
    responseDeprecationWarning("mandates");
    return ({
      ...result.payments,
      payments: result
    } as any) as IGoCardlessApiPayment;
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessApiPayment> {
    const result = await this.api.request(`payments/${id}${urlParams(params)}`);
    responseDeprecationWarning("payments");
    return ({
      ...result.payments,
      payments: result
    } as any) as IGoCardlessApiPayment;
  }

  async cancel(
    id: string,
    data?: { metadata: Object }
  ): Promise<IGoCardlessApiPayment> {
    const result = await this.api.request(
      `payments/${id}/actions/cancel`,
      "POST",
      data
    );
    responseDeprecationWarning("payments");
    return ({
      ...result.payments,
      payments: result
    } as any) as IGoCardlessApiPayment;
  }

  async retry(
    id: string,
    data?: { metadata: Object }
  ): Promise<IGoCardlessApiPayment> {
    const result = await this.api.request(
      `payments/${id}/actions/retry`,
      "POST",
      data
    );
    responseDeprecationWarning("payments");
    return ({
      ...result.payments,
      payments: result
    } as any) as IGoCardlessApiPayment;
  }
}
