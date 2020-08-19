import * as React from 'react';
import {Button, Row, Col, Container, Tabs, Tab, Badge} from 'react-bootstrap';
import { getStacksAccount } from '@pages/partials/StacksAccount';
//
import { addressToString } from '@blockstack/stacks-transactions';
// store
import {AdminStore} from "@store/admin-store";
//

import Profile from "@pages/partials/Profile";
import Panel from "@pages/partials/Panel";

const {useContext, useState, useEffect} = React;

function DashBoard() {
    const {state} = useContext(AdminStore);
    const { currentUser, userData} = state;
    const {profile, username} = userData;
    const decentralizedID = userData.decentralizedID;


    const { address } = getStacksAccount(userData.appPrivateKey);
    const appStxAddress = addressToString(address);
    const ownerStxAddress = userData.profile.stxAddress;

    useEffect(()=>{
       console.log("userData:", userData);
        console.log("address:", address);
        console.log("appStxAddress:", appStxAddress);

    }, []);

    return (
        <React.Fragment>
            <Container>
                <Row className="justify-content-md-center bg-white py-8 shadow-md-bottom">
                    <Col lg="12">



                        <Tabs defaultActiveKey="profile" transition={false} id="noanim-tab-example">
                            <Tab eventKey="profile" title="Profile">
                                <Profile
                                    stxAddresses={{
                                        appStxAddress: appStxAddress,
                                        ownerStxAddress: ownerStxAddress
                                    }}
                                    userData={userData}
                                />
                            </Tab>
                            <Tab eventKey="buy" title="Request loan">
                                <Panel/>
                            </Tab>

                        </Tabs>


                    </Col>
                </Row>


            </Container>
        </React.Fragment>
    )
}

export default DashBoard;