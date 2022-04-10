import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import Meta from '../components/Meta';

// Redux actions
import { getOrderDetails, payOrder, deliverOrder } from '../redux/actions/orderActions';

const OrderScreen = (props) => {
    const orderID = props.match.params.id;
    const dispatch = useDispatch();
    
    // SDK ready state
    const [sdkReady, setSdkReady] = useState(false);
    
    
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    
    const orderPay = useSelector(state => state.orderPay);
    const { success:paySuccess, loading: payLoading } = orderPay;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success:deliverSuccess, loading: deliverLoading } = orderDeliver;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    // Calculation
    if(!loading && !error && order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => {
            return acc + (item.price * item.qty)
        }, 0)
    }
    
    useEffect(() => {
        const addPayPalScript = async () => {
            const res = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${res.data}`;
            script.async = true;
            script.onload = () => { setSdkReady(true) };
            document.body.appendChild(script);
        }
        // If order isn't loaded OR we make payment OR admin marks as delivered, we load order
        if(!order || paySuccess || deliverSuccess) {
            // Without reset it will keep refreshing after payment due to paySuccess
            dispatch({ type: 'ORDER_PAY_RESET' });
            dispatch({ type: 'ORDER_DELIVER_RESET' });
            dispatch(getOrderDetails(orderID));
        }
        // If order is NOT paid
        else if(!order.isPaid) {
            // If PayPal isn't loaded, add the script
            if(!window.paypal) {
                addPayPalScript();
            }
            // Else if PayPal is ready, set it as ready
            else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderID, order, paySuccess, deliverSuccess]);
    
    // Handles success from PayPal button
    const successPaymentHandler = (paymentResult) => {
         console.log(paymentResult);
         dispatch(payOrder(orderID, paymentResult));
    }
    
    const handleMarkAsDelivered = (e) => {
        e.preventDefault();
        dispatch(deliverOrder(order._id));
    }
    
    return loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : <>
    <Meta title={`Order ${order._id}`} />
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>
                            {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`}
                        </p>
                        { order.isDelivered ? 
                            (<Message variant='success' message={`Delivered at ${order.deliveredAt}`} />) 
                            : 
                            (<Message variant='danger' message='Not delivered' />) }
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>{order.paymentMethod}</p>
                        { order.isPaid ? 
                            (<Message variant='success' message={`Paid at ${order.paidAt}`} />) 
                            : 
                            (<Message variant='danger' message='Not paid' />) }
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (<Message variant='info' message='Order is empty'/>) : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => {
                                    return <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                ${item.price} x {item.qty} = ${item.price*item.qty}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && <ListGroup.Item>
                            {payLoading && <LoadingSpinner /> }
                            {!sdkReady ? <LoadingSpinner /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> }
                        </ListGroup.Item> }
                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={handleMarkAsDelivered}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    
}

export default OrderScreen;