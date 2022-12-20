import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminUpdateAuthorInfo } from "components/admin/AdminUpdateAuthorInfo";

export const AdminUpdateAuthor = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminUpdateAuthorInfo />} />
    </>
  );
};
