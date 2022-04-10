import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

// Components
import Product from '../components/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Meta from '../components/Meta';

const SearchResultScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [products, setProducts] = useState([]);
    const keyword = props.location.search.split('=')[1];

    useEffect(() => {
        // Fetching the keyword search from backend
        const getSearchResult = async () => {
            try {
                setLoading(true);
                const res = await axios.post(`/api/products/search?keyword=${keyword}`);
                setLoading(false);
                setProducts(res.data);
            }
            catch (error) {
                setLoading(false);
                setError(error.response && error.response.data.message ? error.response.data.message : error.message);
            }
        }
        getSearchResult();
    }, [keyword]);

    return <>
        <Meta title='Search Results' />
        <h3>Search results for "{keyword}"...</h3>
        {/* While loading */}
        {loading && <LoadingSpinner />}

        {/* Error */}
        {error && <Message message={error} />}
        
        {/* Not loading, no error and products fetched for the search */}
        {!loading && !error && products.length > 0 && (
            <Row>
                {/* Rendering the products in columns */}
                {products.map((product) => {
                    return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                })}
            </Row>)
        }
        
        {/* Not loading, no error and no products fetched for the search */}
        {!loading && !error && products.length === 0 && (
            <Message variant='info' message={`No product found for ${keyword}`} />
        )}

    </>
}

export default SearchResultScreen;