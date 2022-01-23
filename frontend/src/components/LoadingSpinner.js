import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
    return <Spinner animation="border" style={{ width: '100px', height: '100px', display: 'block', margin: 'auto' }}/>
}

export default LoadingSpinner;