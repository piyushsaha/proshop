import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { addToCart } from '../redux/actions/cartActions';

const CartScreen = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    
    
    return <h4>Cart</h4>
}

export default CartScreen;

