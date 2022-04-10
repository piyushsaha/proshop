import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import FormContainer from '../components/UI/FormContainer';
import Meta from '../components/Meta';

// Redux actions
import { login } from '../redux/actions/userActions';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    
    // If there is a ?redirect or not (redirect to shipping for logged out users clicking checkout)
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    
    // If user is already logged in or got logged in
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }


    return <FormContainer>
        <Meta title='ProShop | Sign In' />
        <h1>Sign In</h1>
        {/* {console.log(error)} */}
        {error && <Message message={error} />}
        {loading && <LoadingSpinner />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Sign In</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer?{' '}<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
}

export default LoginScreen;