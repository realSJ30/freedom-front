import { StoreConstants } from "../constants/store.constant";

const initialState = {
  loading: false,
  stores: [],
  error: "",
};

export const storesReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH
    case StoreConstants.FETCH_STORES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StoreConstants.FETCH_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: action.payload,
      };
    case StoreConstants.FETCH_STORES_FAIL:
      return {
        ...state,
        loading: false,
        stores: [],
        error: action.payload,
      };

    // CREATE
    case StoreConstants.CREATE_STORES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case StoreConstants.CREATE_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: [action.payload, ...state.stores],
        error: "",
      };
    case StoreConstants.CREATE_STORES_FAIL:
      return {
        ...state,
        loading: false,
        // stores: [],
        error: action.payload,
      };

    // REMOVE
    case StoreConstants.CHANGE_STORE_STATUS_SUCCESS:
      return {
        ...state,
        // stores: state.stores.filter((store) => store.id != action.payload),
        stores: state.stores.map((store) =>
          store.id == action.payload
            ? { ...store, is_active: store.is_active == 1 ? 0 : 1 }
            : store
        ),
      };
    case StoreConstants.CHANGE_STORE_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const storeDetailReducer = (state = {}, { type, payload }) => {
  switch (type) {
    // FETCH
    case StoreConstants.FETCH_STORE_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case StoreConstants.REMOVE_FETCH_STORE:
      return {};

    case StoreConstants.UPDATE_STORE_SUCCESS:
      return {
        ...payload,
      };
    case StoreConstants.UPDATE_STORE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
