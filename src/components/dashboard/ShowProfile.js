import * as React from 'react';

//blockstack  connect
import {Person} from 'blockstack';

const {useEffect} = React;

function ShowProfile(props) {


    useEffect(() => {
        showProfile(props.profile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showProfile = (profile) => {
        const person = new Person(profile)
        console.log("person name:", person.name());
        console.log("person avatarUrl:", person.avatarUrl());

    }

    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default ShowProfile;