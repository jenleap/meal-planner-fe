import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import Loader from '../common/Loader';
import Message from '../common/Message';
import FormContainer from '../common/FormContainer';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [ error, setError ] = useState('');


    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage("Password does not match.")
        } else {
            const userData = {
                'name': name,
                'email': email,
                'username': username,
                'password': password
            };
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>

            {message && <Message variant="danger">{ message }</Message>}
            {error && <Message variant="danger">{ error }</Message>}

            <Form onSubmit={ submitHandler }>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={ name }
                        onChange={(e) => setName(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password"
                        value={ confirmPassword }
                        onChange={(e) => setConfirmPassword(e.target.value)}>    
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>

                <Row className="py-3">
                <Col>
                    Have an account?  
                    <Link to='/sign-in'>
                         Sign in here. 
                    </Link>
                </Col>
            </Row>
            </Form>

        </FormContainer>
    )
}

export default Register;
