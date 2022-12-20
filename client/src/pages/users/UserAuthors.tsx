import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { UserAuthorsInfo } from "components/user/UserAuthorsInfo";

export const UserAuthors = () => {
  return (
    <>
      <UserSideMenu childComp={<UserAuthorsInfo />} />
    </>
  );
};
