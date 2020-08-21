import React, {useRef, useState, useEffect} from 'react';

import { Button, Card,  InputGroup, FormControl, Form} from 'react-bootstrap';
import {txIdToStatus, CONTRACT_ADDRESS, CONTRACT_NAME} from "@pages/partials/StacksAccount";
import {useConnect} from '@blockstack/connect';
import {appDetails, NETWORK } from "@pages/partials/StacksAccount";

import {
    makeContractCall,
    BufferCV,
    StacksMainnet,
    broadcastTransaction,
    serializeCV, standardPrincipalCV
} from '@blockstack/stacks-transactions';

import {
    uintCV,
    PostConditionMode,
    makeStandardSTXPostCondition,
    FungibleConditionCode,
} from '@blockstack/stacks-transactions';

import {
    sponsorTransaction,
    BufferReader,
    deserializeTransaction
} from '@blockstack/stacks-transactions';


import {
    makeSTXTokenTransfer
} from '@blockstack/stacks-transactions';
const BigNum = require('bn.js');




export function BuyTokens({placeholder, ownerStxAddress}) {
    const {doContractCall} = useConnect();
    const textfield = useRef();
    const spinner = useRef();
    const [status, setStatus] = useState();

    useEffect(() => {
        fetch(ownerStxAddress)
            .catch(e => {
                setStatus('Failed to access your account', e);
                console.log(e);
            })
            .then(async acc => {
                console.log({acc});
            });
    }, [ownerStxAddress]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        spinner.current.classList.remove('d-none');

        var amountAsString = textfield.current.value.trim();
        var amount = parseInt(amountAsString);
        // 1 3
        //let mounth = 1;

        try {

            setStatus(`Sending transaction`);


            /*await doContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: 'increment',
                functionArgs: [uintCV(amount)],
                postConditionMode: PostConditionMode.Deny,
                postConditions: [
                    makeStandardSTXPostCondition(
                        ownerStxAddress,
                        FungibleConditionCode.LessEqual,
                        new BigNum(amount)
                    ),
                ],
                appDetails,
                finished: data => {
                    console.log("data",data);
                    setStatus(txIdToStatus(data.txId));
                    spinner.current.classList.add('d-none');
                },
            });*/




            let senderKey = serializeCV(new standardPrincipalCV(ownerStxAddress));
            console.log("senderKey:", senderKey);
            const txOptions = {
                recipient: 'ST11G8XNCBAB3VSW16JDRBXY09FA2E4YFVCWRPT58',
                amount: new BigNum(1),
                senderKey: "7509f982bca1e2bddea906922f5294aedfaf31b199ce85d41e2979364a043d7e",//'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01',
                NETWORK,
                memo: "test memo",
                nonce: new BigNum(0), // set a nonce manually if you don't want builder to fetch from a Stacks node
                fee: new BigNum(200), // set a tx fee if you don't want the builder to estimate
            };

            const transaction = await makeSTXTokenTransfer(txOptions);

                // to see the raw serialized tx
            const serializedTx = transaction.serialize().toString('hex');
            console.log("serializedTx:", serializedTx);

            // broadcasting transaction to the specified network
            const broadcastTransaction = await broadcastTransaction(transaction, NETWORK);
            console.log("broadcastTransaction:", broadcastTransaction);


        } catch (e) {
            console.log(e);
            setStatus(e.toString());
            spinner.current.classList.add('d-none');
        }
    };

    return (
        <div>

            <Card>
                <Card.Header>Please fill form to receive 5% STX per month on your deposit</Card.Header>
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
                                    defaultValue={''}
                                    placeholder={placeholder}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon2">STX</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>



                        <Form.Group controlId="Lockup">
                            <Form.Label>Lockup Period</Form.Label>
                            <Form.Control as="select">
                                <option>3 Months</option>
                                <option>6 Months</option>
                                <option>9 Months</option>
                            </Form.Control>
                        </Form.Group>



                        <Form.Group controlId="Currency">
                            <Form.Label>Return Currency</Form.Label>
                            <Form.Control as="select">
                                <option>STX</option>
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
