import { RoleConstants } from "../constants/roles.constant";

const initialState = {
  loading: false,
  roles: [],
  error: "",
};

export const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH
    case RoleConstants.FETCH_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RoleConstants.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };
    case RoleConstants.FETCH_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        roles: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
