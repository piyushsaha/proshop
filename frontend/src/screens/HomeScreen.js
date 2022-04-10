import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Product from '../components/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

// Redux actions
import { listProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    
    return <>
        <Meta />
        <h1>Top Rated Products</h1>
        <ProductCarousel />
        <h1>Latest Products</h1>
        {/* While loading */}
        {loading && <LoadingSpinner />}
        
        {/* Error or display fetch products */}
        {error ? <Message message={error} /> : ( <Row>
            {/* Rendering the products in columns */}
            {products.map((product) => {
                return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            })}
        </Row> )}
        
    </>
}

export default HomeScreen;