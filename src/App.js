
import * as React from 'react';

// tools
import {BrowserRouter as Router} from "react-router-dom";

import {renderRoutes} from 'react-router-config';

//blockstack  connect
//import {UserSession} from 'blockstack';
import {Connect} from '@blockstack/connect';

//settings
//import {appConfig} from '@config/settings';
import routes from '@route/routes';

// store
import {AdminStore} from "@store/admin-store";
//actions
import {setLogin} from "@actions/actions";

//const userSession = new UserSession({appConfig});
const urlIcon = 'http://oflisback.github.io/react-favicon/public/img/github.ico';
const {useContext, useEffect} = React;


export default function App(props) {

    const {state, dispatch} = useContext(AdminStore);
    const { userSession } = state;

    const authOptions = {
        redirectTo: '/',
        finished: ({userSession}) => {
            const userData = userSession.loadUserData();
            setLogin(userData, dispatch);

        },
        userSession,
        appDetails: {
            name: 'Stacks Loans',
            icon: urlIcon,
        },
        // //icon: window.location.origin + '/logo.svg',
    };


    useEffect(() => {

        if (userSession.isSignInPending()) {

            userSession.handlePendingSignIn().then( userData => {
                console.log("if window.history.replaceState:", userData);
               setLogin(userData, dispatch);
             });
        } else if (userSession.isUserSignedIn()) {

            // this.setState({ userData: userSession.loadUserData() });
            const userData = userSession.loadUserData();
            console.log("else if userSession.loadUserData()", userData);
              setLogin(userData, dispatch);

        }

        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <Connect authOptions={authOptions}>
            <Router >
                {renderRoutes(routes)}
                {props.children}
            </Router>
        </Connect>
    );
}
// <pre>{JSON.stringify(state, null, 2)}</pre>
