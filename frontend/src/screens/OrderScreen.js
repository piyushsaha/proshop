import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';

// Redux actions
import { getOrderDetails } from '../redux/actions/orderActions';

const OrderScreen = (props) => {
    const orderID = props.match.params.id;
    const dispatch = useDispatch();
    
    
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    // Calculation
    if(!loading && !error && order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => {
            return acc + (item.price * item.qty)
        }, 0)
    }
    
    useEffect(() => {
        dispatch(getOrderDetails(orderID));
    }, [dispatch, orderID]);
    
    return loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : <>
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
                            (<Message variant='danger' message={`Delivered at ${order.deliveredAt}`} />) 
                            : 
                            (<Message variant='danger' message='Not delivered' />) }
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>{order.paymentMethod}</p>
                        { order.isPaid ? 
                            (<Message variant='danger' message={`Delivered at ${order.paidAt}`} />) 
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
                        
                        
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    
}

export default OrderScreen;