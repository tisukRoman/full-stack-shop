import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_DATA,
    CART_SAVE_SHIPPING_DATA
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingData = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_DATA,
        payload: data
    });
    localStorage.setItem('shippingInfo', JSON.stringify(data));
}

export const savePaymentData = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_DATA,
        payload: data
    });
    localStorage.setItem('paymentInfo', JSON.stringify(data));
}