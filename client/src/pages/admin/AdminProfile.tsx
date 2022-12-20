import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminProfileInfo } from "components/admin/AdminProfileInfo";

export const AdminProfile = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminProfileInfo />} />
    </>
  );
};
