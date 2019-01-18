import { GoCardlessApi, IndexRequestParams, urlParams } from "./GoCardlessApi";
import { responseDeprecationWarning } from "./utils";

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

type IGoCardlessBank = IGoCardlessBankAccountNumber | IGoCardlessBankIban;

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

export class GoCardlessBankAccountApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(
    params?: IndexRequestParams | { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`customer_bank_accounts${urlParams(params)}`);
  }

  async create(bank: IGoCardlessBank): Promise<IGoCardlessApiBank> {
    const {
      accountNumber,
      branchCode,
      accountHolderName,
      customerId,
      currency,
      metadata
    } = bank;

    const result = await this.api.request("customer_bank_accounts", "POST", {
      customer_bank_accounts: {
        account_number: accountNumber,
        branch_code: branchCode,
        account_holder_name: accountHolderName,
        country_code: "GB",
        currency,
        metadata,
        links: {
          customer: customerId
        }
      }
    });
    responseDeprecationWarning("customer_bank_accounts");
    return ({
      ...result.customer_bank_accounts,
      customer_bank_accounts: result
    } as any) as IGoCardlessApiBank;
  }
  async update(
    id: string,
    data?: IGoCardlessBankUpdate
  ): Promise<IGoCardlessApiBank> {
    const result = await this.api.request(
      `customer_bank_accounts/${id}`,
      "PUT",
      {
        customer_bank_accounts: data
      }
    );
    responseDeprecationWarning("customer_bank_accounts");
    return ({
      ...result.customer_bank_accounts,
      customer_bank_accounts: result
    } as any) as IGoCardlessApiBank;
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessApiBank> {
    const result = await this.api.request(
      `customer_bank_accounts/${id}${urlParams(params)}`
    );
    responseDeprecationWarning("customer_bank_accounts");
    return ({
      ...result.customer_bank_accounts,
      customer_bank_accounts: result
    } as any) as IGoCardlessApiBank;
  }

  async disable(id: string): Promise<IGoCardlessApiBank> {
    const result = await this.api.request(
      `customer_bank_accounts/${id}/actions/disable`,
      "POST"
    );
    responseDeprecationWarning("customer_bank_accounts");
    return ({
      ...result.customer_bank_accounts,
      customer_bank_accounts: result
    } as any) as IGoCardlessApiBank;
  }

  async bankAccountForCustomerId(
    customerId: string
  ): Promise<IGoCardlessIndexResponse> {
    return (this.api.request(
      `customer_bank_accounts?customer=${customerId}`
    ) as any) as IGoCardlessIndexResponse;
  }
}
