import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_UPDATE_REQUEST,
    USER_DETAILS_UPDATE_SUCCESS,
    USER_DETAILS_UPDATE_FAIL,
    USER_DETAILS_UPDATE_RESET,
    USER_LIST_USERS_REQUEST,
    USER_LIST_USERS_FAIL,
    USER_LIST_USERS_SUCCESS,
    USER_LIST_USERS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,
    USER_ADMIN_UPDATE_REQUEST,
    USER_ADMIN_UPDATE_FAIL,
    USER_ADMIN_UPDATE_SUCCESS,
    USER_ADMIN_UPDATE_RESET
} from '../constants/userConstants'


export const userLoginReducer = (state = { userInfo: null }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGIN_LOGOUT:
            return { userInfo: null }
        default:
            return state
    }
}

export const userRegisterReducer = (state = { userInfo: null }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true, ...state }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsUpdateReducer = (state = { userInfo: null }, action) => {
    switch (action.type) {
        case USER_DETAILS_UPDATE_REQUEST:
            return { loading: true }
        case USER_DETAILS_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case USER_DETAILS_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_UPDATE_RESET:
            return { userInfo: null }
        default:
            return state
    }
}

export const userGetUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_USERS_REQUEST:
            return { loading: true }
        case USER_LIST_USERS_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_USERS_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_USERS_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userGetReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_GET_REQUEST:
            return { loading: true }
        case USER_GET_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAdminUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADMIN_UPDATE_REQUEST:
            return { loading: true }
        case USER_ADMIN_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_ADMIN_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_ADMIN_UPDATE_RESET:
            return {}
        default:
            return state
    }
}