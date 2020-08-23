import * as React from 'react';
import { Row, Col, Container, Tabs, Tab} from 'react-bootstrap';
import { getStacksAccount } from '@pages/partials/StacksAccount';
//
import { addressToString } from '@blockstack/stacks-transactions';
// store
import {AdminStore} from "@store/admin-store";
//

import Profile from "@pages/partials/Profile";
import Panel from "@pages/partials/Panel";
import SpendField from "@pages/partials/SpendField";


const {useContext, useEffect} = React;

function DashBoard() {
    const {state} = useContext(AdminStore);
    const {  userData} = state;
    const decentralizedID = userData.decentralizedID;
    const { address } = getStacksAccount(userData.appPrivateKey);
    const appStxAddress = addressToString(address);
    const ownerStxAddress = userData.profile.stxAddress;

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Container>
                <Row className="justify-content-md-center bg-white py-8 shadow-md-bottom">
                    <Col lg="12">
                        <Tabs defaultActiveKey="profile" transition={false} id="noanim-tab-example">
                            <Tab eventKey="profile" title="Loans">
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
                            <Tab eventKey="SpendField" title="SpendField">
                                <SpendField/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default DashBoard;