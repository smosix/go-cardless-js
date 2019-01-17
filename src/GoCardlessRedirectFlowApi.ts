import { GoCardlessApi, urlParams } from "./GoCardlessApi";

export interface IGoCardlessRedirectFlow {
  session_token: string;
  success_redirect_url: string;
  description?: string;
  prefilled_customer?: {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    city?: string;
    company_name?: string;
    country_code?: string;
    danish_identity_number?: string;
    email?: string;
    family_name?: string;
    given_name?: string;
    language?: string;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    swedish_identity_number?: string;
  }
  scheme?: string;
  links?: {
    creditor?: string;
  }
}

export interface IGoCardlessApiRedirectFlow {
  id: string;
  description: string;
  session_token: string;
  scheme: string;
  success_redirect_url: string;
  redirect_url: string;
  created_at: string;
  links: {
    creditor: string;
  };
}

export class GoCardlessRedirectFlowApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async create(
    redirect_flows: IGoCardlessRedirectFlow
  ): Promise<{ manredirect_flowsdates: IGoCardlessApiRedirectFlow }> {
    const { description, session_token, success_redirect_url, prefilled_customer, scheme, links } = redirect_flows;
    return this.api.request("redirect_flows", "POST", {
      redirect_flows: {
        description, 
        session_token, 
        success_redirect_url, 
        prefilled_customer, 
        scheme, 
        links
      }
    });
  }
  
  async complete(
    id: string,
    redirect_flows: { session_token: string }
  ): Promise<{ redirect_flows: IGoCardlessApiRedirectFlow }> {
    const { session_token } = redirect_flows;
    return this.api.request(`redirect_flows/${id}/actions/complete`, "POST", {
      "data": {
        session_token
      }
    });
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<{ redirect_flows: IGoCardlessApiRedirectFlow }> {
    return this.api.request(`redirect_flows/${id}${urlParams(params)}`);
  }
}
