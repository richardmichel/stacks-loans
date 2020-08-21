import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";

describe("stack-loans test suite", () => {
  let stackLoansClient: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    stackLoansClient = new Client("ST1618RD5WAQMGNX4KQ4KBWBGP0X59BT5P324DB1S.stack-loans", "stack-loans", provider);
  });

  it("should have a valid syntax", async () => {
    await stackLoansClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await stackLoansClient.deployContract();
    });

    it("should return 1300 STX, 1005 STX@6Months", async () => {
      const query = stackLoansClient.createQuery({ method: { name: "get-stx-return", args: ["1005", "6"]} });
      const receipt = await stackLoansClient.submitQuery(query);
      const result = Result.unwrapInt(receipt);
      assert.equal(result, 1300);
    });

    it("should return 1295 STX, 1000 STX@6Months", async () => {
      const query = stackLoansClient.createQuery({ method: { name: "get-stx-return", args: ["1000", "6"]} });
      const receipt = await stackLoansClient.submitQuery(query);
      const result = Result.unwrapInt(receipt);
      assert.equal(result, 1295);
    });

    it("should return 1045 STX, 1000 STX@1Months", async () => {
      const query = stackLoansClient.createQuery({ method: { name: "get-stx-return", args: ["1000", "1"]} });
      const receipt = await stackLoansClient.submitQuery(query);
      const result = Result.unwrapInt(receipt);
      assert.equal(result, 1045);
    });

  });

  after(async () => {
    await provider.close();
  });
});