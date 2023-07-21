import React, { useState, useEffect, FormEvent, useContext } from 'react';
import { Link, redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../common/Message';
import FormContainer from '../common/FormContainer';
import { setLocalAuthToken } from '../../utils/auth';
import { AuthContext } from './auth.context';


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ error, setError ] = useState('');

    const { setAuthToken } = useContext(AuthContext);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = {
            'username': username,
            'password': password
        };

       const res = await fetch("http://localhost:3002/api/auth/login", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
       });

       const json = await res.json();

       setLocalAuthToken(json.access_token);
       setAuthToken(json.access_token);
       redirect('/');
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {error && <Message variant="danger">{ error }</Message>}

            <Form onSubmit={ submitHandler }>
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
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    No account?  
                   {/*  <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>
                         Sign up here. 
                    </Link> */}
                    <Link to={'/register'}>
                         Sign up here. 
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default SignIn;
