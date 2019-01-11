import { IndexRequestParams } from "./goCardlessApi";
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
    id: string;
    created_at: string;
    email: string;
    given_name: string;
    family_name: string;
    company_name: string;
    address_line1: string;
    address_line2: string;
    address_line3: string;
    city: string;
    region: string;
    postal_code: string;
    country_code: string;
    language: string;
    swedish_identity_number: string;
    danish_identity_number: string;
    phone_number: string;
    metadata: Object;
}
interface IGoCardlessIndexResponse {
    customers: IGoCardlessApiCustomer[];
    meta: {
        cursors: {
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessCustomerApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
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
