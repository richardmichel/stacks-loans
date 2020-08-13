import * as React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import {useTranslation} from 'react-i18next';
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { useConnect } from '@blockstack/connect';


function LandingPage(props) {
    const [t] = useTranslation();
    const { doOpenAuth } = useConnect();

    return (
        <React.Fragment>
            <Container className="mt-10">
                <Row className="justify-content-md-center">
                    <Col lg="12">
                        <h2>  {t('landingPage:label1')} </h2>
                        <p>
                            {t('landingPage:label2')}
                        </p>
                        <Row className="justify-content-md-center">
                            <Col lg="6">
                                <Button onClick={doOpenAuth}
                                        variant="primary"
                                        size="lg"
                                        block>
                                    {t('landingPage:label3')}  <FontAwesomeIcon   icon={faArrowRight} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default LandingPage;