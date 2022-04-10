import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import LoadingSpinner from './LoadingSpinner';
import Message from './Message';

// Redux actions
import { getTopProducts } from '../redux/actions/productActions';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(getTopProducts());
    }, [dispatch]);

    return loading ? (
        <LoadingSpinner />
    ) : error ? (
        <Message variant='danger' message={error} />
    ) : (
        <Carousel pause='hover' className='bg-dark mb-4' interval={3000}>
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h5>{product.name} (${product.price})</h5>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ProductCarousel;