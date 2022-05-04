import { AuthConstants } from "../constants/auth.constant"

const initialState = {
    loading: false,
    user: {},
    error: ""
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case AuthConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: "",
            }
        case AuthConstants.LOGOUT:
            return {
                ...state,
                user: {},
            }
        case AuthConstants.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                user: {},
                error: action.payload,
            }
        
        case AuthConstants.FETCH_AUTHENTICATED_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case AuthConstants.FETCH_AUTHENTICATED_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            }
        case AuthConstants.FETCH_AUTHENTICATED_USER_FAIL:
            return {
                ...state,
                loading: false,
                user: {},
            }

        default:
            return state;
    }

}