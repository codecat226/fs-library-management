import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { BorrowedBooksInfo } from "../../components/user/BorrowedBooksInfo";

export const BorrowedBooks = () => {
  return (
    <>
      <UserSideMenu childComp={<BorrowedBooksInfo />} />
    </>
  );
};
