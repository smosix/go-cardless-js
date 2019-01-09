import { GoCardlessApi, GoCardlessResponse } from "./goCardlessApi"

export interface IGoCardlessApiPayout {
  id: string
  amount: number
  deducted_fees: number
  currency: string
  created_at: string
  reference: string
  arrival_date: string
  status: string
  links: {
    creditor_bank_account: string
    creditor: string
  }
}

interface IGoCardlessIndexResponse {
  payouts: IGoCardlessApiPayout[]
  meta: {
    cursors: {
      before: GoCardlessResponse
      after: GoCardlessResponse
    }
    limit: number
  }
}

export class GoCardlessPayoutApi {
  api: GoCardlessApi
  constructor(api: GoCardlessApi) {
    this.api = api
  }

  async index({ limit }: { limit: number }): Promise<IGoCardlessIndexResponse> {
    return this.api.request(`payouts?limit=${limit || 20}`)
  }

  async find(id: string): Promise<{ payouts: IGoCardlessApiPayout }> {
    return this.api.request(`payouts/${id}`)
  }
}
