//blockstack  connect
import {UserSession} from 'blockstack';
//settings
import {appConfig} from '@config/settings';

export const initialState = {
    isAuth: false,
    user: {},
    pathName: "/",
    userSession: new UserSession({ appConfig }),
    userData: {}, // coming from Blockstack
    currentUser: {}, // coming from your API
};

export const reducer = (state, action) => {

    console.log("action.type:", action.type);


    switch (action.type) {
        case "SET_PATH_NAME":
            return { ...state, pathName: action.payload };
         case 'LOGOUT':
            return { ...state, isAuth: false, user: null };
        case 'LOGIN':
            return { ...state, isAuth: true, user: action.payload, userData: action.payload };
        default:
            return state
    }


};
