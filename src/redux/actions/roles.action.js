import RolesApi from "../../utils/Api/roles.api";
import { RoleConstants } from "../constants/roles.constant";

const api = new RolesApi();

export const getAllRoles = () => {
  return (dispatch) => {
    dispatch({ type: RoleConstants.FETCH_ROLES_REQUEST });
    api
      .fetchAllRolesApi()
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        if (data) {
          dispatch({
            type: RoleConstants.FETCH_ROLES_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: RoleConstants.FETCH_ROLES_FAIL,
            payload: message,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
