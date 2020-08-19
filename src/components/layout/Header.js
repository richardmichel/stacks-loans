import * as React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Navbar, Container, Nav, NavDropdown, Button, Modal} from 'react-bootstrap';

import {UserSession} from 'blockstack';
import {appConfig} from '@config/settings';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import MyLogo from '@assets/imgs/blockstack_logo.svg';

// store
import {AdminStore} from "@store/admin-store"
//actions
import {setLogout} from "@actions/actions";
import {Person} from "blockstack/lib";

const userSession = new UserSession({appConfig});
const {useContext, useState, useRef} = React;

export default function HeaderComponent() {

    const closeModal = useRef();

    const {state, dispatch} = useContext(AdminStore);
    const {currentUser} = state;
    const {profile, username} = state.userData;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const person = new Person(profile)

    const handleSignOut = _ => {
        handleClose();
        setLogout(dispatch);
        userSession.signUserOut(window.location.origin);
    };
    const showNavDropdown = _ => {
        return (
            <React.Fragment>
            <FontAwesomeIcon className="link-disabled-color" icon={faUser}/>
                <NavDropdown title={(person && person.name()) || username || 'User'} id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.4" onClick={() => handleShow()} >
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
                <Nav.Link eventKey="1"
                          as={NavLink}
                          to='/'
                          exact> {state.isAuth ? 'Home': 'DASHBOARD'}</Nav.Link>
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
                             defaultActiveKey="2">
                            {showMenu() }

                            <Nav.Item>
                                <Nav.Link eventKey={2}
                                          className="link-disabled-color"
                                          as={NavLink}
                                          to='/about' exact>ABOUT</Nav.Link>
                            </Nav.Item>

                        </Nav>
                        <Navbar>
                            {state.isAuth ? showNavDropdown() : ''}
                        </Navbar>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}  ref={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body> Log out? </Modal.Body>
                <Modal.Footer>

                    <Button variant="light" size="lg" onClick={handleSignOut}>
                        Yes
                    </Button>
                    <Button variant="primary" size="lg" onClick={handleClose} >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
