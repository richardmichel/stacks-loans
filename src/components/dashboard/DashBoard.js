import * as React from 'react';

import {Card, Button, Row, Col, Container, Image, ProgressBar} from 'react-bootstrap';
import BlockStackIcon from '@assets/imgs/blockstack-icon.png';
function DashBoard() {
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
                                            <h5>$3,254.00</h5>
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
                                            <h5>$3,254.00</h5>
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
                                            <h5>$3,254.00</h5>
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
                                            <h5>$3,254.00</h5>
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
                                    <h5 className="color-blank">0.069%</h5>
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