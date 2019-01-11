import { GoCardlessResponse, IndexRequestParams } from "./goCardlessApi";
import { GoCardlessApi } from "./GoCardlessApi";
export interface IGoCardlessCustomer {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    country: string;
    postcode: string;
    metaData?: {
        [key: string]: string | number;
    };
}
export interface IGoCardlessApiCustomer {
    id: GoCardlessResponse;
    created_at: GoCardlessResponse;
    email: GoCardlessResponse;
    given_name: GoCardlessResponse;
    family_name: GoCardlessResponse;
    company_name: GoCardlessResponse;
    address_line1: GoCardlessResponse;
    address_line2: GoCardlessResponse;
    address_line3: GoCardlessResponse;
    city: GoCardlessResponse;
    region: GoCardlessResponse;
    postal_code: GoCardlessResponse;
    country_code: GoCardlessResponse;
    language: GoCardlessResponse;
    swedish_identity_number: GoCardlessResponse;
    danish_identity_number: GoCardlessResponse;
    phone_number: GoCardlessResponse;
    metadata: Object;
}
interface IGoCardlessIndexResponse {
    customers: IGoCardlessApiCustomer[];
    meta: {
        cursors: {
            before: GoCardlessResponse;
            after: GoCardlessResponse;
        };
        limit: number;
    };
}
export declare class GoCardlessCustomerApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params: IndexRequestParams): Promise<IGoCardlessIndexResponse>;
    create(customer: IGoCardlessCustomer): Promise<{
        customers: IGoCardlessApiCustomer;
    }>;
    update(id: string, customer: IGoCardlessCustomer): Promise<{
        customers: IGoCardlessApiCustomer;
    }>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<{
        customers: IGoCardlessApiCustomer;
    }>;
}
export {};
