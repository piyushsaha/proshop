import axios from 'axios';
import * as userConstants from '../constants/userConstants';

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: userConstants.USER_LOGIN_REQUEST });
            const res = await axios.post('/api/users/login', { email, password });
            dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: res.data });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
        }
        catch(error) {
            dispatch({
                type: userConstants.USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
} 