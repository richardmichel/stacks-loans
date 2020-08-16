import * as React from 'react';

import {Card, Button, Row, Col, Container, Image, ProgressBar} from 'react-bootstrap';
import BlockStackIcon from '@assets/imgs/blockstack-icon.png';
// store
import {AdminStore} from "@store/admin-store";

const {useContext, useState} = React;

const useExample = _ =>{

};


function DashBoard() {

    const {  superhero, setSuperHero } = useState("");// I'M NEW coming from form input
    const {  gaiaUser, setGaiaUser } = useState("");// I'M NEW coming from Gaia Storage
    const {  crush, setCrush } = useState("");// I'M NEW coming from form input

    const {state, dispatch} = useContext(AdminStore);
    const { userSession,currentUser } = state;

    /*

    // I'M NEW
    const changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // I'M NEW, standard fetch method
    const submitHandler = e => {
       // const { superhero, currentUser } = this.state;
       // e.preventDefault();

        // be sure to add the superhero attribute to the backend
        fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                superhero
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ currentUser: data });
                console.log("API", data); // see that the data transferred
            });
    };

    // I'M NEW, putFile is a method provided by the Blockstack library
    const submitGaiaHandler = e => {
       // const { userSession, crush } = this.state;
        const user = { crush: crush };
        let options = { encrypt: true };

        e.preventDefault();

        // encrypt and securely send your secret crush to Gaia Storage
        userSession
            .putFile("user.json", JSON.stringify(user), options)
            .then(data => {
                this.setState({ gaiaUser: user });
                console.log("Gaia Storage", data); // see that the data is encrypted
            });

        // note that at this time, Blockstack only allows PUT but not PATCH
        // you are replacing the entire gaiaUser object
    };
    */


    return (
        <React.Fragment>
            <Container>

                <div className="bg-white py-4 my-first-dashboard shadow-md-bottom"
                     style={{marginLeft: '-1rem', marginRight: '-1rem',padding: '1rem'}}>
                    <Row className="justify-content-md-center">
                        <Col lg="4" className="link-border-right">
                            <p className="color-minimal-purple font-weight-bold">
                                BALANCE DETAILS
                            </p>
                            <h1 className="color-blank">$2,180,022.00</h1>
                            <small className="color-light-purple">3.3014 STX</small>
                            <br/>
                            <Row className="justify-content-md-center">
                                <Col >
                                    <Button  variant="info"
                                             className="color-white"
                                             size="sm" block>
                                        RECEIVE
                                    </Button>
                                </Col>
                                <Col >
                                    <Button  variant="primary"
                                             size="sm"
                                             block>
                                        SEND
                                    </Button>
                                </Col>
                            </Row>





                        </Col>
                        <Col lg="4">
                            <p className="color-minimal-purple font-weight-bold">
                                BALANCE DETAILS
                            </p>
                            <h1 className="color-blank">$180,022.00</h1>
                            <small className="color-light-purple">3.3014 STX</small>
                        </Col>
                        <Col lg="4">

                        </Col>
                    </Row>
                </div>

                <p className="mt-5 color-minimal-purple font-weight-bold">
                    WALLETS
                </p>
                <Row className="mt-5" noGutters={true}>
                    <Col lg="8">
                        <Row className="" noGutters={false}>
                            <Col lg="3">
                                <Card
                                    text="light"
                                    className="sampleBox sampleBox-one">
                                    <Card.Body>
                                        <Image src={BlockStackIcon}
                                               style={{width: '50px'}}
                                        />
                                        <Card.Title>
                                            STX
                                        </Card.Title>
                                        <Card.Text className="sampleBox-footer">
                                            <span className="title">$3,254.00</span>
                                            <small>4.12 STX</small>
                                        </Card.Text>
                                    </Card.Body>


                                </Card>
                            </Col>
                            <Col lg="3">
                                <Card
                                    text="light"
                                    className="sampleBox sampleBox-two">
                                    <Card.Body>
                                        <Image src={BlockStackIcon}
                                               style={{width: '50px'}}
                                        />
                                        <Card.Title>
                                            STX
                                        </Card.Title>
                                        <Card.Text className="sampleBox-footer">
                                            <span className="title">$3,254.00</span>
                                            <small>4.12 STX</small>
                                        </Card.Text>
                                    </Card.Body>

                                </Card>
                            </Col>
                            <Col lg="3">
                                <Card
                                    text="light"
                                    className="sampleBox sampleBox-three">
                                    <Card.Body>
                                        <Image src={BlockStackIcon}
                                               style={{width: '50px'}}
                                        />
                                        <Card.Title>
                                            STX
                                        </Card.Title>
                                        <Card.Text className="sampleBox-footer">
                                            <span className="title">$3,254.00</span>
                                            <small>4.12 STX</small>
                                        </Card.Text>
                                    </Card.Body>

                                </Card>
                            </Col>
                            <Col lg="3">
                                <Card
                                    text="light"
                                    className="sampleBox sampleBox-four">
                                    <Card.Body>
                                        <Image src={BlockStackIcon}
                                               style={{width: '50px'}}
                                        />
                                        <Card.Title>
                                            STX
                                        </Card.Title>
                                        <Card.Text className="sampleBox-footer">
                                            <span className="title">$3,254.00</span>
                                            <small>4.12 STX</small>
                                        </Card.Text>
                                    </Card.Body>

                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="1">
                    </Col>

                    <Col lg="3">
                        <Card
                            text="light"
                            className="sampleBox border-0 shadow-sm"
                            style={{height: '8rem'}}
                            >
                            <Card.Body>
                                <Card.Text>
                                    <span className="title color-blank">0.069%</span>
                                    <small className="color-light-purple">maker</small>
                                </Card.Text>
                                <ProgressBar variant="info" now={20} />
                            </Card.Body>

                        </Card>


                    </Col>
                </Row>

            </Container>
        </React.Fragment>
    )
}

export default DashBoard;