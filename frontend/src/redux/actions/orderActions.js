import * as orderConstants from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: orderConstants.ORDER_CREATE_REQUEST });
            // Setting header with JWT token
            const config = { headers: { Authorization: `Bearer ${getState().userLogin.userInfo.token}` } };
            const res = await axios.post('/api/orders/', order, config);
            dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, success: true, payload: res.data});
        }
        catch(error) {
            console.log(error.response);
            dispatch({
                type: orderConstants.ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const getOrderDetails = (id) => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST });
            
            // Setting header with JWT token
            const config = { headers: { Authorization: `Bearer ${getState().userLogin.userInfo.token}` } };
            const res = await axios.get(`/api/orders/${id}`, config);
            
            dispatch({ type: orderConstants.ORDER_DETAILS_SUCCESS, payload: res.data });    
        }
        catch(error) {
            console.log(error.response);
            dispatch({
                type: orderConstants.ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const payOrder = (id, paymentResult) => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: orderConstants.ORDER_PAY_REQUEST });
            
            // Setting header with JWT token and content type
            const config = { headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`
                } };
                
            await axios.put(`/api/orders/${id}/pay`, paymentResult, config);
            
            dispatch({ type: orderConstants.ORDER_PAY_SUCCESS, success: true});    
        }
        catch(error) {
            console.log(error.response);
            dispatch({
                type: orderConstants.ORDER_PAY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const myOrders = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: orderConstants.ORDER_LIST_MY_REQUEST });
            
            // Setting header with JWT token and content type
            const config = { headers: {
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`
                } };
            console.log('loading orders');    
            const res = await axios.get(`/api/orders/myorders`, config);
            
            dispatch({ type: orderConstants.ORDER_LIST_MY_SUCCESS, payload: res.data });    
        }
        catch(error) {
            console.log(error.response);
            dispatch({
                type: orderConstants.ORDER_LIST_MY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const allOrders = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: orderConstants.ORDER_LIST_REQUEST });
            
            // Setting header with JWT token and content type
            const config = { headers: {
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`
                } };  
            const res = await axios.get(`/api/orders/allorders`, config);
            
            dispatch({ type: orderConstants.ORDER_LIST_SUCCESS, payload: res.data });    
        }
        catch(error) {
            console.log(error.response);
            dispatch({
                type: orderConstants.ORDER_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const deliverOrder = (id) => {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: orderConstants.ORDER_DELIVER_REQUEST });
            
            // Setting header with JWT token and content type
            const config = { headers: {
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`
                } };
                
            await axios.put(`/api/orders/${id}/deliver`, {}, config);
            
            dispatch({ type: orderConstants.ORDER_DELIVER_SUCCESS, success: true});    
        }
        catch(error) {
            console.log(error.response);
            dispatch({
                type: orderConstants.ORDER_DELIVER_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}