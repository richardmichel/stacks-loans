import React from 'react';
import {
    createStacksPrivateKey,
    getPublicKey,
    addressFromPublicKeys,
    AddressVersion,
    AddressHashMode,
    StacksTestnet,
    deserializeCV,
    serializeCV,
    addressToString
} from '@blockstack/stacks-transactions';

import {standardPrincipalCV} from '@blockstack/stacks-transactions';

//stxAddress sender
const STX_JSON_PATH = 'stacksloans.json';
export const NETWORK = new StacksTestnet();
NETWORK.coreApiUrl = 'https://sidecar.staging.blockstack.xyz';

export const CONTRACT_ADDRESS = 'ST0EE1X0X7PHZHEE0A2N845FT568G0VMK4QX01XK';
export const CONTRACT_NAME = 'my-contract-stacks-loans';
export const PRIVATE_KEY = '67e885b4a73009361a9537ef00c4257fc6fbb1bee79dda3015c87e0b41089d6a01';

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

export function fetchHodlTokenBalance(sender) {
    //https://sidecar.staging.blockstack.xyz/v2/contracts/call-read/{stacks_address}/{contract_name}/{function_name}
    let functionName = 'hodl-balance-of';
    let url = `${NETWORK.coreApiUrl}/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/${functionName}`;

    let t = serializeCV(new standardPrincipalCV(sender));
    let converted = "0x".concat(t.toString("hex"));
    return fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: `{"sender":"${sender}","arguments":["${converted}"]}`,
        }
    )
        .then(response => response.json())
        .then(hodlBalanceOf => {
            console.log({hodlBalanceOf});
            if (hodlBalanceOf.okay) {
                const cv = deserializeCV(Buffer.from(hodlBalanceOf.result.substr(2), 'hex'));
                if (cv.value) {
                    return cv.value;
                } else {
                    return undefined;
                }
            }
        });

}

export function fetchAccount(addressAsString) {
    const balanceUrl = `${STACKS_API_ACCOUNTS_URL}/${addressAsString}`;
    return fetch(balanceUrl).then(r => {
        console.log({r});
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
    console.log("getUserAddress userSession:", userSession);
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
        console.log("getUserAddress: ", error);
        console.log("getUserAddress username: ", username);
        return false;
    }

  /*  return userSession
        .getFile(STX_JSON_PATH, {
            decrypt: false,
            username: username,
        })
        .then(r => {
            console.log("rrrr:", r);
            JSON.parse(r)
        })
        .catch(e => {
            console.log("getUserAddress: ", e);
            console.log("getUserAddress username: ", username);
        });*/
}


export function resultToStatus(result) {
    if (result && result.startsWith('"') && result.length === 66) {
        const txId = result.substr(1, 64);
        txIdToStatus(txId);
    } else {
        return result;
    }
}

/*
export function fetchJackpot(sender) {
  return fetch(
    `${NETWORK.coreApiUrl}/v2/contracts/call-read/${CONTRACT_ADDRESS}/flip-coin-jackpot/get-jackpot`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{"sender":"${sender}","arguments":[]}`,
    }
  )
    .then(response => response.json())
    .then(getJackpot => {
      console.log({ getJackpot });
      if (getJackpot.okay) {
        const cv = deserializeCV(Buffer.from(getJackpot.result.substr(2), 'hex'));
        if (cv.value) {
          return cv.value;
        } else {
          return undefined;
        }
      }
    });
}*/

// Gaia

function afterSTXAddressPublished() {
    console.log('STX address published');
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




