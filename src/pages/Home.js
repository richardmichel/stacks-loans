import * as React from 'react';
import LandingPage from '@pages/LandingPage';
import DashBoard from '@pages/DashBoard';
// store
import {AdminStore} from "@store/admin-store"
const {useContext} = React;

function Home(props) {
    const {state} = useContext(AdminStore);
    return (
        <React.Fragment>
            {state.isAuth ? <DashBoard/> : <LandingPage/>}
        </React.Fragment>
    )
}

export default Home;