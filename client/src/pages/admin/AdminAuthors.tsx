import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminAuthorsInfo } from "components/admin/AdminAuthorsInfo";

export const AdminAuthors = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminAuthorsInfo />} />
    </>
  );
};
