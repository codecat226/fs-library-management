import React from "react";
import { AdminSideMenu } from "layouts/AdminSideMenu";
import { AdminLibraryInfo } from "../../components/admin/AdminLibraryInfo";

export const AdminLibrary = () => {
  return (
    <>
      <AdminSideMenu childComp={<AdminLibraryInfo />} />
    </>
  );
};
