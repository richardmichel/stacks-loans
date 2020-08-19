import * as React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import { getStacksAccount } from '@pages/partials/StacksAccount';
//
import { addressToString } from '@blockstack/stacks-transactions';
// store
import {AdminStore} from "@store/admin-store";
//

import Profile from "@pages/partials/Profile";

const {useContext, useState, useEffect} = React;

function DashBoard() {
    const {state} = useContext(AdminStore);
    const { currentUser, userData} = state;
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
                <Row className="justify-content-md-center bg-white py-10 shadow-md-bottom">
                    <Col lg="6">
                        <div className="hello">
                            <h2>Hello {currentUser.username} !</h2>

                        </div>
                    </Col>
                </Row>


            </Container>
        </React.Fragment>
    )
}

export default DashBoard;