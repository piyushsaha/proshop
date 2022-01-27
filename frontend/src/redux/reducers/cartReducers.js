import * as cartConstants from '../constants/cartConstants';

export const cartReducer = (state={ cartItems: []}, action) => {
    switch(action.type) {
        case cartConstants.CART_ADD_ITEM:
            const item = action.payload;
            const exists = state.cartItems.find((p) => p.product === item.product);
            if(exists) {
                return {...state, cartItems: state.cartItems.map(x => x.product === exists.product ? item : x) };
            }
            else {
                return {...state, cartItems: [...state.cartItems, item]};
            }
        case cartConstants.CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(item => item.product !== action.payload)};
        default:
            return state;
    }
}