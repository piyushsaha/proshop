import * as productConstants from '../constants/productConstants';
import axios from 'axios';

// Action creator function
export const listProducts = () => {
    return async (dispatch) => {
        try {
            // Starts loading
            dispatch({ type: productConstants.PRODUCT_LIST_REQUEST });
            
            const res = await axios.get('/api/products');
            
            // Loading successful
            dispatch({ type: productConstants.PRODUCT_LIST_SUCCESS, payload: res.data });
        }
        catch(error) {
            // Loading unsuccessful
            dispatch({
                type: productConstants.PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const singleProduct = (id) => {
    return async (dispatch) => {
        try {
            // Starts loading
            dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST });
            
            const res = await axios.get(`/api/products/${id}`);
            
            // Loading successful
            dispatch({ type: productConstants.PRODUCT_DETAILS_SUCCESS, payload: res.data });
        }
        catch(error) {
            // Loading unsuccessful
            dispatch({
                type: productConstants.PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}