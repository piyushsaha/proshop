import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

// Redux actions
import { listProducts } from '../redux/actions/productActions';

const ProducListScreen = (props) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        }
        else {
            props.history.push('/login');
        }
    }, [dispatch]);
    
    const productDeleteHandler = (id) => {
        // + DELETE PRODUCT
    }
    const createProductHandler = (product) => {
        // + CREATE PRODUCT
    }
    
    return <>
        <Row className='my-2'>
            <Col><h1>Products</h1></Col>
            <Col className='text-right'>
                <Button> <i className='fas fa-plus' /> Create Product</Button>
            </Col>
        </Row>
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger' message={error} /> : (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/products/${product._id}/edit`}>
                                    <Button
                                        variant='light'
                                        className='btn-sm'
                                        onClick={createProductHandler}
                                    >
                                        <i className='fas fa-edit' />
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={productDeleteHandler.bind(null, product._id)}
                                >
                                    <i className='fas fa-trash' />
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )}
    </>
}

export default ProducListScreen;