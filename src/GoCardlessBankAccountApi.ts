import { GoCardlessApi, IndexRequestParams, urlParams } from "./goCardlessApi";

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

  async create(
    bank: IGoCardlessBank
  ): Promise<{ customer_bank_accounts: IGoCardlessApiBank }> {
    const {
      accountNumber,
      branchCode,
      accountHolderName,
      customerId,
      currency,
      metadata
    } = bank;
    return this.api.request("customer_bank_accounts", "POST", {
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
  }
  async update(
    id: string,
    bank: IGoCardlessBankUpdate
  ): Promise<{ customer_bank_accounts: IGoCardlessApiBank }> {
    const { metadata } = bank;
    return this.api.request(`customer_bank_accounts/${id}`, "PUT", {
      customer_bank_accounts: { metadata }
    });
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<{ customer_bank_accounts: IGoCardlessApiBank }> {
    return this.api.request(`customer_bank_accounts/${id}${urlParams(params)}`);
  }

  async disable(
    id: string
  ): Promise<{ customer_bank_accounts: IGoCardlessApiBank }> {
    return this.api.request(
      `customer_bank_accounts/${id}/actions/disable`,
      "POST"
    );
  }

  async bankAccountForCustomerId(
    customerId: string
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`customer_bank_accounts?customer=${customerId}`);
  }
}
