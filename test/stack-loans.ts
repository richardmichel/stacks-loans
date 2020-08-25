const BigNum = require("bn.js");
import * as fs from "fs";
import {
  makeSmartContractDeploy,
  makeContractCall,
  TransactionVersion,
  FungibleConditionCode,
  uintCV,
  ChainID,
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
  StacksTestnet,
  broadcastTransaction,
} from "@blockstack/stacks-transactions";

const STACKS_API_URL = "http://localhost:20443";

describe("Stacks-Loan contract test suite", async () => {
  it("should deposit and payout balance", async () => {
    const keysClient = JSON.parse(fs.readFileSync("./keys.json").toString());
    const keysServer = JSON.parse(fs.readFileSync("./keys2.json").toString());

    const contractAddress = keysClient.stacksAddress;
    const contractName = "stack-loans.clar";
    const codeBody = fs
      .readFileSync("./contracts/stacks-loans.clar")
      .toString();

    const stacks = 0x1000;
    const months = 0x6;

    var fee = new BigNum(2548);
    const secretKeyClient = keysClient.secretKey;
    const secretKeyServer = keysServer.secretKey;
    const network = new StacksTestnet();
    network.coreApiUrl = STACKS_API_URL;

    console.log("Client deploys contract");
    var transaction = await makeSmartContractDeploy({
      contractName,
      codeBody,
      fee,
      senderKey: secretKeyClient,
      nonce: new BigNum(0),
      network,
    });
    console.log(await broadcastTransaction(transaction, network));
    await new Promise((r) => setTimeout(r, 30000));

    console.log("Deposit STX and set Lockup");
    fee = new BigNum(256);

    transaction = await makeContractCall({
      contractAddress,
      contractName,
      functionName: "get-stx-deposit",
      functionArgs: [uintCV(stacks)],
      fee,
      senderKey: secretKeyClient,
      nonce: new BigNum(1),
      network,
      postConditions: [
        makeStandardSTXPostCondition(
          keysClient.stacksAddress,
          FungibleConditionCode.Equal,
          new BigNum(stacks)
        ),
      ],
    });
    console.log(await broadcastTransaction(transaction, network));
  });
});