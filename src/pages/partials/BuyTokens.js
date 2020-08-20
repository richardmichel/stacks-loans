import React, {useRef, useState, useEffect} from 'react';

import {Badge, Button, Col, Row, Card, Image, InputGroup, FormControl, Form} from 'react-bootstrap';
import {txIdToStatus, CONTRACT_ADDRESS} from "@pages/partials/StacksAccount";
import {useConnect} from '@blockstack/connect';
import {appDetails} from "@pages/partials/StacksAccount";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        spinner.current.classList.remove('d-none');

        var amountAsString = textfield.current.value.trim();
        var amount = parseInt(amountAsString);
        // 1 3
        let mounth = 1;

        try {
            setStatus(`Sending transaction`);

            await doContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: 'michel-test-2',
                functionName: 'get-stx-return',
                functionArgs: [uintCV(amount), uintCV(mounth)],
                postConditionMode: PostConditionMode.Deny,
                postConditions: [
                    makeStandardSTXPostCondition(
                        ownerStxAddress,
                        FungibleConditionCode.LessEqual,
                        new BigNum(amount),
                        new BigNum(mounth)
                    ),
                ],
                appDetails,
                finished: data => {
                    console.log("data",data);
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
