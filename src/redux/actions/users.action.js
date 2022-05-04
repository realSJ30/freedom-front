import UsersApi from "../../utils/Api/users.api";
import { UsersConstants } from "../constants/users.constant";

const api = new UsersApi();

export const getAllUsers = () => {
  return (dispatch) => {
    dispatch({ type: UsersConstants.FETCH_USERS_REQUEST });
    api
      .fetchUsersApi()
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        if (data) {
          dispatch({
            type: UsersConstants.FETCH_USERS_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: UsersConstants.FETCH_USERS_FAIL,
            payload: message,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateUserRole = (id, data, setOpen) => {
  return (dispatch) => {
    api
      .updateUserRoleApi(id, data)
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        if (data) {
          dispatch({
            type: UsersConstants.UPDATE_USER_SUCCESS,
            payload: data,
          });
          setOpen(false);
        } else {
          dispatch({
            type: UsersConstants.UPDATE_USER_FAIL,
            payload: message,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
