import React, {useRef, useState, useEffect, useContext} from 'react';

import {Button, Card, InputGroup, FormControl, Form} from 'react-bootstrap';
import {txIdToStatus, CONTRACT_ADDRESS, CONTRACT_NAME} from "@pages/partials/StacksAccount";
import {
    useConnect,
//    openContractDeploy,
//    openSTXTransfer
} from '@blockstack/connect';
import {appDetails} from "@pages/partials/StacksAccount";

import {getStacksAccount} from '@pages/partials/StacksAccount';
import {
    StacksTestnet,
    addressToString,
    uintCV,
    PostConditionMode,
    makeStandardSTXPostCondition,
    FungibleConditionCode,
    BufferReader,
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
} from '@blockstack/stacks-transactions';

// store
import {AdminStore} from "@store/admin-store";

const BigNum = require('bn.js');

export function BuyTokens({placeholder, ownerStxAddress}) {

    const {state} = useContext(AdminStore);
    const {doContractCall} = useConnect();
    const textfield = useRef();
    const spinner = useRef();
    const [status, setStatus] = useState();

    //-->
    const [txID, setTxID] = useState('0x25a4f0437a8e25673d917f00e345a823593d1594205442157512c2b5064977b7');
    const [callTxID, setCallTxID] = useState();
    const [functionReturn, setFunctionReturn] = useState();

    useEffect(() => {
        console.log("ownerStxAddress:", ownerStxAddress);
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


            await doContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: 'buy-tokens',
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
                    console.log("data", data);
                    setStatus(txIdToStatus(data.txId));
                    spinner.current.classList.add('d-none');
                },
            });


        } catch (e) {
            console.log(e);
            setStatus(e.toString());
            spinner.current.classList.add('d-none');
        }
    };

    const onClick = async () => {
        //console.log(props.test);
        const callOptions = {
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName: 'showAddress',
            functionArgs: [],
            appDetails,
            finished: data => {
                console.log(data);
                console.log('TX ID:', data.txId);
                console.log('Raw TX:', data.txRaw);
                setCallTxID(data.txId);
                const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${data.txId}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log("data",data);
                    });
            },
        };
        await doContractCall(callOptions);
    };

    //const authOrigin = 'https://app.blockstack.org';
    const checkFunctionCall = () => {
        if(!callTxID){
            alert("callTxID is empty");
            return true;
        }
        const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${callTxID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.tx_status === 'success') {
                    setFunctionReturn(data.tx_result.repr);
                }
            });
    };
    const onCheckTxn = () => {
        if (txID) {
            const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${txID}`)
                .then(res => res.json())
                .then(res => console.log(res));
        } else {
            console.log('Contract Not Deployed');
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

            <Button onClick={onCheckTxn}>Check Transaction</Button>
            <Button onClick={onClick}>Call Contract's Function</Button>
            <Button onClick={checkFunctionCall}>Check If You Won</Button>
            <pre>
                functionReturn:
                {functionReturn
                    ? 'The return of the function is' + functionReturn
                    : 'Contract has yet to be called'}
            </pre>

        </div>
    );
}
