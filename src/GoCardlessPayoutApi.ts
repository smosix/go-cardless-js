import { GoCardlessApi, IndexRequestParams, urlParams } from "./GoCardlessApi";
import { responseDeprecationWarning } from "./utils";

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

export class GoCardlessPayoutApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(
    params?: IndexRequestParams | { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`payouts${urlParams(params)}`);
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessApiPayout> {
    const result = await this.api.request(`payouts/${id}${urlParams(params)}`);
    responseDeprecationWarning("payouts");
    return ({
      ...result.payouts,
      payouts: result
    } as any) as IGoCardlessApiPayout;
  }
}
