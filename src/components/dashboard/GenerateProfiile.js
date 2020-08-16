import * as React from 'react';
import {makeECPrivateKey, wrapProfileToken, Person} from 'blockstack';

const profileOfNaval = {
    '@context': 'http://schema.org/',
    '@type': 'Person',
    name: 'Naval Ravikant',
    description: 'Co-founder of AngelList',
};

/*
 * Sign a profile as a single token
 */
const privateKey = makeECPrivateKey();

const person = new Person(profileOfNaval);
const token = person.toToken(privateKey);
const tokenFile = [wrapProfileToken(token)];

/*
* Verify an individual token
 */

import { verifyProfileToken } from 'blockstack';

try {
    const decodedToken = verifyProfileToken(tokenFile[0].token, publicKey);
} catch (e) {
    console.log(e);
}

/*
*  Recover a profile from a token file
*/
const recoveredProfile = Person.fromToken(tokenFile, publicKey);


/*
*   Validate profile schema
*/

const validationResults = Person.validateSchema(recoveredProfile);

function GenerateProfile() {

    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default GenerateProfile;