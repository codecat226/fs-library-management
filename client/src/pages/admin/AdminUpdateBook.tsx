import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminUpdateBookInfo } from "components/admin/AdminUpdateBookInfo";

export const AdminUpdateBook = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminUpdateBookInfo />} />
    </>
  );
};
