

export const setLogin = async (payload, dispatch )  => {

    //localStorage.setItem('stacks-loans-token', JSON.stringify(payload))

    console.log("setLogin");
    return dispatch({
        type: "LOGIN",
        payload: payload
    });
};

export const setLogout = async ( dispatch )  => {
    //localStorage.removeItem('stacks-loans-token');
    return dispatch({
        type: "LOGOUT"
    });
};