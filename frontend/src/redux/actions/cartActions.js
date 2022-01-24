import * as cartConstants from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const res = await axios.get(`/api/products/${id}`);
        dispatch({
            type: cartConstants.CART_ADD_ITEM,
            payload: {
                product: res.data._id,
                name: res.data.name,
                image: res.data.image,
                price: res.data.price,
                countInStock: res.data.countInStock,
                qty
            }
        });
        
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }
}