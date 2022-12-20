import React from "react";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "app/hooks";
import { AdminSideMenu } from "../../layouts/AdminSideMenu";
import Image from "../../images/home-bg.webp";

export const AdminDashboard = () => {
  const { user } = useAppSelector((state) => state.userR);
  const todayDate = new Date().toDateString();

  return (
    <>
      <AdminSideMenu />
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
