# Go Cardless Api JS Wrapper

GoCardless Api Documentation: https://developer.gocardless.com/api-reference/#api-usage-making-requests

## Getting started

```javascript
const goCardlessApi = new GoCardlessApi("accessToken", sandbox?:boolean)
// sandbox is default TRUE
goCardlessApi.generateSessionToken(): string
// generates and returns new session token. new session token is automatically applied to all new request headers
```

### Error format example

```javascript

{
  "type": "go cardless validation error",
  "data": [
    {
      "field": "amount",
      "message": "must be greater than 0",
      "request_pointer": "/subscriptions/amount"
    }
  ]
}
```

### Apis:

### Index Actions

Index actions can take additional params for the url, as an object e.g. customer: "customer id" on a mandate would return you mandates where the customer id matches.

### Bank Account

```
goCardlessApi.bankAccount
```

### types

```javascript
interface IGoCardlessBank {
  branchCode: string;
  accountHolderName: string;
  customerId: string;
  currency: string;
  accountNumber: string; // OR iban can be supplied instead
}
interface IGoCardlessApiBank {
  id: string;
  created_at: string;
  account_holder_name: string;
  account_number_ending: string;
  country_code: string;
  currency: string;
  bank_name: string;
  metadata: {
    // returns whatever you sent up
  };
  enabled: boolean;
  links: {
    customer: string,
  };
}
```

#### Actions

##### index

```javascript
goCardlessApi.bankAccount.index({
  limit?: number;
  after?: string;
  before?: string;
  { [key: string]: string | number | undefined }
 }): Promise<{
  customer_bank_accounts: IGoCardlessApiBank[]
}>
```

##### create

```javascript
goCardlessApi.bankAccount.create(data: IGoCardlessBank): Promise<{
  customer_bank_accounts: IGoCardlessApiBank
}>
```

##### update

```javascript
goCardlessApi.bankAccount.update(id: string, data?: {
  metadata: {
    [key:string]:any
  }): Promise<{
  customer_bank_accounts: IGoCardlessApiBank
}>
```

##### find

```javascript
goCardlessApi.bankAccount.find(id: string): Promise<{
  customer_bank_accounts: IGoCardlessApiBank
}>
```

##### disable

```javascript
goCardlessApi.bankAccount.disable(id: string): Promise<{
  customer_bank_accounts: IGoCardlessApiBank
}>
```

##### bank account for customer id

returns an array of bank accounts for a customer by the given customer id.

```javascript
goCardlessApi.bankAccount.bankAccountForCustomerId(customerId: string): Promise<{
  customer_bank_accounts: IGoCardlessApiBank[]
}>
```

### Customer

```
goCardlessApi.customer
```

### types

```javascript
interface IGoCardlessCustomer {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  country?: string;
  postcode?: string;
  metaData?: { [key: string]: string | number };
}
interface IGoCardlessApiCustomer {
    id: string
    created_at: string
    email: string
    given_name: string
    family_name: string
    company_name: string
    address_line1: string
    address_line2: string
    address_line3: string
    city: string
    region: string
    postal_code: string
    country_code: string
    language: string
    swedish_identity_number: string
    danish_identity_number: string
    phone_number: string
    metadata: {
      // any keys you sent up
    }
  }
}
```

#### Actions

##### index

```javascript
goCardlessApi.customer.index({
  limit?: number;
  after?: string;
  before?: string;
  { [key: string]: string | number | undefined }
 }): Promise<{
  customers: IGoCardlessApiCustomer[]
}>
```

##### create

```javascript
goCardlessApi.customer.create(data: IGoCardlessCustomer): Promise<{
  customers: IGoCardlessApiCustomer
}>
```

##### update

```javascript
goCardlessApi.customer.update(id: string, data: Partial<IGoCardlessCustomer>): Promise<{
  customers: IGoCardlessApiCustomer
}>
```

##### find

```javascript
goCardlessApi.customer.update(id: string): Promise<{
  customers: IGoCardlessApiCustomer
}>
```

### Mandate

```
goCardlessApi.mandate
```

### types

```javascript
interface IGoCardlessMandate {
  scheme:
    | "autogiro"
    | "bacs"
    | "becs"
    | "becs_nz"
    | "betalingsservice"
    | "sepa_core"
    | "pad";
  metadata?: Object;
  customer_bank_account: string;
  creditor?: string;
}
interface IGoCardlessApiMandate {
   id: string
  created_at: string
  reference: string
  status: string
  scheme: string
  next_possible_charge_date: string
  metadata: Object
  links: {
    customer_bank_account: string
    creditor: string
    customer: string
  }
  }
```

#### Actions

##### index

```javascript
goCardlessApi.mandate.index({
  limit?: number;
  after?: string;
  before?: string;
  { [key: string]: string | number | undefined }
 }): Promise<{
  mandates: IGoCardlessApiMandate[]
}>
```

create

```javascript
goCardlessApi.mandate.create(data: IGoCardlessMandate): Promise<{
    mandates: IGoCardlessApiMandate
  }>
```

##### update

```javascript
goCardlessApi.mandates.update(id: string, {
    metadata?: Object
  }): Promise<{
    mandates: IGoCardlessApiMandate
  }>
```

##### find

```javascript
goCardlessApi.mandates.find(id: string): Promise<{
    mandates: IGoCardlessApiMandate
  }>
```

### Payments

```
goCardlessApi.payment
```

### types

```javascript
interface IGoCardlessPayment {
  amount: number; // must be greater than 0
  currency: string;
  charge_date: string;
  reference?: string;
  metadata?: Object;
  mandateId: string;
}
interface IGoCardlessApiPayment {
    id: string
    created_at: string
    charge_date: string
    amount: number
    description: string
    currency: string
    status: string
    reference: string
    metadata: Object
    amount_refunded: number
    links: {
      mandate: string
      creditor: string
    }

```

#### Actions

##### index

```javascript
goCardlessApi.payment.index({
  limit?: number;
  after?: string;
  before?: string;
  { [key: string]: string | number | undefined }
 }): Promise<{
  payments: IGoCardlessApiPayment[]
}>
```

##### create

```javascript
goCardlessApi.payment.create(data: IGoCardlessPayment): Promise<{
  payments: IGoCardlessApiPayment[]
}>
```

##### update

```javascript
goCardlessApi.payment.create(id: string, {
  metadata: Object
}): Promise<{
  payments: IGoCardlessApiPayment[]
}>
```

##### find

```javascript
goCardlessApi.payment.find(id: string): Promise<{
  payments: IGoCardlessApiPayment
}>
```

##### cancel

```javascript
goCardlessApi.payment.cancel(id: string, data?: {
  metadata: Object
}): Promise<{
  payments: IGoCardlessApiPayment
}>
```

##### retry

```javascript
goCardlessApi.payment.retry(id: string, data?: {
  metadata: Object
}): Promise<{
  payments: IGoCardlessApiPayment
}>
```

### Payouts

```
goCardlessApi.payout
```

#### Actions

##### index

```javascript
goCardlessApi.payout.index({
  limit?: number;
  after?: string;
  before?: string;
  { [key: string]: string | number | undefined }
 }): Promise<{
  payouts: {
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
    }}[]
}>
```

##### find

```javascript
goCardlessApi.payout.find(id: string): Promise<{
  payouts: {
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
}>
```

### Plan

```
goCardlessApi.plan
```

### types

```javascript
interface IGoCardlessPlan {
  amount: number // must be greater than 0
  currency: string
  name?: string
  intervalUnit: IGoCardlessPlanInterval
  count: number
  metadata?: Object
  mandateId: string
}
interface IGoCardlessApiPlan {
    id: string
    created_at: string
    amount: number
    currency: string
    status: string
    name: string
    start_date: string
    end_date: GoCardlessResponse
    interval: number
    interval_unit: IGoCardlessPlanInterval
    day_of_month: number
    month: GoCardlessResponse
    payment_reference: GoCardlessResponse
    app_fee: string | number | null
    upcoming_payments: { charge_date: string; amount: number }[]
    metadata: {
      order_no: string
    }
    links: {
      mandate: string
    }
```

#### Actions

##### index

```javascript
goCardlessApi.plan.index({
  limit?: number;
  after?: string;
  before?: string;
  { [key: string]: string | number | undefined }
 }): Promise<{
  subscriptions: IGoCardlessApiPlan[]
}>
```

##### find

```javascript
goCardlessApi.plan.find(id: string): Promise<{
  subscriptions: IGoCardlessApiPlan
}>
```

##### create

```javascript
goCardlessApi.plan.create(data: IGoCardlessPlan): Promise<{
  subscriptions: {
    id: string
    created_at: string
    amount: number
    currency: string
    status: string
    name: string
    start_date: string
    end_date: GoCardlessResponse
    interval: number
    interval_unit: IGoCardlessPlanInterval
    day_of_month: number
    month: GoCardlessResponse
    payment_reference: GoCardlessResponse
    app_fee: string | number | null
    upcoming_payments: { charge_date: string; amount: number }[]
    metadata: {
      order_no: string
    }
    links: {
      mandate: string
    }
  }
}>
```

##### cancel

```javascript
goCardlessApi.plan.cancel(id: string, data?: {
  metadata: Object
}): Promise<{
  subscriptions: IGoCardlessApiPlan
}>
```

### Redirect Flows

```javascript
goCardlessApi.redirectFlows
```

### types

```javascript
interface IGoCardlessRedirectFlow {
  session_token: string;
  success_redirect_url: string;
  description?: string;
  prefilled_customer?: {
    address_line1?: string;
    address_line2?: string;
    address_line3?: string;
    city?: string;
    company_name?: string;
    country_code?: string;
    danish_identity_number?: string;
    email?: string;
    family_name?: string;
    given_name?: string;
    language?: string;
    phone_number?: string;
    postal_code?: string;
    region?: string;
    swedish_identity_number?: string;
  }
  scheme?: string;
  links?: {
    creditor?: string;
  }
}
interface IGoCardlessApiRedirectFlow {
  id: string;
  description: string;
  session_token: string;
  scheme: string;
  success_redirect_url: string;
  redirect_url: string;
  created_at: string;
  links: {
    creditor: string;
  };
}
```

### Actions

#### create

```javascript
goCardlessApi.redirectFlows.create(
  redirect_flows: IGoCardlessRedirectFlow
  ): Promise<{ redirect_flows: IGoCardlessApiRedirectFlow }>
```

#### complete

```javascript
goCardlessApi.redirectFlows.complete(
    id: string,
    redirect_flows: { session_token: string }
  ): Promise<{ redirect_flows: IGoCardlessApiRedirectFlow }>
```

#### find

```javascript
goCardlessApi.redirectFlows.find(
    id: string,
    params?: { [key: string]: string | number | undefined }
  ): Promise<{ redirect_flows: IGoCardlessApiRedirectFlow }>
```
