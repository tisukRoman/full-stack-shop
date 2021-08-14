import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_UPDATE_REQUEST,
    USER_DETAILS_UPDATE_SUCCESS,
    USER_DETAILS_UPDATE_FAIL,
    USER_DETAILS_UPDATE_RESET,
    USER_LIST_USERS_REQUEST,
    USER_LIST_USERS_SUCCESS,
    USER_LIST_USERS_FAIL,
    USER_LIST_USERS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_GET_REQUEST,
    USER_GET_FAIL,
    USER_ADMIN_UPDATE_SUCCESS,
    USER_ADMIN_UPDATE_REQUEST,
    USER_ADMIN_UPDATE_RESET
} from '../constants/userConstants'
import { CART_RESET } from './../constants/cartConstants';
import { ORDER_DETAILS_RESET, ORDER_LIST_ALL_RESET, ORDER_LIST_MY_RESET } from './../constants/orderConstants'
import { USER_GET_SUCCESS, USER_ADMIN_UPDATE_FAIL } from './../constants/userConstants';


export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGIN_LOGOUT })
    dispatch({ type: USER_DETAILS_UPDATE_RESET })
    dispatch({ type: USER_LIST_USERS_RESET })
    dispatch({ type: CART_RESET })
    localStorage.removeItem('cartInfo')
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_ADMIN_UPDATE_RESET })
    dispatch({ type: ORDER_LIST_ALL_RESET })
    dispatch({ type: ORDER_DETAILS_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const updateUserDetails = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_UPDATE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({
            type: USER_DETAILS_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_DETAILS_UPDATE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const getAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_USERS_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users`, config);
        dispatch({
            type: USER_LIST_USERS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: USER_LIST_USERS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_DELETE_SUCCESS })

    } catch (err) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const getUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_GET_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch({
            type: USER_GET_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: USER_GET_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}

export const updateUserByAdmin = (id, body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ADMIN_UPDATE_REQUEST
        });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${id}`, body, config);

        dispatch({ type: USER_ADMIN_UPDATE_SUCCESS })
        dispatch({
            type: USER_GET_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: USER_ADMIN_UPDATE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        });
    }
}
