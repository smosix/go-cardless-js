import { GoCardlessApi } from "../GoCardlessApi"
import { goCardlessBaseTests } from "./GoCardlessApi.test"
function genRandomString() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5)
}
goCardlessBaseTests(async (goCardlessApi: GoCardlessApi) => {
  const email = genRandomString() + "@email.com"
  const firstName = genRandomString() + " firstname"
  const lastName = genRandomString() + " lastname"
  test("Creates a goCardless Customer record.", () => {
    return goCardlessApi.customer.create({
      firstName,
      lastName,
      email,
    })
  })

  test("Throws error when invalid email is supplied", () => {
    const invalidEmail = genRandomString() + "@invalid email"
    goCardlessApi.customer
      .create({
        firstName,
        lastName,
        email: invalidEmail,
      })
      .catch(e => {
        expect(e.data.message).toMatch("Validation failed")
      })
  })

  test("Index returns multiple records", async () => {
    const response = await goCardlessApi.customer.index()
    expect(response.customers.length).toBeGreaterThan(0)
  })

  test("Find returns record by id", async () => {
    const response = await goCardlessApi.customer.index()
    const customer = response.customers[0]

    const findResponse = await goCardlessApi.customer.find(customer.id)
    expect(findResponse.id).toEqual(customer.id)
  })

  test("Update changes customer first name to new value", async () => {
    const newName = genRandomString() + " NEW TEST NAME"
    const response = await goCardlessApi.customer.index()
    const customer = response.customers[0]
    const updateResponse = await goCardlessApi.customer.update(customer.id, {
      firstName: newName,
    })
    expect(updateResponse.given_name).toEqual(newName)
  })
})
