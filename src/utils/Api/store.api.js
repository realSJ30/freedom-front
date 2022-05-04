import axios from "axios";
import jsCookie from "js-cookie";
import Api from ".";

const api = new Api();

export default class StoreApi {
  // fetch all users
  fetchAllStoresApi = () => {
    return api.init().get("/api/stores/all");
  };

  fetchStoreApi = (id) => {
    return api.init().get(`/api/stores/${id}`);
  };

  createStoresApi = (data) => {
    return api.init().post("/api/stores/create", data);
  };

  updateStoresApi = (data, id) => {
    return api.init().put(`/api/stores/update/${id}`, data);
  };

  deleteStoresApi = (id) => {
    return api.init().put(`/api/stores/delete/${id}`);
  };
  restoreStoresApi = (id) => {
    return api.init().put(`/api/stores/restore/${id}`);
  };
}
