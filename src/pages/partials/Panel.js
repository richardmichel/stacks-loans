import React from 'react';

import { getStacksAccount } from "@pages/partials/StacksAccount";
import { addressToString } from '@blockstack/stacks-transactions';

// store
import {AdminStore} from "@store/admin-store";
import {BuyTokens} from "@pages/partials/BuyTokens";
import {Col, Row} from "react-bootstrap";

const {useContext} = React;

//import { UnHodlButton } from '../UnHodlButton';
//import { HodlButton } from '../HodlButton';
//import { BuyHodlTokensButton } from '../BuyHodlTokensButton';

export default function Panel() {
    //const { userData } = useBlockstack();
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
                {/*
                <div className="col-xs-10 col-md-8 mx-auto px-4">
                    <h1 className="card-title pt-4">Hodl</h1>
                </div>
                <div className="col-xs-10 col-md-8 mx-auto px-4">
                    <BuyHodlTokensButton

                    />
                    <HodlButton
                        placeholder="amount"
                        ownerStxAddress={ownerStxAddress}
                        appStxAddress={appStxAddress}
                    />
                    <UnHodlButton placeholder="amount" ownerStxAddress={ownerStxAddress} />
                </div>
                */}

                </Col>
            </Row>
        </React.Fragment>
    );
}
