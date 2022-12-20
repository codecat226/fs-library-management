import React from "react";
import { useAppSelector } from "app/hooks";
import { Outlet } from "react-router-dom";
import { Home } from "pages";

const AdminProtected = () => {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.userR);
  const route = isAdmin && isLoggedIn ? <Outlet /> : <Home />;
  return route;
};

export default AdminProtected;
