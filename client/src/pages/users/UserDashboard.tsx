import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { UserSideMenu } from "layouts/UserSideMenu";
import Image from "../../images/home-bg.webp";

export const UserDashboard = () => {
  const { user } = useAppSelector((state) => state.userR);
  const todayDate = new Date().toDateString();

  return (
    <>
      <UserSideMenu />
      <Box sx={{ marginTop: 10 }}>
        <Typography align="right" variant="h4" sx={{ m: 3 }}>
          Welcome {user.username}!
        </Typography>
        <Typography align="right" variant="h5" sx={{ m: 3 }}>
          {todayDate}
        </Typography>
      </Box>
      <Paper
        elevation={8}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 0,
          height: "55vh",
        }}
      ></Paper>
    </>
  );
};
