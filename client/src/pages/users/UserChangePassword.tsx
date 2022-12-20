import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { UserChangePasswordInfo } from "components/user/UserChangePasswordInfo";

export const UserChangePassword = () => {
  return (
    <>
      <UserSideMenu childComp={<UserChangePasswordInfo />} />
    </>
  );
};
