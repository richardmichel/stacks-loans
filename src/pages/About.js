import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export default function About() {
    return (
        <React.Fragment>
            <Container>
                <Row className="justify-content-md-center bg-white py-10 shadow-md-bottom">
                    <Col lg="12">
                        <h4>About it</h4>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}


