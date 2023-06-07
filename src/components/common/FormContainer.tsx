import React, { PropsWithChildren } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FormContainer({ children }: PropsWithChildren) {
    return (
        <Container>
            <Row classname="justify-content-md-center"> 
                <Col xs={12} md={6}>{ children }</Col>
            </Row>
        </Container>
    )
}

export default FormContainer
