import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import Product from '../components/Product';

// Products dummy data
import products from '../products';

const HomeScreen = () => {
    return <>
        <h1>Latest Products</h1>
        <Row>
            {/* Rendering the products in columns */}
            {products.map((product) => {
                return <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            })}
        </Row>
    </>
}

export default HomeScreen;