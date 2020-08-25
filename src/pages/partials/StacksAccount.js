import React from 'react';
import {
    createStacksPrivateKey,
    getPublicKey,
    addressFromPublicKeys,
    AddressVersion,
    AddressHashMode,
    StacksTestnet
} from '@blockstack/stacks-transactions';
//stxAddress sender
const STX_JSON_PATH = 'stacksloans.json';
export const NETWORK = new StacksTestnet();
NETWORK.coreApiUrl = 'https://sidecar.staging.blockstack.xyz';

export const CONTRACT_ADDRESS = 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8';
export const CONTRACT_NAME = 'escrowtwo';

const urlIcon = "https://stacks-loans.herokuapp.com/favicon.ico";
export const appDetails = {
    name: "Stacks Loans",
    icon: urlIcon,
};

export const STACK_API_URL = 'https://sidecar.staging.blockstack.xyz';
export const STACKS_API_ACCOUNTS_URL = `${STACK_API_URL}/v2/accounts`;

export function getStacksAccount(appPrivateKey) {
    const privateKey = createStacksPrivateKey(appPrivateKey);
    const publicKey = getPublicKey(privateKey);

    const address = addressFromPublicKeys(
        AddressVersion.TestnetSingleSig,
        AddressHashMode.SerializeP2PKH,
        1,
        [publicKey]
    );
    return {privateKey, address};
}



export function fetchAccount(addressAsString) {
    const balanceUrl = `${STACKS_API_ACCOUNTS_URL}/${addressAsString}`;
    return fetch(balanceUrl).then(r => {
        return r.json();
    });
}

export function txIdToStatus(txId) {
    return (
        <>
            Check transaction status:{' '}
            <a href={`https://testnet-explorer.blockstack.org/txid/0x${txId}`}>{txId}</a>
        </>
    );
}


export const getUserAddress = async (userSession, username) => {

    let options = {
        decrypt: false,
        username: username,
    };

    let data = {};

    try {

        const fileContents = await userSession.getFile(STX_JSON_PATH, options);
        if (fileContents) {
            console.log(fileContents);
            data = JSON.parse(fileContents);
            return data;
        } else {
             return false;

        }
    } catch (error) {
        return false;
    }

}


export function resultToStatus(result) {
    if (result && result.startsWith('"') && result.length === 66) {
        const txId = result.substr(1, 64);
        txIdToStatus(txId);
    } else {
        return result;
    }
}
// Gaia

function afterSTXAddressPublished() {
    stxAddressSemaphore.putting = false;
}
const stxAddressSemaphore = {putting: false};
export const putStxAddress = (userSession, address) => {
    if (!stxAddressSemaphore.putting) {
        stxAddressSemaphore.putting = true;
        const options  = {address: address};
        console.log("options", options);
        userSession
            .putFile(STX_JSON_PATH, JSON.stringify(options), {
                encrypt: false,
            })
            .then(() => afterSTXAddressPublished())
            .catch(r => {
                console.log(r);
                console.log('STX address NOT published, retrying');
                userSession.getFile(STX_JSON_PATH, {decrypt: false}).then(s => {
                    console.log({s});
                    userSession
                        .putFile(STX_JSON_PATH, JSON.stringify({address}), {
                            encrypt: false,
                        })
                        .then(() => afterSTXAddressPublished())
                        .catch(r => {
                            console.log('STX address NOT published');
                            console.log(r);
                            stxAddressSemaphore.putting = false;
                        });
                });
            });
    }
}




