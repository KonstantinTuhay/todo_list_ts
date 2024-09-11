import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = (): JSX.Element => {
  const isAuth = localStorage.getItem("token");
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
