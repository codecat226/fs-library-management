import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import AdminSingleBookData from "components/admin/AdminSingleBookData";

export const AdminSingleBook = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminSingleBookData />} />
    </>
  );
};
