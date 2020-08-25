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

describe("Stacks-Loan-2 contract test suite", async () => {
  it("should deposit and transfer to and from escrow", async () => {
    const keysClient = JSON.parse(fs.readFileSync("./keys.json").toString());
    const keysServer = JSON.parse(fs.readFileSync("./keys2.json").toString());

    const contractAddress = keysClient.stacksAddress;
    const contractName = "stacks-loans-2.clar";
    const codeBody = fs
      .readFileSync("./contracts/stacks-loans-2.clar")
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

    console.log("Deposit STX to escrow and set Lockup");
    fee = new BigNum(256);

    transaction = await makeContractCall({
      contractAddress,
      contractName,
      functionName: "client-deposit",
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

    console.log("Deposit STX to client and server from escrow");
    transaction = await makeContractCall({
      contractAddress,
      contractName,
      functionName: "server-deposit",
      functionArgs: [],
      fee,
      senderKey: secretKeyServer,
      nonce: new BigNum(1),
      network,
      postConditions: [
        makeContractSTXPostCondition(
          contractAddress,
          "escrow",
          FungibleConditionCode.LessEqual,
          new BigNum(stacks)
        ),
      ],
    });
    console.log(await broadcastTransaction(transaction, network));
  });
});