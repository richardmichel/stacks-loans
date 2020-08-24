import React, { useRef, useState, useEffect, useContext } from "react";

import { Button, Card, InputGroup, FormControl, Form } from "react-bootstrap";
import {
  txIdToStatus,
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
  PRIVATE_KEY,
} from "@pages/partials/StacksAccount";
import {
  useConnect,
  openContractDeploy,
  //    openSTXTransfer
} from "@blockstack/connect";
import { appDetails } from "@pages/partials/StacksAccount";

import { getStacksAccount, STACK_API_URL } from "@pages/partials/StacksAccount";
import {
  StacksTestnet,
  addressToString,
  uintCV,
  intCV,
  PostConditionMode,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  BufferReader,
  makeContractDeploy,
  broadcastTransaction,
  //    sponsorTransaction,
  //    deserializeTransaction
  //    makeContractCall,
  //    BufferCV,
  //    StacksMainnet,
  //    broadcastTransaction,
  //   bufferCVFromString,
  //    serializeCV,
  //    standardPrincipalCV,
  //    makeContractDeploy,
  //    TxBroadcastResultRejected,
  //    TxBroadcastResultOk,
  //    callReadOnlyFunction
  // makeSTXTokenTransfer
} from "@blockstack/stacks-transactions";

// store
import { AdminStore } from "@store/admin-store";

const BigNum = require("bn.js");

const STACKS_API_URL = "https://sidecar.staging.blockstack.xyz";
const SIDECAR_API_URL = "https://sidecar.staging.blockstack.xyz";
const network = new StacksTestnet();
network.coreApiUrl = STACKS_API_URL;

export function BuyTokens({ placeholder, ownerStxAddress }) {
  const { state } = useContext(AdminStore);
  const { doContractCall } = useConnect();
  const textfield = useRef();
  const textfield2 = useRef();
  const spinner = useRef();
  const [status, setStatus] = useState();

  //-->
  const [txID, setTxID] = useState(
    "0x25a4f0437a8e25673d917f00e345a823593d1594205442157512c2b5064977b7"
  );
  const [callTxID, setCallTxID] = useState();
  const [functionReturn, setFunctionReturn] = useState();

  useEffect(() => {}, []);
  useEffect(() => {
    fetch(ownerStxAddress)
      .catch((e) => {
        setStatus("Failed to access your account", e);
        console.log(e);
      })
      .then(async (acc) => {
        console.log({ acc });
      });
  }, [ownerStxAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    spinner.current.classList.remove("d-none");

    var amountAsString = textfield.current.value.trim();
    var amount = parseInt(amountAsString);

    var amountAsString2 = textfield2.current.value.trim();
    var mounth = parseInt(amountAsString2);
    console.log("amount:", amount);
    console.log("mounth:", mounth);

    // 1 3
    //let mounth = 1;

    try {
      setStatus(`Sending transaction`);

      //let fee = new BigNum(5);
      await doContractCall({
        contractAddress: "ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8",
        contractName: "test-loans-1991",
        functionName: "get-stx-return",
        functionArgs: [uintCV(amount), uintCV(mounth)],
        postConditionMode: PostConditionMode.Allow,
        appDetails,
        finished: (data) => {
          console.log("data setStatus:", data);
          setStatus(txIdToStatus(data.txId));
          spinner.current.classList.add("d-none");
        },
      });
    } catch (e) {
      console.log(e);
      setStatus(e.toString());
      spinner.current.classList.add("d-none");
    }
  };

  const onClick = async () => {
    const callOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "showAddress",
      functionArgs: [],
      appDetails,
      finished: (data) => {
        setCallTxID(data.txId);
        const res = fetch(
          `https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${data.txId}`
        )
          .then((res) => res.json())
          .then((data) => {});
      },
    };
    await doContractCall(callOptions);
  };

  //const authOrigin = 'https://app.blockstack.org';
  const checkFunctionCall = () => {
    if (!callTxID) {
      alert("callTxID is empty");
      return true;
    }
    const res = fetch(
      `https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${callTxID}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.tx_status === "success") {
          setFunctionReturn(data.tx_result.repr);
        }
      });
  };
  const onCheckTxn = () => {
    if (txID) {
      const res = fetch(
        `https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${txID}`
      )
        .then((res) => res.json())
        .then((res) => console.log(res));
    } else {
      console.log("Contract Not Deployed");
    }
  };

  //-->
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const processing = async (tx, count = 0) => {
    try {
      let result = await fetch(
        `${SIDECAR_API_URL}/sidecar/v1/tx/${tx}` //.substr(1, tx.length - 2)
      );
      let value = await result.json();

      if (value.tx_status === "success") {
        return true;
      }
      if (count > 30) {
        return false;
      }

      const holdDown = await timeout(10000);
      return processing(tx, count + 1);
    } catch (error) {
      console.log("error processing:", processing);
    }
  };

  const onDeploy = async () => {
    try {
      const codeBody = `(define-fungible-token stacks-loans-token u1000000)
(define-fungible-token stacks-loans-hodl-token u1000000)
(define-public (transfer (recipient principal) (amount uint))
   (match (ft-transfer? stacks-loans-token amount tx-sender recipient)
    result (ok true)
    error (err false))
)
(define-public (hodl (amount uint))
  (begin
    (unwrap-panic (ft-transfer? stacks-loans-token amount tx-sender (as-contract tx-sender)))
    (let ((original-sender tx-sender))
     (ok (unwrap-panic (as-contract (ft-transfer? stacks-loans-hodl-token amount tx-sender original-sender))))
    )
  )
)
(define-public (unhodl (amount uint))
  (begin
    (print (ft-transfer? stacks-loans-hodl-token amount tx-sender (as-contract tx-sender)))
    (let ((original-sender tx-sender))
      (print (as-contract (ft-transfer? stacks-loans-token amount tx-sender original-sender)))
    )
  )
)
(define-read-only (balance-of (owner principal))
   (+ (ft-get-balance stacks-loans-token owner) (ft-get-balance stacks-loans-hodl-token owner))
)
(define-read-only (hodl-balance-of (owner principal))
  (ft-get-balance stacks-loans-hodl-token owner)
)
(define-read-only (spendable-balance-of (owner principal))
  (ft-get-balance stacks-loans-token owner)
)
(define-read-only (get-spendable-in-bank)
  (ft-get-balance stacks-loans-token (as-contract tx-sender))
)
(define-read-only (get-hodl-in-bank)
  (ft-get-balance stacks-loans-hodl-token (as-contract tx-sender))
)
(define-private (mint (account principal) (amount uint))
    (begin
      (unwrap-panic (ft-mint? stacks-loans-token amount account))
      (unwrap-panic (ft-mint? stacks-loans-hodl-token amount (as-contract tx-sender)))
      (ok amount)))
(define-public (buy-tokens (amount uint))
  (begin
    (unwrap-panic (stx-transfer? amount tx-sender 'ST0EE1X0X7PHZHEE0A2N845FT568G0VMK4QX01XK))
    (mint tx-sender amount)
  )
)
;; Initialize the contract
(begin
  (mint 'ST0EE1X0X7PHZHEE0A2N845FT568G0VMK4QX01XK u990000)
)`;

      const transaction = await makeContractDeploy({
        contractName: CONTRACT_NAME,
        codeBody,
        senderKey: PRIVATE_KEY,
        network,
      });

      const result = await broadcastTransaction(transaction, network);

      if (result && result.error) {
        if (result.reason === "ContractAlreadyExists") {
          return "TxBroadcastResultOk";
        } else {
          throw new Error(
            `failed to deploy ${CONTRACT_NAME}: ${JSON.stringify(result)}`
          );
        }
      }
      const processed = await processing("0x" + result);
      if (!processed) {
        throw new Error(
          `failed to deploy ${CONTRACT_NAME}: transaction not found`
        );
      }
      console.log("TxBroadcastResultOk");
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleChange = (e) => {
    console.log("value:", e.target.value); // stuff
  };

  return (
    <div>
      <Card>
        <Card.Header>
          Please fill form to receive 5% STX per month on your deposit
        </Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="Deposit">
              <Form.Label>Deposit Amount</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  aria-label="Recipient's Deposit"
                  aria-describedby="basic-addon2"
                  type="decimal"
                  ref={textfield}
                  className="form-control"
                  defaultValue={""}
                  placeholder={placeholder}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">STX</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="Lockup">
              <Form.Label>Lockup Period</Form.Label>
              <Form.Control
                as="select"
                ref={textfield2}
                onChange={handleChange}
                defaultValue={"3"}
              >
                <option value="3">3 Months</option>
                <option value="6"> 6 Months</option>
                <option value="9">9 Months</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              <div
                ref={spinner}
                role="status"
                className="d-none spinner-border spinner-border-sm text-info align-text-top mr-2"
              />
              Get loan now
            </Button>
          </Form>

          {status && (
            <>
              <div>{status}</div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
