import React, {useRef, useState, useEffect} from "react";
import {Button, Card, InputGroup, FormControl, Form, Alert} from "react-bootstrap";
import {txIdToStatus, CONTRACT_ADDRESS, CONTRACT_NAME} from "@pages/partials/StacksAccount";
import {useConnect} from "@blockstack/connect";
import {appDetails} from "@pages/partials/StacksAccount";
import {
    uintCV,
    PostConditionMode
} from "@blockstack/stacks-transactions";
import {
    FungibleConditionCode,
    makeContractSTXPostCondition
} from "@blockstack/stacks-transactions";

// services
import {ServiceFactory} from '@services/ServiceFactory';
const UserService = ServiceFactory.get('user');

const BigNum = require("bn.js");
export function BuyTokens({placeholder, ownerStxAddress}) {

    const {doContractCall} = useConnect();
    const amountRef = useRef();
    const monthRef = useRef();
    const spinner = useRef();
    const [status, setStatus] = useState();

    useEffect(() => {
        fetch(ownerStxAddress)
            .catch((e) => {
                setStatus("Failed to access your account", e);
                console.log(e);
            })
            .then(async (acc) => {

            });
    }, [ownerStxAddress]);


    const saveContract = async (payload) => {
        try {
            const response = await UserService.saveContract(payload);
            if (response && response.status == 200) {
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        spinner.current.classList.remove("d-none");

        let amountAsString = amountRef.current.value.trim();
        let amount = parseInt(amountAsString);

        let mountAsString2 = monthRef.current.value.trim();
        let mounth = parseInt(mountAsString2);


        try {
            setStatus(`Sending transaction`);
            const price = 0x1000;
            await doContractCall({
                contractAddress: CONTRACT_ADDRESS,
                contractName: CONTRACT_NAME,
                functionName: "get-stx-deposit",
                functionArgs: [uintCV(amount), uintCV(mounth)],
                appDetails,
                finished: (data) => {
                    console.log("reponse data:", data);
                    setStatus(txIdToStatus(data.txId));
                    spinner.current.classList.add("d-none");
                    saveContract(data).catch(error=>console.log(error));
                },
            });
        } catch (e) {
            setStatus(e.toString());
            spinner.current.classList.add("d-none");
        }
    };
  const handleChange = (e) => {

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
                                    ref={amountRef}
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
                                ref={monthRef}
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
                        <div className="my-4">
                            <Alert variant="primary">
                                <p>Status:</p>
                                <div>{status}</div>
                            </Alert>
                        </div>

                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
