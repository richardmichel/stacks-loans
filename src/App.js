import * as React from "react";
// tools
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";

//blockstack  connect
import { Connect } from "@blockstack/connect";

//settings
import routes from "@route/routes";

// store
import { AdminStore } from "@store/admin-store";
//actions
import { setLogin } from "@actions/actions";
import {appDetails} from "@pages/partials/StacksAccount";
import {addressToString} from "@blockstack/stacks-transactions";
import {getStacksAccount, putStxAddress} from "./pages/partials/StacksAccount";
const { useContext, useEffect } = React;
//const authOrigin = 'https://deploy-preview-301--stacks-authenticator.netlify.app';

export default function App(props) {
  const { state, dispatch } = useContext(AdminStore);
  const { userSession } = state;

  const authOptions = {
    redirectTo: "/",
    finished: ({ userSession }) => {
      const userData = userSession.loadUserData();
      console.log("userData:", userData);
      setLogin(userData, dispatch);
      const { address } = getStacksAccount(userData.appPrivateKey);
      putStxAddress(userSession, addressToString(address));

      console.log("putStxAddress addressToString :", address);
      //document.location = '/';
    },
    userSession,
    appDetails
  };

  useEffect(() => {
    document.title = "Stacks Loans";

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setLogin(userData, dispatch);
      });
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setLogin(userData, dispatch);
    }

    return () => {};
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
