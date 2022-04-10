import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';

// Redux actions
import { allOrders } from '../redux/actions/orderActions';

const OrderListScreen = (props) => {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(allOrders());
        }
        else {
            props.history.push('/login');
        }
    }, [dispatch]);

    return <>
        <Meta title='Order List' />
        <h1>Orders</h1>
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <Table striped bordered hover responsive>
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
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )}
    </>
}

export default OrderListScreen;