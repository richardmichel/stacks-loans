

import React from 'react';
import renderRoutes from '@utils/renderRoutes';
import HeaderComponent from '@components/layout/Header';




import Loader from '@components/ui/Loader';
import useDocumentTitle from "@utils/useDocumentTitle";
import {Container, Navbar} from "react-bootstrap";
// store
import {AdminStore} from "@store/admin-store"


const authed = false;
const authPath = '/';
const {useContext, useState} = React;

export default function AppRoot(props) {
    const {state, dispatch} = useContext(AdminStore);
    // set Title
    useDocumentTitle("Stacks Loans");
    return (
        <React.Fragment>
            <HeaderComponent/>
            <React.Suspense fallback={<Loader/>}>
                <section className={`${state.isAuth ? 'py-8' : 'py-12'}`}>
                    {renderRoutes(props.route.routes, authed, authPath)}
                </section>
            </React.Suspense>
        </React.Fragment>
    );

}