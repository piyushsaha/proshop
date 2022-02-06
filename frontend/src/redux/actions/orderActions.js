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