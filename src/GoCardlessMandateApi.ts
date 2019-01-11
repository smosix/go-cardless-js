import {
  GoCardlessApi,
  GoCardlessResponse,
  urlParams,
  IndexRequestParams
} from "./goCardlessApi";

export interface IGoCardlessMandate {
  scheme?: string;
  metadata?: Object;
  customer_bank_account: string;
  creditor?: string;
}

export interface IGoCardlessApiMandate {
  id: string;
  created_at: string;
  reference: string;
  status: string;
  scheme: string;
  next_possible_charge_date: string;
  metadata: Object;
  links: {
    customer_bank_account: string;
    creditor: string;
    customer: string;
  };
}

interface IGoCardlessIndexResponse {
  mandates: IGoCardlessApiMandate[];
  meta: {
    cursors: {
      before: GoCardlessResponse;
      after: GoCardlessResponse;
    };
    limit: number;
  };
}

export class GoCardlessMandateApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(params: IndexRequestParams): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`mandates${urlParams(params)}`);
  }

  async create(
    mandate: IGoCardlessMandate
  ): Promise<{ mandates: IGoCardlessApiMandate }> {
    const { scheme, metadata, customer_bank_account, creditor } = mandate;
    return this.api.request("mandates", "POST", {
      mandates: {
        scheme,
        metadata,
        links: {
          customer_bank_account,
          creditor //TODO SET THIS TO WHOMEVER NEEDS PAYING
        }
      }
    });
  }
  async update(
    id: string,
    mandate: { metadata: Object }
  ): Promise<{ mandates: IGoCardlessApiMandate }> {
    const { metadata } = mandate;
    return this.api.request(`mandates/${id}`, "PUT", {
      mandates: {
        metadata
      }
    });
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<{ mandates: IGoCardlessApiMandate }> {
    return this.api.request(`mandates/${id}${urlParams(params)}`);
  }
}
