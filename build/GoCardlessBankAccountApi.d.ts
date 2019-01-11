import { GoCardlessApi, GoCardlessResponse, IndexRequestParams } from "./goCardlessApi";
interface IGoCardlessBankBase {
    branchCode: string;
    accountHolderName: string;
    customerId: string;
    currency: string;
    metadata: Object;
}
export interface IGoCardlessApiBank {
    id: GoCardlessResponse;
    created_at: GoCardlessResponse;
    account_holder_name: GoCardlessResponse;
    account_number_ending: GoCardlessResponse;
    country_code: GoCardlessResponse;
    currency: GoCardlessResponse;
    bank_name: GoCardlessResponse;
    metadata: {};
    enabled: boolean;
    links: {
        customer: GoCardlessResponse;
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
            before: GoCardlessResponse;
            after: GoCardlessResponse;
        };
        limit: number;
    };
}
export declare class GoCardlessBankAccountApi {
    api: GoCardlessApi;
    constructor(api: GoCardlessApi);
    index(params?: IndexRequestParams & {
        [key: string]: string | number | undefined;
    }): Promise<IGoCardlessIndexResponse>;
    create(bank: IGoCardlessBank): Promise<{
        customer_bank_accounts: IGoCardlessApiBank;
    }>;
    update(id: string, bank: IGoCardlessBankUpdate): Promise<{
        customer_bank_accounts: IGoCardlessApiBank;
    }>;
    find(id: string, params?: {
        [key: string]: string | number | undefined;
    }): Promise<{
        customer_bank_accounts: IGoCardlessApiBank;
    }>;
    disable(id: string): Promise<{
        customer_bank_accounts: IGoCardlessApiBank;
    }>;
    bankAccountForCustomerId(customerId: string): Promise<IGoCardlessIndexResponse>;
}
export {};
