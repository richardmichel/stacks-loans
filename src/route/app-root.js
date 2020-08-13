

import React from 'react';
import renderRoutes from '@utils/renderRoutes';
import HeaderComponent from '@components/layout/Header';




import Loader from '@components/ui/Loader';
import useDocumentTitle from "@utils/useDocumentTitle";
import Container from "react-bootstrap/Container";

const authed = false;
const authPath = '/';
export default function AppRoot(props) {

    // set Title
    useDocumentTitle("Stacks Loans");
    return (
        <React.Fragment>
            <HeaderComponent/>
            <React.Suspense fallback={<Loader/>}>
                <section className="py-12">
                    <Container>
                    {renderRoutes(props.route.routes, authed, authPath)}
                    </Container>
                </section>
            </React.Suspense>
        </React.Fragment>
    );

}