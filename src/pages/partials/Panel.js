import React from 'react';
import { getStacksAccount } from "@pages/partials/StacksAccount";
import { addressToString } from '@blockstack/stacks-transactions';
// store
import {AdminStore} from "@store/admin-store";
import {BuyTokens} from "@pages/partials/BuyTokens";
import {Col, Row} from "react-bootstrap";
const {useContext} = React;

export default function Panel() {

    const {state} = useContext(AdminStore);
    const {  userData} = state;

    const { address } = getStacksAccount(userData.appPrivateKey);
    const appStxAddress = addressToString(address);
    const ownerStxAddress = userData.profile.stxAddress;
    return (
        <React.Fragment>
            <Row className="justify-content-md-center p-5">
                <Col lg="8">
                <BuyTokens placeholder="amount"
                           ownerStxAddress={ownerStxAddress}
                           appStxAddress={appStxAddress}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}
