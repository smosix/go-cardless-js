import { GoCardlessApi, IndexRequestParams } from "./GoCardlessApi";
export interface IGoCardlessRedirectFlow {
    session_token: string;
    success_redirect_url: string;
    description?: string;
    prefilled_customer?: {
        address_line1?: string;
        address_line2?: string;
        address_line3?: string;
        city?: string;
        country_code?: string;
        email?: string;
        family_name?: string;
        given_name?: string;
        postal_code?: string;
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
interface IGoCardlessIndexResponse {
    redirect_flows: IGoCardlessApiRedirectFlow[];
    meta: {
        cursors: {
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessRedirectFlow {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    create(redirect_flows: IGoCardlessRedirectFlow): Promise<{
        mandates: IGoCardlessApiRedirectFlow;
    }>;
    update(id: string, mandate: {
        metadata: Object;
    }): Promise<{
        mandates: IGoCardlessApiRedirectFlow;
    }>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<{
        mandates: IGoCardlessApiRedirectFlow;
    }>;
}
export {};
