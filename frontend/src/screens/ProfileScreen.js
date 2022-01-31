import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

// Redux actions
import { getUserDetails } from '../redux/actions/userActions';

const ProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // If user is not logged in
    useEffect(() => {
        if(!userInfo) {
            props.history.push('/login');
        }
        else {
            if(!user) {
                dispatch(getUserDetails('profile'));
            }
            else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, props.history, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        }
        else {
            // DISPATCH update profile
        }
    }


    return <Row>
        {/* Update form */}
        <Col md={3}>
        <h2>User Details</h2>
        {message && <Message message={message} />}
        {error && <Message message={error} />}
        {loading && <LoadingSpinner />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
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
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Update</Button>
        </Form>
        </Col>
        {/* Orders */}
        <Col md={9}></Col>
    </Row>
}

export default ProfileScreen;