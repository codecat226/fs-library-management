import React from "react";
import { UserEditProfileInfo } from "components/user/UserEditProfileInfo";
import { UserSideMenu } from "layouts/UserSideMenu";

export const UserEditProfile = () => {
  return (
    <>
      <UserSideMenu childComp={<UserEditProfileInfo />} />
    </>
  );
};
