import React, {useRef, useState, useCallback, useEffect} from 'react';

import {Card, Jumbotron, Button, Row, Col, Container, Image, ProgressBar, Form, Badge, Alert} from 'react-bootstrap';


import HoldTokenProfile from "@pages/partials/HoldTokenProfile";
import StxProfile from "@pages/partials/StxProfile";

function Profile({stxAddresses, userData}) {
    const {profile, username} = userData;
    const [status, setStatus] = useState('');
    const updateStatus = status => {
        setStatus(status);
        setTimeout(() => {
            setStatus(undefined);
        }, 10000);
    };

    return (
        <React.Fragment>
            <Card body className="border-0">
                <div className="Profile">


                    {status && (
                        <React.Fragment>
                            <br/>
                            <Alert variant="info">
                                <Alert.Heading>Oh snap!</Alert.Heading>
                                {status}
                            </Alert>
                            <br/>
                        </React.Fragment>
                    )}

                    <div className="pt-4 title ">

                        <Row className="justify-content-md-center">
                            <Col lg="4">
                                <h5 className="inline-block">Your Stacks Wallet</h5>
                                <StxProfile
                                    stxAddress={stxAddresses.ownerStxAddress}
                                    updateStatus={updateStatus}
                                    showAddress
                                ></StxProfile>
                            </Col>
                            <Col lg="8">
                                <Row className="justify-content-md-center">
                                    <Col lg="12">
                                        <h5 className="mb-4-5">Your STX Loans</h5>
                                        <Row className="justify-content-md-center">
                                            <Col lg="6">
                                                    <StxProfile
                                                        stxAddress={stxAddresses.appStxAddress}
                                                        updateStatus={updateStatus}
                                                    ></StxProfile>

                                            </Col>
                                            <Col lg="6">


                                                    {/* <h5>Your Hold amount for Stacks Loands Hold tokens:</h5>*/}
                                                    <HoldTokenProfile
                                                        stxAddress={stxAddresses.ownerStxAddress}
                                                        updateStatus={updateStatus}
                                                    ></HoldTokenProfile>

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>


                </div>
            </Card>
        </React.Fragment>
    );
};
export default Profile;




