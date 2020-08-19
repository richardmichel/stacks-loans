
export const setLogin = async (payload, dispatch )  => {
    return dispatch({
        type: "LOGIN",
        payload: payload
    });
};
export const setLogout = async ( dispatch )  => {
    return dispatch({
        type: "LOGOUT"
    });
};