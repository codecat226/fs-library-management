import React from "react";
import { AdminSideMenu } from "../../layouts/AdminSideMenu";
import { AdminEditProfileInfo } from "components/admin/AdminEditProfileInfo";

export const AdminEditProfile = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminEditProfileInfo />} />
    </>
  );
};
