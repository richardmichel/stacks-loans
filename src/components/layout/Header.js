import * as React from 'react';
import {Link, NavLink} from 'react-router-dom'


import MyLogo from '@assets/imgs/blockstack_logo.svg';
import ShowProfile from '@components/dashboard/ShowProfile';
// others components
import {Navbar, Container, Nav, NavDropdown, Button, Modal} from 'react-bootstrap';
//import {useTranslation} from 'react-i18next';
//import { useHistory } from "react-router-dom";

// store
import {AdminStore} from "@store/admin-store"

//actions
import {setLogout} from "@actions/actions";


//blockstack  connect
import {UserSession} from 'blockstack';
import {appConfig} from '@config/settings';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

const userSession = new UserSession({appConfig});
const {useContext, useState} = React;
export default function HeaderComponent() {

    //const history = useHistory();
   // const [t] = useTranslation();
    const {state, dispatch} = useContext(AdminStore);
    const {user} = state;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const toRedirect = (path) => {
    //    history.push(path);
    // };

    const handleSignOut = _ => {
        setLogout(dispatch);
        userSession.signUserOut(window.location.origin);
    }
    const showNavDropdown = _ => {
        return (
            <React.Fragment>
            <FontAwesomeIcon className="link-disabled-color" icon={faUser}/>
                <ShowProfile  {...user} />
                <NavDropdown title={user.username} id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.4" onClick={() => handleSignOut()}>
                        SignOut
                    </NavDropdown.Item>
                </NavDropdown>
            </React.Fragment>
        );
    }
    const showMenu = _ => {
        return (
            <React.Fragment>
                <Nav.Item>
                <Nav.Link eventKey="/"
                          as={NavLink}
                          to='/'>DASHBOARD</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                <Nav.Link eventKey="home"
                          className="link-disabled-color"
                          as={NavLink}
                          to='/' exact>EXCHANGE</Nav.Link>
                </Nav.Item>
            </React.Fragment>
        );
    }


    return (
        <React.Fragment>
            <Navbar fixed="top"
                    expand="lg"
                    className={`pt-0 ${!state.isAuth ? 'bg-white' : ''}`}
                    variant="primary">
                <Container className={`bg-white ${state.isAuth ? 'shadow-md-up' : ''}`}>
                    <Navbar.Brand as={Link}
                                  to='/'
                                  className="py-3">
                        <img
                            src={MyLogo}
                            id="logo"
                            alt="Logo"
                        />
                        <span>

                    </span>


                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>



                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto link-border-left"
                             activeKey="/">
                            {state.isAuth ? showMenu() : '' }
                            <Nav.Item>
                                <Nav.Link eventKey="BANK"
                                          className="link-disabled-color"
                                          as={NavLink}
                                          to='/' exact>BANK</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="AFFILIATE"
                                          className="link-disabled-color"
                                          as={NavLink}
                                          to='/' exact>AFFILIATE</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="ABOUT"
                                          className="link-disabled-color"
                                          as={NavLink}
                                          to='/' exact>ABOUT</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        <Navbar>
                            {state.isAuth ? showNavDropdown() : ''}

                            {
                                /*
                                 <Button variant="primary" onClick={handleShow}>
                                Launch demo modal
                            </Button>
                                 */
                            }
                        </Navbar>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
