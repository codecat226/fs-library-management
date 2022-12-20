import React from "react";
import { useAppSelector } from "app/hooks";
import { Outlet } from "react-router-dom";
import { Home } from "pages";

const UserProtected = () => {
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  return isLoggedIn ? <Outlet /> : <Home />;
};

export default UserProtected;
