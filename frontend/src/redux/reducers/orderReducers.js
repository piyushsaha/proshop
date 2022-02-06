import * as orderConstants from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case orderConstants.ORDER_CREATE_REQUEST:
            return { loading: true };
        case orderConstants.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case orderConstants.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {orderItems: []}, action) => {
    switch(action.type) {
        case orderConstants.ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case orderConstants.ORDER_DETAILS_SUCCESS:
            return { loading: false, orderItems: action.payload };
        case orderConstants.ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}