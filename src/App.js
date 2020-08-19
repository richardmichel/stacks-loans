import * as React from 'react';
// tools
import {BrowserRouter as Router} from "react-router-dom";
import {renderRoutes} from 'react-router-config';

//blockstack  connect
import {Connect} from '@blockstack/connect';

//settings
import routes from '@route/routes';

// store
import {AdminStore} from "@store/admin-store";
//actions
import {setLogin} from "@actions/actions";

// services
import {ServiceFactory} from '@services/ServiceFactory';
const UserService = ServiceFactory.get('user');


const urlIcon = 'http://oflisback.github.io/react-favicon/public/img/github.ico';
const {useContext, useEffect} = React;


export default function App(props) {

    const {state, dispatch} = useContext(AdminStore);
    const {userSession} = state;

    const authOptions = {

        finished: ({userSession}) => {
            const userData = userSession.loadUserData();
            setLogin(userData, dispatch);

        },
        userSession,
        appDetails: {
            name: 'Stacks Loans',
            icon: urlIcon,
        },

    };


    useEffect(() => {
        document.title = "Stacks Loans";

        if (userSession.isSignInPending()) {

            userSession.handlePendingSignIn().then(userData => {
                setLogin(userData, dispatch);
            });
        } else if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            setLogin(userData, dispatch);
        }

        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Connect authOptions={authOptions}>
            <Router>
                {renderRoutes(routes)}
                {props.children}
            </Router>
        </Connect>
    );
}
