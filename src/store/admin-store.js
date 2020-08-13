import * as React from 'react';
import { initialState, reducer } from "@reducers/reducer";

export const AdminStore = React.createContext({} );
export function AdminStoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return  <AdminStore.Provider value={value}>{props.children}</AdminStore.Provider>
}