import axios from "axios";
import jsCookie from "js-cookie";
import Api from ".";

const api = new Api();

export default class UsersApi {
  // fetch all users
  fetchUsersApi = () => {
    return api.init().get("/api/user/all");
  };

  // update user role
  updateUserRoleApi = (id, data) => {
    return api.init().put(`/api/user/update-role/${id}`, data);
  };
}
