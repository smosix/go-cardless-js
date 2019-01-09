# Go Cardless Api JS Wrapper

## Getting started

```javascript
const goCardlessApi = new GoCardlessApi("accessToken", sandbox?:boolean) // sandbox is default TRUE
```

### Apis:

### Bank Account

```
goCardlessApi.bankAccount
```

#### Actions

index

```javascript
goCardlessApi.bankAccount.index({ limit: number }): Promise<{
  customer_bank_accounts: {
    id: string,
    created_at: string,
    account_holder_name: string,
    account_number_ending: string,
    country_code: string,
    currency: string,
    bank_name: string,
    metadata: {
      // returns whatever you sent up
    };
    enabled: boolean;
    links: {
      customer: string
    }
  }[]
}>
```

create

```javascript
goCardlessApi.bankAccount.create({
  branchCode: string,
  accountHolderName: string,
  customerId: string,
  currency: string,
  accountNumber: string, // || iban
}): Promise<{
  customer_bank_accounts: {
    id: string,
    created_at: string,
    account_holder_name: string,
    account_number_ending: string,
    country_code: string,
    currency: string,
    bank_name: string,
    metadata: {
      // returns whatever you sent up
    };
    enabled: boolean;
    links: {
      customer: string
    }
  }
}>
```

update

```javascript
goCardlessApi.bankAccount.update(id: string, {
  metadata: {
    [key:string]:any
  }
}): Promise<{
  customer_bank_accounts: {
    id: string,
    created_at: string,
    account_holder_name: string,
    account_number_ending: string,
    country_code: string,
    currency: string,
    bank_name: string,
    metadata: {
      // returns whatever you sent up
    };
    enabled: boolean;
    links: {
      customer: string
    }
  }
}>
```

find

```javascript
goCardlessApi.bankAccount.find(id: string): Promise<{
  customer_bank_accounts: {
    id: string,
    created_at: string,
    account_holder_name: string,
    account_number_ending: string,
    country_code: string,
    currency: string,
    bank_name: string,
    metadata: {
      // returns whatever you sent up
    };
    enabled: boolean;
    links: {
      customer: string
    }
  }
}>
```

disable

```javascript
goCardlessApi.bankAccount.disable(id: string): Promise<{
  customer_bank_accounts: {
    id: string,
    created_at: string,
    account_holder_name: string,
    account_number_ending: string,
    country_code: string,
    currency: string,
    bank_name: string,
    metadata: {
      // returns whatever you sent up
    };
    enabled: boolean;
    links: {
      customer: string
    }
  }
}>
```

bank account for customer id

returns an array of bank accounts for a customer by the given customer id.

```javascript
goCardlessApi.bankAccount.bankAccountForCustomerId(customerId: string): Promise<{
  customer_bank_accounts: {
    id: string,
    created_at: string,
    account_holder_name: string,
    account_number_ending: string,
    country_code: string,
    currency: string,
    bank_name: string,
    metadata: {
      // returns whatever you sent up
    };
    enabled: boolean;
    links: {
      customer: string
    }
  }[]
}>
```

### Customer

```
goCardlessApi.customer
```

#### Actions

index

```javascript
goCardlessApi.customer.index({ limit: number }): Promise<{
  customers: {
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
  }[]
}>
```

create

```javascript
goCardlessApi.customer.create({
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  city: string,
  country: string,
  postcode: string,
  metaData?: { [key: string]: string | number },
 }): Promise<{
  customers: {
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
  }[]
}>
```

update

```javascript
goCardlessApi.customer.update(id: string, {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  city: string,
  country: string,
  postcode: string,
  metaData?: { [key: string]: string | number },
 }): Promise<{
  customers: {
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
  }[]
}>
```

find

```javascript
goCardlessApi.customer.update(id: string): Promise<{
  customers: {
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
  }[]
}>
```

### Mandate

```
goCardlessApi.mandate
```

#### Actions

index

```javascript
goCardlessApi.mandate.index({ limit: number }): Promise<{
  mandates: {
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
  }[]
}>
```

create

```javascript
goCardlessApi.mandate.create({
    scheme?: string
    metadata?: Object
    customer_bank_account: string
    creditor?: string
  }): Promise<{
    mandates: {
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
  }>
```

update

```javascript
goCardlessApi.mandates.update(id: string, {
    metadata?: Object
  }): Promise<{
    mandates: {
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
  }>
```

find

```javascript
goCardlessApi.mandates.find(id: string): Promise<{
    mandates: {
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
  }>
```

### Payments

```
goCardlessApi.payment
```

#### Actions

index

```javascript
goCardlessApi.payment.index({ limit: number }): Promise<{
  payments: {
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
    }}[]
}>
```

create

```javascript
goCardlessApi.payment.create({
  amount: number, // must be greater than 0
  currency: string,
  charge_date: string,
  reference?: string,
  metadata?: Object,
  mandateId: string,
}): Promise<{
  payments: {
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
    }}[]
}>
```

update

```javascript
goCardlessApi.payment.create(id: string, {
  metadata: Object
}): Promise<{
  payments: {
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
    }}[]
}>
```

find

```javascript
goCardlessApi.payment.find(id: string): Promise<{
  payments: {
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
  }
}>
```

cancel

```javascript
goCardlessApi.payment.cancel(id: string, {
  metadata: Object
}): Promise<{
  payments: {
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
  }
}>
```

retry

```javascript
goCardlessApi.payment.retry(id: string, {
  metadata: Object
}): Promise<{
  payments: {
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
  }
}>
```

### Payouts

```
goCardlessApi.payout
```

#### Actions

index

```javascript
goCardlessApi.payout.index({ limit: number }): Promise<{
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

index

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

#### Actions

index

```javascript
goCardlessApi.plan.index({ limit: number }): Promise<{
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
    }}[]
}>
```

find

```javascript
goCardlessApi.plan.find(id: string): Promise<{
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

create

```javascript
goCardlessApi.plan.create([
  amount: number // must be greater than 0
  currency: string
  name: string
  intervalUnit: IGoCardlessPlanInterval
  count: number
  metadata?: Object
  mandateId: string
]): Promise<{
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

cancel

```javascript
goCardlessApi.plan.cancel(id: string, {
  metadata: Object
}): Promise<{
  subscriptions: {
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
  }
}>
```
