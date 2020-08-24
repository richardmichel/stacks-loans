import * as React from 'react';
import { Row, Col, Container, Tabs, Tab} from 'react-bootstrap';
import { getStacksAccount } from '@pages/partials/StacksAccount';
//
import {
    addressFromPublicKeys,
    AddressHashMode,
    addressToString,
    AddressVersion,
    getPublicKey,
    addressFromHashMode
} from '@blockstack/stacks-transactions';
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
    console.log("addressaddressaddressaddressaddressaddressaddress:", address);///160
    console.log("userData:", userData);
    const ownerStxAddress = userData.profile.stxAddress;
    //const address2 = addressToString();
   // console.log("address22:", address2);


        const selectedUserPublicKey = userData.profile.appsMeta["https://testnet-explorer.blockstack.org"].publicKey;
        console.log("selectedUserPublicKey", selectedUserPublicKey);

    // "0254eff4e6b7df994d352fe6612d06773d4d5d070f1f473696cb26c1aafd63033f"
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
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default DashBoard;