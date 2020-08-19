import React, {useRef, useState, useEffect} from 'react';

import {Badge, Button, Col, Row, Card, Image, InputGroup, FormControl, Form} from 'react-bootstrap';
import {txIdToStatus, CONTRACT_ADDRESS} from "@pages/partials/StacksAccount";
import {useConnect} from '@blockstack/connect';
import {
    uintCV,
    PostConditionMode,
    makeStandardSTXPostCondition,
    FungibleConditionCode,
} from '@blockstack/stacks-transactions';
import * as BigNum from 'bn.js';

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

    const sendAction = async () => {
        spinner.current.classList.remove('d-none');

        var amountAsString = textfield.current.value.trim();
        var amount = parseInt(amountAsString);

        try {
            setStatus(`Sending transaction`);

            await doContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: 'hodl-token',
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
                appDetails: {
                    name: 'Speed Spend',
                    icon: 'https://speed-spend.netlify.app/speedspend.png',
                },
                finished: data => {
                    console.log(data);
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

    return (
        <div>

            <Card>
                <Card.Header>Seize Your Stacks</Card.Header>
                <Card.Body>


                    <Form>
                        <Form.Group controlId="Deposit">
                            <Form.Label>Deposit Amount</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    type="decimal"
                                    ref={textfield}
                                    className="form-control"
                                    defaultValue={''}
                                    placeholder={placeholder}
                                    onKeyUp={e => {
                                        if (e.key === 'Enter') sendAction();
                                    }}
                                    onBlur={e => {
                                        setStatus(undefined);
                                    }}
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
                            Get Stacks Now
                        </Button>

                    </Form>


                    {/*

                    <button className="btn btn-outline-secondary" type="button" onClick={sendAction}>
                                <div
                                    ref={spinner}
                                    role="status"
                                    className="d-none spinner-border spinner-border-sm text-info align-text-top mr-2"
                                />
                                Buy
                            </button>
                    */}
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
