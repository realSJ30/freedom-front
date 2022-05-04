import StoreApi from "../../utils/Api/store.api";
import { StoreConstants } from "../constants/store.constant";

const api = new StoreApi();

export const getSelectedStore = (id, setStore, goBack) => {
  return (dispatch) => {
    api
      .fetchStoreApi(id)
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        if (data) {
          setStore(data);
          dispatch({
            type: StoreConstants.FETCH_STORE_SUCCESS,
            payload: data,
          });
        } else {
          goBack();
          dispatch({
            type: StoreConstants.REMOVE_FETCH_STORE,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const removeSelectedStore = () => {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.REMOVE_FETCH_STORE,
    });
  };
};

export const getAllStores = () => {
  return (dispatch) => {
    dispatch({ type: StoreConstants.FETCH_STORES_REQUEST });
    api
      .fetchAllStoresApi()
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        if (data) {
          dispatch({
            type: StoreConstants.FETCH_STORES_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: StoreConstants.FETCH_STORES_FAIL,
            payload: message,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const createStore = (data, setOpen) => {
  return (dispatch) => {
    dispatch({ type: StoreConstants.CREATE_STORES_REQUEST });
    api
      .createStoresApi(data)
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        if (data) {
          dispatch({
            type: StoreConstants.CREATE_STORES_SUCCESS,
            payload: data,
          });
          setOpen(false);
        } else {
          dispatch({
            type: StoreConstants.CREATE_STORES_FAIL,
            payload: message,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateStore = (data, id) => {
  console.log(data);
  return (dispatch) => {
    api
      .updateStoresApi(id, data)
      .then((res) => {
        const { data, message } = res.data;
        console.log(res);
        if (data) {
          dispatch({
            type: StoreConstants.UPDATE_STORE_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: StoreConstants.UPDATE_STORE_FAIL,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const removeStore = (id) => {
  return (dispatch) => {    
    api
      .deleteStoresApi(id)
      .then((res) => {
        const { data, message } = res.data;
        console.log(res);
        if (data) {
          dispatch({
            type: StoreConstants.CHANGE_STORE_STATUS_SUCCESS,
            payload: id,
          });
        } else {
          dispatch({
            type: StoreConstants.CHANGE_STORE_STATUS_FAIL,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const restoreStore = (id) => {
  return (dispatch) => {    
    api
      .restoreStoresApi(id)
      .then((res) => {
        const { data, message } = res.data;
        console.log(res);
        if (data) {
          dispatch({
            type: StoreConstants.CHANGE_STORE_STATUS_SUCCESS,
            payload: id,
          });
        } else {
          dispatch({
            type: StoreConstants.CHANGE_STORE_STATUS_FAIL,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
