import {
  GoCardlessResponse,
  IndexRequestParams,
  urlParams
} from "./goCardlessApi";
import nodeFetch from "node-fetch";
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
  metaData?: { [key: string]: string | number };
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

export class GoCardlessCustomerApi {
  api: GoCardlessApi;
  constructor(api: GoCardlessApi) {
    this.api = api;
  }

  async index(
    params?: IndexRequestParams | { [key: string]: string | number | undefined }
  ): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`customers${urlParams(params)}`);
  }

  async create(
    customer: IGoCardlessCustomer
  ): Promise<{ customers: IGoCardlessApiCustomer }> {
    const {
      email,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      postcode,
      metaData,
      phone
    } = customer;

    return this.api.request("customers", "POST", {
      customers: {
        email: email,
        given_name: firstName,
        family_name: lastName,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_line3: addressLine3,
        city: city,
        postal_code: postcode,
        country_code: "GB",
        metadata: metaData,
        phone_number: phone
      }
    });
  }
  async update(
    id: string,
    customer: IGoCardlessCustomer
  ): Promise<{ customers: IGoCardlessApiCustomer }> {
    const {
      email,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      postcode,
      metaData,
      phone
    } = customer;
    return this.api.request("customers" + `/${id}`, "PUT", {
      customers: {
        email: email,
        given_name: firstName,
        family_name: lastName,
        address_line1: addressLine1,
        address_line2: addressLine2,
        address_line3: addressLine3,
        city: city,
        postal_code: postcode,
        country_code: "GB",
        metadata: metaData,
        phone_number: phone
      }
    });
  }

  async find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<{ customers: IGoCardlessApiCustomer }> {
    return this.api.request("customers" + `/${id}${urlParams(params)}`);
  }
}
