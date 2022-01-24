import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Rating from '../components/Rating';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

// Redux actions
import { singleProduct } from '../redux/actions/productActions';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    useEffect(() => {
        dispatch(singleProduct(props.match.params.id));
    }, [dispatch, props.match.params]);

    const { loading, product, error } = productDetails;
    
    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    }

    return <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {loading && <LoadingSpinner />}
        {error ? <Message message={error} /> : (<Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (<ListGroup.Item>
                            <Row>
                                <Col>Quantity:</Col>
                                <Col>
                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {/* Creating options from 1 -> count in stock
                                            keys() method returns iterators for the array                                                                                    
                                        */}
                                        { [...Array(product.countInStock).keys()].map((num) => {
                                            return <option key={num+1} value={num+1}>{num+1}</option>
                                        }) }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>)}

                        <ListGroup.Item>
                            <Button
                                className='btn-block'
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>)}
    </>
}

export default ProductScreen;