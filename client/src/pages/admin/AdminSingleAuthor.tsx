import React from "react";
import { AdminSingleAuthorData } from "components/admin/AdminSingleAuthorData";
import { AdminSideMenu } from "../../layouts/AdminSideMenu";

export const AdminSingleAuthor = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminSingleAuthorData />} />
    </>
  );
};
