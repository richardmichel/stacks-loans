import React from 'react';
import {
  createStacksPrivateKey,
  getPublicKey,
  addressFromPublicKeys,
  AddressVersion,
  AddressHashMode,
  StacksTestnet,
  deserializeCV,
  serializeCV
} from '@blockstack/stacks-transactions';


import { standardPrincipalCV } from '@blockstack/stacks-transactions';
//stxAddress senderconst STX_JSON_PATH = 'stx_stacks_loans.json';
export const NETWORK = new StacksTestnet();
NETWORK.coreApiUrl = 'https://sidecar.staging.blockstack.xyz';

export const CONTRACT_ADDRESS = 'ST2R1XSFXYHCSFE426HP45TTD8ZWV9XHX2SRP3XA8';
export const CONTRACT_NAME = 'my-counter';
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
  return { privateKey, address };
}

export function fetchHodlTokenBalance(sender) {
    let url =`${NETWORK.coreApiUrl}/v2/contracts/call-read/${CONTRACT_ADDRESS}/contract2-stacks-loans/hodl-balance-of`;
    let t = serializeCV(new standardPrincipalCV(sender));
    let  converted = "0x".concat(t.toString("hex"));
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
            console.log({ hodlBalanceOf });
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
        console.log({ r });
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


/*
export async function getUserAddress(userSession, username) {
  return userSession
    .getFile(STX_JSON_PATH, {
      decrypt: false,
      username: username,
    })
    .then(r => JSON.parse(r))
    .catch(e => console.log(e, username));
}



export function resultToStatus(result) {
  if (result && result.startsWith('"') && result.length === 66) {
    const txId = result.substr(1, 64);
    txIdToStatus(txId);
  } else {
    return result;
  }
}



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


