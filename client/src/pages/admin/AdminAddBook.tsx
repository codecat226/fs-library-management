import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminAddBookInfo } from "components/admin/AdminAddBookInfo";

export const AdminAddBook = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminAddBookInfo />} />
    </>
  );
};
