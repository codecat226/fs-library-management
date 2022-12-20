import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { UserSingleAuthorData } from "../../components/user/UserSingleAuthorData";

export const UserSingleAuthor = () => {
  return (
    <>
      <UserSideMenu childComp={<UserSingleAuthorData />} />
    </>
  );
};