import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET,
    CART_SAVE_PAYMENT_DATA,
    CART_SAVE_SHIPPING_DATA
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            // `product` is `_id`
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_DATA:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case CART_SAVE_PAYMENT_DATA:
            return {
                ...state,
                paymentInfo: action.payload
            }
        case CART_RESET:
            return {
                cartItems: [], shippingInfo: {}
            }
        default:
            return state
    }
}