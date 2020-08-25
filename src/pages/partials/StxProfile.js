import React, {useCallback, useEffect, useRef, useState} from "react";
import {fetchAccount} from "@pages/partials/StacksAccount";
import {Badge, Button, Col, Row, Card, Image} from 'react-bootstrap';
import BlockStackIcon from "@assets/imgs/blockstack-icon.png";
import Loader from "@components/ui/Loader";

function StxProfile({stxAddress, updateStatus, showAddress}) {
    const spinner = useRef();
    const [profileState, setProfileState] = useState({
        account: undefined,
    });
    const onRefreshBalance = useCallback(async stxAddress => {
            updateStatus(undefined);
            spinner.current.classList.remove('d-none');
            fetchAccount(stxAddress)
                .then(acc => {
                    setProfileState({account: acc});
                    spinner.current.classList.add('d-none');
                })
                .catch(e => {
                    updateStatus('Refresh failed');
                    spinner.current.classList.add('d-none');
                });
            if (showAddress) {
                claimTestTokens(stxAddress);
            }

        },
        [updateStatus]
    );

    useEffect(() => {
        fetchAccount(stxAddress).then(acc => {
            setProfileState({account: acc});
        });
    }, [stxAddress]);

    const claimTestTokens = stxAddr => {
        updateStatus(undefined);
        fetch(`https://sidecar.staging.blockstack.xyz/sidecar/v1/faucets/stx?address=${stxAddr}`, {
            method: 'POST',
        })
            .then(r => {
                if (r.status === 200) {
                    updateStatus('Tokens will arrive soon.');
                } else {
                    updateStatus('Claiming tokens failed.');
                }
            })
            .catch(e => {
                updateStatus('Claiming tokens failed.');
            });
    };

    return (
        <React.Fragment>
            {stxAddress && (<React.Fragment>
                    <div className="mb-2">
                        <Badge variant="light" pill> {stxAddress}</Badge>
                    </div>
                </React.Fragment>
            )}

            {profileState.account && (
                <React.Fragment>
                    <Row noGutters={false}>
                        <Col lg={showAddress ? 12 : 12}>
                            <Card
                                text="light"
                                className={`sampleBox ${showAddress ? 'sampleBox-four' : 'sampleBox-three'}`}
                            >
                                <Card.Body>
                                    <Image src={BlockStackIcon}
                                           style={{width: '50px'}}
                                    />
                                    <Card.Title>
                                        Balance {parseInt(profileState.account.balance, 16).toString()} STX
                                    </Card.Title>
                                    <Card.Text className="sampleBox-footer">
                                        <span
                                            className="title"> {parseInt(profileState.account.balance, 16).toString()} STX</span>
                                    </Card.Text>
                                </Card.Body>


                            </Card>
                        </Col>
                    </Row>

                    <br/>
                </React.Fragment>
            )}

            {!profileState.account && (
                <React.Fragment>
                    <Loader/>
                    <br/>
                    <br/>
                </React.Fragment>
            )
            }
            <Row lg={12}>
                <Col>

                    <div className="my-2">
                        <Button
                            variant="dark"

                            size="sm" block
                            onClick={e => {
                                onRefreshBalance(stxAddress);
                            }}
                        >
                            <div
                                ref={spinner}
                                role="status"
                                className="d-none spinner-border spinner-border-sm text-white align-text-top mr-2"
                            />
                            Refresh balance
                        </Button>
                    </div>


                </Col>
            </Row>

        </React.Fragment>
    );
};
export default StxProfile;