

export const initialState = {
    isAuth: false,
    user: {
        username : null
    },
    pathName: "/"
};

export const reducer = (state, action) => {

    console.log("action.type:", action.type);


    switch (action.type) {
        case "SET_PATH_NAME":
            return { ...state, pathName: action.payload };
         case 'LOGOUT':
            return { ...state, isAuth: false, user: null };
        case 'LOGIN':
            return { ...state, isAuth: true, user: action.payload };
        default:
            return state
    }


};