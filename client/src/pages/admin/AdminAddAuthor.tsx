import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminAddAuthorInfo } from "components/admin/AdminAddAuthorInfo";

export const AdminAddAuthor = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminAddAuthorInfo />} />
    </>
  );
};
