import { Navigate, Outlet } from "react-router-dom";
import { JSX } from "react";

const PrivateRoute = (): JSX.Element => {
  const isAuth = localStorage.getItem("token");
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
