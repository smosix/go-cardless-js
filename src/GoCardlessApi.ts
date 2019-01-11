import nodeFetch from "node-fetch";

import { GoCardlessError, errors } from "./errors";
import { GoCardlessBankAccountApi } from "./GoCardlessBankAccountApi";
import { GoCardlessCustomerApi } from "./GoCardlessCustomerApi";
import { GoCardlessMandateApi } from "./GoCardlessMandateApi";
import { GoCardlessPaymentApi } from "./GoCardlessPaymentApi";
import { GoCardlessPayoutApi } from "./GoCardlessPayoutApi";
import { GoCardlessPlanApi } from "./GoCardlessPlanApi";

export type GoCardlessResponse = string | null;
// docs = https://developer.gocardless.com/api-reference/#api-usage-making-requests
export const goCardlessTestUrl = "https://api-sandbox.gocardless.com/";
export const goCardlessLiveUrl = "https://api.gocardless.com";
export type IGoCardlessHeaders = {
  environment: "sandbox" | "live";
  "Content-Type": "application/json";
  Accept: "application/json";
  "GoCardless-Version": "2015-07-06";
  Authorization: string;
  session_token: string;
};
export type IndexRequestParams = {
  limit?: number;
  after?: string;
  before?: string;
};

export function urlParams(params = {}) {
  return Object.entries(params)
    .map(([k, v], i) => (i === 0 ? `?${k}=${v}` : `&${k}=v`))
    .join("");
}
export class GoCardlessApi {
  session_token = "";
  accessToken: string;
  sandbox: boolean;
  customer!: GoCardlessCustomerApi;
  bankAccount!: GoCardlessBankAccountApi;
  mandate!: GoCardlessMandateApi;
  payment!: GoCardlessPaymentApi;
  payout!: GoCardlessPayoutApi;
  plan!: GoCardlessPlanApi;

  constructor(accessToken: string, sandbox = true) {
    this.sandbox = sandbox;
    this.accessToken = accessToken;
    this.generateSessionToken();
    this.loadApis();
  }

  loadApis() {
    this.customer = new GoCardlessCustomerApi(this);
    this.bankAccount = new GoCardlessBankAccountApi(this);
    this.mandate = new GoCardlessMandateApi(this);
    this.payment = new GoCardlessPaymentApi(this);
    this.payout = new GoCardlessPayoutApi(this);
    this.plan = new GoCardlessPlanApi(this);
  }

  generateSessionToken(): string {
    let dt = new Date().getTime();
    this.session_token = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    this.loadApis();
    return this.session_token;
  }

  getHeaders(): IGoCardlessHeaders {
    return {
      environment: this.sandbox ? "sandbox" : "live",
      "Content-Type": "application/json",
      Accept: "application/json",
      "GoCardless-Version": "2015-07-06",
      Authorization: `Bearer ${this.accessToken}`,
      session_token: this.session_token
    };
  }

  getBaseUrl() {
    return this.sandbox ? goCardlessTestUrl : goCardlessLiveUrl;
  }
  async request(
    path: string,
    method: "GET" | "POST" | "PUT" = "GET",
    data?: { [key: string]: any }
  ) {
    return nodeFetch(this.getBaseUrl() + path, {
      method,
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    }).then(this.handleGoCardlessResponse);
  }

  async handleGoCardlessResponse(response: any) {
    const responseJson = await response.json();
    if (responseJson.error) {
      if (responseJson.error.type === "validation_failed") {
        throw new GoCardlessError(
          errors.goCardlessValidationError,
          responseJson.error
        );
      } else if (responseJson.error.type === "invalid_api_usage") {
        throw new GoCardlessError(
          errors.goCardlessApiError,
          responseJson.error
        );
      } else {
        throw new GoCardlessError(errors.server, responseJson.error);
      }
    } else {
      return responseJson;
    }
  }
}
