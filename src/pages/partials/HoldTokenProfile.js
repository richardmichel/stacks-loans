import React, {useEffect, useState} from "react";
import {fetchHodlTokenBalance} from "@pages/partials/StacksAccount";
import {Card, Col, Image, Row} from "react-bootstrap";
import BlockStackIcon from "@assets/imgs/blockstack-icon.png";


function HoldTokenProfile({stxAddress}) {
    const [balanceProfile, setBalanceProfile] = useState({
        balance: undefined,
    });

    useEffect(() => {
        //Your own Stacks address
        console.log("init fetchHodlTokenBalance");
        fetchHodlTokenBalance(stxAddress).then(balance => {
            console.log("resolved balance:", balance);
            setBalanceProfile({balance});
        });

    }, [stxAddress]);

    return (
        <React.Fragment>

            {balanceProfile.balance && (
                <React.Fragment>
                    <Row noGutters={false}>
                        <Col lg="12">
                            <Card
                                text="light"
                                className="sampleBox sampleBox-two">
                                <Card.Body>
                                    <Image src={BlockStackIcon}
                                           style={{width: '50px'}}
                                    />
                                    <Card.Title>
                                        { JSON.stringify(balanceProfile.balance, null, 2)} HoldToken STX
                                    </Card.Title>
                                    <Card.Text className="sampleBox-footer">
                                        <span className="title"> </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </React.Fragment>
            )}

            {!balanceProfile.balance && (
                <React.Fragment>
                    <Row noGutters={false}>
                        <Col lg="12">
                            <Card
                                text="light"
                                className="sampleBox sampleBox-two">
                                <Card.Body>
                                    <Image src={BlockStackIcon}
                                           style={{width: '50px'}}
                                    />
                                    <Card.Title>
                                        0 STX
                                    </Card.Title>
                                    <Card.Text className="sampleBox-footer">
                                        <span className="title"> </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
export default HoldTokenProfile;