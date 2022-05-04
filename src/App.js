import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./utils/ProtectedRoute";

// Pages
const Login = React.lazy(() => import("./pages/Login"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner size="h-10 w-10"/>}>
        <Routes>
          <Route exact path="/login" name="Login" element={<Login />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route
            path="/*"
            name="Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
