import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import Meta from '../components/Meta';

// Redux actions
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { myOrders } from '../redux/actions/orderActions';

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
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;
    
    const orderMy = useSelector(state => state.orderMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderMy;

    useEffect(() => {
        // If user is not logged in
        if(!userInfo) {
            props.history.push('/login');
        }
        else {
            if(!user) {
                dispatch(getUserDetails('profile'));
                dispatch(myOrders());
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
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    }


    return <Row>
        <Meta title='ProShop | My Profile' />
        {/* Update form */}
        <Col md={3}>
        <h2>User Details</h2>
        {message && <Message message={message} />}
        {error && <Message message={error} />}
        {success && <Message variant='success' message={'Profile successfully updated'} />}
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
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <LoadingSpinner /> : errorOrders ? <Message variant='danger' message={errorOrders} /> : (
                orders.length === 0 ? <Message variant='info' message='No orders placed' /> : (
                <Table bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            return <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color:'red'}} /> }</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color:'red'}} /> }</td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>)
            )}
        </Col>
    </Row>
}

export default ProfileScreen;