import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Components
import Product from '../components/Product';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products');
            setProducts(res.data);
        }
        fetchProducts();
    }, []);
    
    return <>
        <h1>Latest Products</h1>
        <Row>
            {/* Rendering the products in columns */}
            {products.map((product) => {
                return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            })}
        </Row>
    </>
}

export default HomeScreen;