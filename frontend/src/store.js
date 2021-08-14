import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewReducer,
    productTopListReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userDetailsUpdateReducer,
    userGetUsersReducer,
    userDeleteReducer,
    userGetReducer,
    userAdminUpdateReducer
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListAllReducer,
    orderDeliverReducer
} from './reducers/orderReducers'


const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userDetailsUpdate: userDetailsUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userGetUsers: userGetUsersReducer,
    userDelete: userDeleteReducer,
    userGet: userGetReducer,
    userAdminUpdate: userAdminUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderListAll: orderListAllReducer,
    orderDeliver: orderDeliverReducer,
    productReview: productReviewReducer,
    productTopList: productTopListReducer
});


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingInfoFromStorage = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {};
const paymentInfoFromStorage = localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : 'PayPal';


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingInfo: shippingInfoFromStorage,
        paymentInfo: paymentInfoFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;