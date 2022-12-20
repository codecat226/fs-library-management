import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { UserLibraryInfo } from "components/user/UserLibraryInfo";

export const UserLibrary = () => {
  return (
    <>
      <UserSideMenu childComp={<UserLibraryInfo />} />
    </>
  );
};
