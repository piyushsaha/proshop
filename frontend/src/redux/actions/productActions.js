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

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            // Starts the request to delete
            dispatch({ type: productConstants.PRODUCT_DELETE_REQUEST });
            
            // Deleting
            const config = { headers: { Authorization: `Bearer ${getState().userLogin.userInfo.token}` } };
            await axios.delete(`/api/products/${id}`, config);
            
            // Delete was successful
            dispatch({ type: productConstants.PRODUCT_DELETE_SUCCESS });
            
        }
        catch(error) {
            dispatch({
                type: productConstants.PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const createProduct = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: productConstants.PRODUCT_CREATE_REQUEST });
            
            const config = { headers: { Authorization: `Bearer ${getState().userLogin.userInfo.token}` } };
            const res = await axios.post('/api/products', {}, config);
            
            dispatch({ type: productConstants.PRODUCT_CREATE_SUCCESS, payload: res.data });
        }
        catch(error) {
            dispatch({
                type: productConstants.PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const updateProduct = (product) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: productConstants.PRODUCT_UPDATE_REQUEST });
            
            const config = { headers: { Authorization: `Bearer ${getState().userLogin.userInfo.token}` } };
            const res = await axios.put(`/api/products/${product._id}`, product, config);
            
            dispatch({ type: productConstants.PRODUCT_UPDATE_SUCCESS, payload: res.data });
        }
        catch(error) {
            dispatch({
                type: productConstants.PRODUCT_UPDATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const createReview = (productID, review) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: productConstants.PRODUCT_CREATE_REVIEW_REQUEST });
            
            const config = { headers: { Authorization: `Bearer ${getState().userLogin.userInfo.token}` } };
            await axios.post(`/api/products/${productID}/reviews`, review, config);
            
            dispatch({ type: productConstants.PRODUCT_CREATE_REVIEW_SUCCESS });
        }
        catch(error) {
            dispatch({
                type: productConstants.PRODUCT_CREATE_REVIEW_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const getTopProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.PRODUCT_TOP_RATED_REQUEST });
            const res = await axios.get('/api/products/toprated');
            dispatch({ type: productConstants.PRODUCT_TOP_RATED_SUCCESS, payload: res.data });
        }
        catch(error) {
            dispatch({
                type: productConstants.PRODUCT_TOP_RATED_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}