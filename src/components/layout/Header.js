
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom'


import MyLogo from '@assets/imgs/blockstack_logo.svg';

// others components
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
//import { useHistory } from "react-router-dom";


// store
import {AdminStore} from "@store/admin-store"

//actions
import { setLogout} from "@actions/actions";


//blockstack  connect
import {UserSession} from 'blockstack';
import {appConfig} from '@config/settings';
const userSession = new UserSession({appConfig});

const { useContext} = React;
export default function HeaderComponent() {

    //const history = useHistory();
    const [t] = useTranslation();
    const {state, dispatch} = useContext(AdminStore);
    const {user} = state;



   // const toRedirect = (path) => {
    //    history.push(path);
   // };

    const handleSignOut = _ => {
        console.log("handleSignOut");
        setLogout( dispatch );
        userSession.signUserOut(window.location.origin);
    }
    const showNavDropdown = _ =>{
        return (<NavDropdown title={user.username} id="nav-dropdown">
            <NavDropdown.Item eventKey="4.4"  onClick={()=>handleSignOut()} >
                SignOut
            </NavDropdown.Item>
        </NavDropdown>);
    }

    return (

        <Navbar fixed="top" expand="lg" bg={state.isAuth ? 'dark' : 'light'}  variant={state.isAuth ? 'dark' : 'light'} >
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <img
                        src={MyLogo}
                        id="logo"
                        alt="Logo"
                    />
                    <span>
                     {t('app_name')}
                    </span>


                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse className="justify-content-end">
                    <Nav
                         activeKey="/home">
                        <Nav.Link  eventKey="home" as={NavLink} to='/' exact>Features</Nav.Link>
                        <Nav.Link eventKey="dashboard" as={NavLink} to='/dashboard' >Pricing</Nav.Link>
                        { state.isAuth ? showNavDropdown() :''}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
