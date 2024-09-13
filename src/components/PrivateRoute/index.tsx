import { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (): JSX.Element => {
  const isAuth = localStorage.getItem("token");
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
