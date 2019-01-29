import { GoCardlessApi, IndexRequestParams } from "./GoCardlessApi";
interface IGoCardlessBankBase {
    branchCode: string;
    accountHolderName: string;
    customerId: string;
    currency: string;
    metadata: Object;
}
export interface IGoCardlessApiBank {
    id: string;
    created_at: string;
    account_holder_name: string;
    account_number_ending: string;
    country_code: string;
    currency: string;
    bank_name: string;
    metadata: {};
    enabled: boolean;
    links: {
        customer: string;
    };
}
export interface IGoCardlessBankAccountNumber extends IGoCardlessBankBase {
    accountNumber: string;
    iban: never;
}
export interface IGoCardlessBankIban extends IGoCardlessBankBase {
    accountNumber: never;
    iban: string;
}
interface IGoCardlessBankUpdate {
    metadata: Object;
}
declare type IGoCardlessBank = IGoCardlessBankAccountNumber | IGoCardlessBankIban;
interface IGoCardlessIndexResponse {
    customer_bank_accounts: IGoCardlessApiBank[];
    meta: {
        cursors: {
            before: string;
            after: string;
        };
        limit: number;
    };
}
export declare class GoCardlessBankAccountApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams | {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    create(bank: IGoCardlessBank): Promise<IGoCardlessApiBank>;
    update(id: string, data?: IGoCardlessBankUpdate): Promise<IGoCardlessApiBank>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessApiBank>;
    disable(id: string): Promise<IGoCardlessApiBank>;
    bankAccountForCustomerId(customerId: string): Promise<IGoCardlessIndexResponse>;
}
export {};
