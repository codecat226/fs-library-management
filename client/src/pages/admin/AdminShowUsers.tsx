import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminShowUsersInfo } from "components/admin/AdminShowUsersInfo";

export const AdminShowUsers = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminShowUsersInfo />} />
    </>
  );
};
