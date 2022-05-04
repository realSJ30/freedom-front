import React from "react";

const Users = React.lazy(() => import("./pages/views/users/Users"));
const Stores = React.lazy(() => import("./pages/views/stores/Stores"));
const StoreDetail = React.lazy(() =>
  import("./pages/views/stores/StoreDetail")
);
// const Products = React.lazy(() => import('./views/products/Products'))

export const routes = [
  { path: "/", exact: true, name: "Dashboard", element: Stores },
  {
    path: "/store/:id",
    exact: true,
    name: "StoreDetail",
    element: StoreDetail,
  },
  { path: "/users", exact: true, name: "Users", element: Users },
];

export const admin_routes = ["Dashboard", "StoreDetail", "Users", "UserDetail"];
export const mod_routes = ["Dashboard", "StoreDetail"];
export const sub_routes = ["Dashboard", "StoreDetail"];
