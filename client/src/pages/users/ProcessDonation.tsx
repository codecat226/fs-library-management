import React from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import DonateInfo from "components/user/DonateInfo";

export const ProcessDonation = () => {
  return (
    <>
      <UserSideMenu childComp={<DonateInfo />} />
    </>
  );
};
