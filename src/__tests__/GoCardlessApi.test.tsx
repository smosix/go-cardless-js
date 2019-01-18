import { GoCardlessApi } from "../GoCardlessApi";
import dotenv from "dot-env";
dotenv.config();

const apis = [
  { name: "customer", actions: ["create"] },
  { name: "bankAccount", actions: [] },
  { name: "mandate", actions: [] },
  { name: "payment", actions: [] },
  { name: "payout", actions: [] },
  { name: "plan", actions: [] },
  { name: "subscription", actions: [] },
  { name: "redirectFlows", actions: [] }
];

function behavesLikeApi(api, apiInfo) {
  test(`${apiInfo.name} is defined`, () => {
    expect(api).toBeTruthy();
  });

  apiInfo.actions.map(action => {
    test(`${apiInfo.name} ${action} is defined`, () => {
      expect(api[action]).toBeDefined();
    });
    test(`${apiInfo.name} ${action} to throw go cardless error`, async () => {
      expect(api[action]({})).rejects.toThrowError();
    });
  });
}

function goCardlessApiTest() {
  const goCardlessApi = new GoCardlessApi(
    process.env.GOCARDLESSS_SANDBOX_TEST_KEY
  );
  test("generateSessionToken returns a string token", () => {
    expect(typeof goCardlessApi.generateSessionToken() === "string").toBe(true);
  });
  test("Headers are correct", () => {
    expect(goCardlessApi.getHeaders()).toMatchObject({
      environment: expect.any(String),
      "Content-Type": "application/json",
      Accept: "application/json",
      "GoCardless-Version": expect.any(String),
      Authorization: expect.stringMatching(new RegExp(/Bearer .*/)),
      session_token: expect.any(String)
    });
  });

  apis.map(api => {
    behavesLikeApi(goCardlessApi[api.name], api);
  });
}

goCardlessApiTest();
