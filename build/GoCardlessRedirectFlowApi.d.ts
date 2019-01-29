import { GoCardlessApi } from "./GoCardlessApi";
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
    };
    scheme?: string;
    links?: {
        creditor?: string;
    };
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
export declare class GoCardlessRedirectFlowApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    create(redirect_flows: IGoCardlessRedirectFlow): Promise<{
        redirect_flows: IGoCardlessApiRedirectFlow;
    }>;
    complete(id: string, redirect_flows: {
        session_token: string;
    }): Promise<{
        redirect_flows: IGoCardlessApiRedirectFlow;
    }>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<{
        redirect_flows: IGoCardlessApiRedirectFlow;
    }>;
}
