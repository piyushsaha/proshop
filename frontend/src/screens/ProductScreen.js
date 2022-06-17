import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Rating from '../components/Rating';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';

// Redux actions
import { singleProduct, createReview } from '../redux/actions/productActions';

// Redux constants
import * as productConstants from '../redux/constants/productConstants';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails;

    const productCreateReview = useSelector((state) => state.productCreateReview);
    const { error: createReviewError, success: createReviewSuccess } = productCreateReview;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(createReviewSuccess) {
            alert('Review successfully added!');
            setRating(0);
            setComment('');
            dispatch({ type: productConstants.PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(singleProduct(props.match.params.id));
        
        // Clearing the product from redux store on unmount
        return () => {
            dispatch({ type: productConstants.PRODUCT_DETAILS_CLEAR });
        }
    }, [dispatch, props.match.params, createReviewSuccess]);


    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    }
    
    const submitReviewHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(props.match.params.id, { rating, comment }));
    }
    return <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {loading && <LoadingSpinner />}
        {error ? <Message message={error} /> : (<> 
            <Meta title={product.name} />
            <Row>
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
                                        {[...Array(product.countInStock).keys()].map((num) => {
                                            return <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        })}
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
        </Row>
        {/* Reviews */}
        <Row className='my-1'>
            <Col md={6}>
                <h2>Reviews</h2>
                {/* If no review exists */}
                {product.reviews.length === 0 && <Message variant='info' message='No reviews'/>}
                {/* If there are reviews */}
                <ListGroup variant='flush'>
                    {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h3>Write a review</h3>
                        {createReviewError && <Message variant='danger' message={createReviewError} />}
                        {userInfo ? (
                            <Form onSubmit={submitReviewHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value=''>Select rating...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option> 
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='3' 
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type='submit' variant='primary'>
                                    Submit Review
                                </Button>
                            </Form>
                        ) : <Message variant='info' message='Please login to review product'/>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        )}
    </>
}

export default ProductScreen;