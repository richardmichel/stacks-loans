import React, {useEffect, useState} from "react";
import {fetchAccount, fetchHodlTokenBalance} from "@pages/partials/StacksAccount";
import {Card, Col, Image, Row} from "react-bootstrap";
import BlockStackIcon  from "@assets/imgs/blockstack-icon.png";

function HoldTokenProfile({stxAddress}) {
    const [balanceProfile, setBalanceProfile] = useState({
        balance: undefined,
    });

    useEffect(() => {
        console.log("stxAddress sender");
        //fetchHodlTokenBalance(stxAddress).then(balance => {
        //console.log("balance:", balance);
        //setBalanceProfile({ balance });
        //});

    }, [stxAddress]);

    return (
        <React.Fragment>

            {balanceProfile.balance && (
                <React.Fragment>
                    {balanceProfile.balance} <br/>
                </React.Fragment>
            )}

            {!balanceProfile.balance && (
                <React.Fragment>
                    <Row noGutters={false}>
                        <Col lg="6">
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