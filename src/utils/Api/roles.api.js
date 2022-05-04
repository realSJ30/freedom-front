import axios from "axios";
import jsCookie from "js-cookie";
import Api from ".";

const api = new Api();

export default class RolesApi {
  // fetch all users
  fetchAllRolesApi = () => {
    return api.init().get("/api/roles/all");
  };

}
