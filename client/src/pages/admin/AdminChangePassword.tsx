import React from "react";
import { AdminSideMenu } from "../../layouts/AdminSideMenu";
import { AdminChangePasswordInfo } from "components/admin/AdminChangePasswordInfo";

export const AdminChangePassword = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminChangePasswordInfo />} />
    </>
  );
};
