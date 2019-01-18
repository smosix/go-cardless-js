import { GoCardlessApi, urlParams, IndexRequestParams } from "./GoCardlessApi";
import { responseDeprecationWarning } from "./utils";

export interface IGoCardlessMandate {
  scheme:
    | "autogiro"
    | "bacs"
    | "becs"
    | "becs_nz"
    | "betalingsservice"
    | "sepa_core"
    | "pad";
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
      before: string;
      after: string;
    };
    limit: number;
  };
}

export class GoCardlessMandateApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(
    params?: IndexRequestParams | { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`mandates${urlParams(params)}`);
  }

  async create(mandate: IGoCardlessMandate): Promise<IGoCardlessApiMandate> {
    const { scheme, metadata, customer_bank_account, creditor } = mandate;
    const result = await this.api.request("mandates", "POST", {
      mandates: {
        scheme,
        metadata,
        links: {
          customer_bank_account,
          creditor //TODO SET THIS TO WHOMEVER NEEDS PAYING
        }
      }
    });
    responseDeprecationWarning("mandates");
    return ({
      ...result.mandates,
      mandates: result
    } as any) as IGoCardlessApiMandate;
  }
  async update(
    id: string,
    mandate: { metadata: Object }
  ): Promise<IGoCardlessApiMandate> {
    const { metadata } = mandate;
    const result = await this.api.request(`mandates/${id}`, "PUT", {
      mandates: {
        metadata
      }
    });
    responseDeprecationWarning("mandates");
    return ({
      ...result.mandates,
      mandates: result
    } as any) as IGoCardlessApiMandate;
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessApiMandate> {
    const result = await this.api.request(`mandates/${id}${urlParams(params)}`);
    responseDeprecationWarning("mandates");
    return ({
      ...result.mandates,
      mandates: result
    } as any) as IGoCardlessApiMandate;
  }
}
