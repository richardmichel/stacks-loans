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
                            <Alert variant="danger">
                                <Alert.Heading>Oh snap!</Alert.Heading>
                                {status}
                            </Alert>
                            <br/>
                        </React.Fragment>
                    )}

                    <div className="pt-4 title ">
                        <h5 className="inline-block">Your own Stacks address:</h5>
                        <StxProfile
                            stxAddress={stxAddresses.ownerStxAddress}
                            updateStatus={updateStatus}
                            showAddress
                        ></StxProfile>
                    </div>

                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <div className="pt-4">
                                <h5>Your Hodl amount for Stacks Loans:</h5>
                                <br/>
                                <StxProfile
                                    stxAddress={stxAddresses.appStxAddress}
                                    updateStatus={updateStatus}
                                ></StxProfile>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="pt-4">
                                <h5>Your Hold amount for Stacks Loands Hold tokens:</h5>
                                <br/>
                                <HoldTokenProfile
                                    stxAddress={stxAddresses.ownerStxAddress}
                                    updateStatus={updateStatus}
                                ></HoldTokenProfile>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </React.Fragment>
    );
};
export default Profile;




