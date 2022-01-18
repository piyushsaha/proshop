import React from 'react';

const ProductScreen = (props) => {
    console.log(props);
    return <h1>{props.match.params.id}</h1>
}

export default ProductScreen;