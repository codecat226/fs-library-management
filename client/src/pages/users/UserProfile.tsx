import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { UserProfileInfo } from "components/user/UserProfileInfo";

export const UserProfile = () => {
  return (
    <>
      <UserSideMenu childComp={<UserProfileInfo />} />
    </>
  );
};
