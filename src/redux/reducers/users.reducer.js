import { UsersConstants } from "../constants/users.constant";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersConstants.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UsersConstants.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case UsersConstants.FETCH_USERS_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    case UsersConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id == action.payload.id ? action.payload : user
        ),
      };
    case UsersConstants.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
