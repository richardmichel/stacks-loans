import * as React from 'react';
import {useTranslation} from 'react-i18next';
// others components
import { Container,Row,  Col, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useConnect } from '@blockstack/connect';


function LandingPage(props) {
    const [t] = useTranslation();
    const { doOpenAuth } = useConnect();

    return (
        <React.Fragment>
            <Container>
            <div className="mt-10">
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
            </div>
            </Container>
        </React.Fragment>
    )
}

export default LandingPage;