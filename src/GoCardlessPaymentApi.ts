import { GoCardlessApi, GoCardlessResponse } from "./goCardlessApi"

export interface IGoCardlessPayment {
  amount: number
  currency: string
  charge_date: string
  reference?: string
  metadata?: Object
  mandateId: string
}

export interface IGoCardlessApiPayment {
  id: GoCardlessResponse
  created_at: GoCardlessResponse
  charge_date: GoCardlessResponse
  amount: number
  description: GoCardlessResponse
  currency: GoCardlessResponse
  status: GoCardlessResponse
  reference: GoCardlessResponse
  metadata: Object
  amount_refunded: number
  links: {
    mandate: string
    creditor: string
  }
}

interface IGoCardlessIndexResponse {
  payments: IGoCardlessApiPayment[]
  meta: {
    cursors: {
      before: GoCardlessResponse
      after: GoCardlessResponse
    }
    limit: number
  }
}

export class GoCardlessPaymentApi {
  api: GoCardlessApi
  constructor(api: GoCardlessApi) {
    this.api = api
  }

  async index({ limit }: { limit: number }): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`payments?limit=${limit || 20}`)
  }

  async create(payment: IGoCardlessPayment): Promise<{ payments: IGoCardlessApiPayment }> {
    const { amount, currency, charge_date, reference, metadata, mandateId } = payment
    return this.api.request("payments", "POST", {
      payments: {
        amount,
        currency,
        charge_date,
        // reference,
        metadata,
        links: {
          mandate: mandateId,
        },
      },
    })
  }
  async update(
    id: string,
    payment: { metadata: Object },
  ): Promise<{ payments: IGoCardlessApiPayment }> {
    const { metadata } = payment
    return this.api.request(`payments/${id}`, "PUT", {
      payments: {
        metadata,
      },
    })
  }

  async find(id: string): Promise<{ payments: IGoCardlessApiPayment }> {
    return this.api.request(`payments/${id}`)
  }

  async cancel(
    id: string,
    data: { metadata: Object },
  ): Promise<{ payments: IGoCardlessApiPayment }> {
    return this.api.request(`payments/${id}/actions/cancel`, "POST", data)
  }

  async retry(
    id: string,
    data: { metadata: Object },
  ): Promise<{ payments: IGoCardlessApiPayment }> {
    return this.api.request(`payments/${id}/actions/retry`, "POST", data)
  }
}
