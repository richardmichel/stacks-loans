import * as React from "react";
import {Card, Button, Row, Col, Container, Image, ProgressBar, Form} from 'react-bootstrap';
import {
    makeSTXTokenTransfer,
    privateKeyToString,
    addressToString,
    broadcastTransaction,
} from '@blockstack/stacks-transactions';

import {
    getUserAddress,
    getStacksAccount,
    fetchAccount,
    NETWORK,
    resultToStatus,
    putStxAddress
} from '@pages/partials/StacksAccount';
// store
import { AdminStore } from "@store/admin-store";
import DashBoard from "../DashBoard";
const {useContext, useEffect, useRef, useState} = React;
const BigNum = require('bn.js');

function SpendField() {
    const {state, dispatch} = useContext(AdminStore);
    const {userSession, userData} = state;

    const textfield = useRef();
    const spinner = useRef();
    const [status, setStatus] = useState();
    const [account, setAccount] = useState();
    const [identity, setIdentity] = useState();

    const deleteFile = _ => {
        userSession.deleteFile('stacksloans.json').then(() => {
            // user.json is now removed.
            console.log("user.json is now removed.");
        });
    };


    useEffect(() => {

        const appPrivateKey = userData.appPrivateKey;
        const id = getStacksAccount(appPrivateKey);
        const addrAsString = addressToString(id.address);
        setIdentity(id);
        fetchAccount(addrAsString)
            .catch(e => {
                setStatus('Failed to access your account', e);
                console.log(e);
            })
            .then(async acc => {
                setAccount(acc);
                console.log("acc:",{acc});
                console.log("userSession:",userSession);
                console.log("userSession:",userData.username);

               const address = await getUserAddress(userSession, userData.username);
                console.log("address:", address);

                console.log("fin");
                if (!address) {
                    console.log("!address");
                    await putStxAddress(userSession, addrAsString);
                }
            });
    }, [userSession]);

    const sendAction = async () => {
        console.log("sendAction");
        spinner.current.classList.remove('d-none');

        var username = textfield.current.value.trim();
        var usernameString = username;
        if (username.indexOf('.') < 0) {
            usernameString = `${username} (${username}.id.blockstack)`;
            username = `${username}.id.blockstack`;
        }

        // check recipient
        console.log("getUserAddress",userSession,usernameString, username);
        const recipient = await getUserAddress(userSession, username);
        console.log("recipient");
        if (!recipient) {
            setStatus(`Recipient ${usernameString} has not yet used the app`);
            spinner.current.classList.add('d-none');
            return;
        }

        // check balance
        console.log("fetchAccount");
        const acc = await fetchAccount(addressToString(identity.address));
        const balance = acc ? parseInt(acc.balance, 16) : 0;
        if (balance < 1000) {
            setStatus('Your balance is below 1000 uSTX');
            spinner.current.classList.add('d-none');
            return;
        }

        console.log('STX address of recipient ' + recipient.address);
        try {
            const transaction = await makeSTXTokenTransfer({
                recipient: recipient.address,
                amount: new BigNum(1000),
                senderKey: privateKeyToString(identity.privateKey),
                network: NETWORK,
            });
            setStatus(`Sending transaction`);

            const result = await broadcastTransaction(transaction, NETWORK);
            console.log(result);
            spinner.current.classList.add('d-none');
            setStatus(resultToStatus(result));
        } catch (e) {
            console.log(e);
            setStatus(e.toString());
            spinner.current.classList.add('d-none');
        }
    };

    return (
        <div>
            Send Test STXs (from your app Stacks address)

            <Button variant="primary" type="button" onClick={(e) => deleteFile(e)}>
                <strong>deleteFile </strong>
            </Button>

            <div className="NoteField input-group ">
                <div className="input-group-prepend">
                    <span className="input-group-text"> title</span>
                </div>
                <input
                    type="text"
                    ref={textfield}
                    className="form-control"
                    defaultValue={''}
                    placeholder="placeholder"
                    disabled={!account}
                    onKeyUp={e => {
                        if (e.key === 'Enter') sendAction();
                    }}
                    onBlur={e => {
                        setStatus(undefined);
                    }}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={sendAction}>
                        <div
                            ref={spinner}
                            role="status"
                            className="d-none spinner-border spinner-border-sm text-info align-text-top mr-2"
                        />
                        Send
                    </button>
                </div>
            </div>
            {status && (
                <>
                    <div>{status}</div>
                </>
            )}
        </div>
    );
}

export default SpendField;