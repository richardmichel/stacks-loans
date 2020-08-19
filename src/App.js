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


    const createUser = async (userData) => {
        try {
            const response = await UserService.store({username: userData.username});
            if (response && response.status === 200) {
                const {post: user} = response.data.response;
                let newArray = [...state.users, user];
                dispatch({
                    type: "SET_USERS",
                    payload: newArray
                });
                dispatch({
                    type: "SET_CURRENT_USER",
                    payload: user
                });


            } else {
                console.log("error", response);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const getUsers = async (userData) => {
        try {
            const response = await UserService.all();
            if (response && response.status === 200) {
                const {response: users} = response.data;
                let currentUser = users.find(
                    user => user.username === userData.username
                );
                if (currentUser) {
                    dispatch({
                        type: "SET_CURRENT_USER",
                        payload: currentUser
                    });

                } else {
                    createUser(userData).catch((error) => {
                    });
                }


            } else {
                console.log("error", response);
            }

        } catch (error) {
            console.log("error", error);
        }

    };

    // redirectTo: '/',
    // //icon: window.location.origin + '/logo.svg',
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

        if (userSession.isSignInPending()) {

            userSession.handlePendingSignIn().then(userData => {
                setLogin(userData, dispatch);
                getUsers(userData).catch((error) => {
                });
            });
        } else if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            setLogin(userData, dispatch);
            getUsers(userData).catch((error) => {
            });
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
// <pre>{JSON.stringify(state, null, 2)}</pre>
