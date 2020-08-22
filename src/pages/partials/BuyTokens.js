import React, {useRef, useState, useEffect, useContext} from 'react';

import {Button, Card, InputGroup, FormControl, Form} from 'react-bootstrap';
import {txIdToStatus, CONTRACT_ADDRESS, CONTRACT_NAME} from "@pages/partials/StacksAccount";
import {useConnect, openContractDeploy} from '@blockstack/connect';
import {appDetails} from "@pages/partials/StacksAccount";
import {openSTXTransfer} from '@blockstack/connect';
import { getStacksAccount } from '@pages/partials/StacksAccount';
import {
    makeContractCall,
    BufferCV,
    StacksMainnet,
    broadcastTransaction,
    bufferCVFromString,
    serializeCV,
    standardPrincipalCV,
    makeContractDeploy,
    StacksTestnet,
    TxBroadcastResultRejected,
    TxBroadcastResultOk,
    addressToString,
    callReadOnlyFunction
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



import {Flex, Box, Input, ButtonGroup, Text} from '@blockstack/ui';
// store
import {AdminStore} from "@store/admin-store";

const BigNum = require('bn.js');


// While in beta, you must provide this option:
const authOrigin = 'https://deploy-preview-301--stacks-authenticator.netlify.app';
//https://pr-574.app.stacks.engineering/

const STACKS_API_URL = "https://sidecar.staging.blockstack.xyz";
const SIDECAR_API_URL = "https://sidecar.staging.blockstack.xyz";
const NETWORK = new StacksTestnet();
NETWORK.coreApiUrl = STACKS_API_URL;

const contractAddress = 'ST3FHJFW64EK06MD3X702CMVCB2T4N1WDFMVXV7K6';
const contractName = 'michel-show-address31';
const privateKey = 'cddd64269a055f818fecab508eb0283c0119596d6d10693132165e79b90a5de501';

export function BuyTokens({placeholder, ownerStxAddress}) {

    const {state} = useContext(AdminStore);


    const {doContractCall} = useConnect();
    const textfield = useRef();
    const spinner = useRef();
    const [status, setStatus] = useState();
    const {userData} = state;

    const [txID, setTxID] = useState('0x25a4f0437a8e25673d917f00e345a823593d1594205442157512c2b5064977b7');
    const [callTxID, setCallTxID] = useState();
    const [functionReturn, setFunctionReturn] = useState();

    const { address } = getStacksAccount(userData.appPrivateKey);
    const appStxAddress = addressToString(address);

    //const userSession = new UserSession();

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


            await doContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: 'showAddress',
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
                authOrigin,
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

    //--->

    const onDeploy = async () => {
        try {


            const codeBody2 = '(begin (print "hello, world"))';
// While in beta, you must provide this option:
            const authOrigin = 'http://localhost:3000';

            await openContractDeploy({
                contractName: 'my-contract-name',
                codeBody2,
                authOrigin,
                appDetails,
                finished: data => {
                    console.log(data.txId);
                },
            });

            return true;

            const codeBody = '(define-public (showAddress) (ok tx-sender))';
            /*const options = {
                contractName: 'michel-show-address',
                codeBody,
                appDetails,
                finished: data => {
                    console.log('data:',data);
                    //console.log(data);
                    //setTxID(data.txId);
                },
            };
            openContractDeploy(options);*/

            const  timeout =(ms) => {
                return new Promise((resolve) => setTimeout(resolve, ms));
            };



            const contractName = 'michel-show-address31';

            const processing = async(tx, count = 0)=>{
                try {
                    var result = await fetch(
                        `${SIDECAR_API_URL}/sidecar/v1/tx/${tx}`//.substr(1, tx.length - 2)
                    );
                    var value = await result.json();
                    console.log("value:",value);
                    if (value.tx_status === "success") {
                        return true;
                    }
                    if (count > 30) {
                        return false;
                    }

                   const holdDown = await timeout(10000);
                    return processing(tx, count + 1);
                }catch(error){
                    console.log("error processing:", processing);
                }
            }
            //const privateKey = 'cddd64269a055f818fecab508eb0283c0119596d6d10693132165e79b90a5de501';
            const transaction = await makeContractDeploy({
                contractName: contractName,
                codeBody,
                senderKey: privateKey,//keys.privateKey,
                NETWORK,
            });

            const result = await broadcastTransaction(transaction, NETWORK);

            console.log("result 1:", result );
            if (result && result.error ) {//as TxBroadcastResultRejected).error
                if (result.reason === "ContractAlreadyExists") {
                    return "TxBroadcastResultOk";
                } else {
                    throw new Error(
                        `failed to deploy ${contractName}: ${JSON.stringify(result)}`
                    );
                }
            }
            const processed = await processing("0x"+result );//as TxBroadcastResultOk
            console.log("processed 1:", processed );
            if (!processed) {
                throw new Error(`failed to deploy ${contractName}: transaction not found`);
            }
            console.log("TxBroadcastResultOk");

        } catch (error) {

            console.log("error :", error);
        }
    };





    const onClick = async () => {
        try {

           // const authOrigin = 'https://sidecar.staging.blockstack.xyz';
            const contractAddress = 'ST3FHJFW64EK06MD3X702CMVCB2T4N1WDFMVXV7K6';
            const contractName = 'michel-show-address31';
            const functionName = 'showAddress';

            const callOptions = {
                contractAddress: contractAddress,
                contractName: contractName,
                functionName: functionName,
                functionArgs: [],
                authOrigin,
                appDetails,
                finished: data => {
                    console.log(data);
                    console.log('TX ID:', data.txId);
                    console.log('Raw TX:', data.txRaw);
                    setCallTxID(data.txId);
                    const res = fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/tx/${data.txId}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        });
                },
            };
            await doContractCall(callOptions);



        }catch (error) {
            console.log("eeror:", error);
        }
    };
    //const authOrigin = 'https://app.blockstack.org';
    const checkFunctionCall = () => {
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

    //--->

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

            <Button onClick={onDeploy}>Deploy my contract</Button>
            <br/>
            <Button onClick={onCheckTxn}>Check Transaction</Button>  <br/>
            <Button onClick={onClick}>Call Contract's Function</Button>  <br/>
            <Button onClick={checkFunctionCall}>Check If You Won</Button>  <br/>

        </div>
    );
}
