import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { usersReducer } from "./users.reducer";
import { storesReducer, storeDetailReducer } from "./store.reducer";
import { rolesReducer } from "./roles.reducer";
// import { toasterReducer } from "./toaster.reducers";

const rootReducer = combineReducers({
  authState: authReducer,
  usersState: usersReducer,
  storeState: storesReducer,
  storeDetailState: storeDetailReducer,
  rolesState: rolesReducer,  
  // toasterState: toasterReducer
});

export default rootReducer;
