import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import UserSingleBookData from "../../components/user/UserSingleBookData";

export const UserSingleBook = () => {
  return (
    <>
      <UserSideMenu childComp={<UserSingleBookData />} />
    </>
  );
};
