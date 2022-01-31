import * as userConstants from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_LOGIN_REQUEST:
            return { loading: true };
        case userConstants.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case userConstants.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case userConstants.USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return { loading: true };
        case userConstants.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case userConstants.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: null }, action) => {
    switch(action.type) {
        case userConstants.USER_DETAILS_REQUEST:
            return {...state, loading: true };
        case userConstants.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case userConstants.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}