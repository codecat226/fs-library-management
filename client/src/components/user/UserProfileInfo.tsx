import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Stack } from "@mui/system";
import { fetchUser } from "features/userProfileSlice";
axios.defaults.withCredentials = true;

export const UserProfileInfo = () => {
  const { user } = useAppSelector((state) => state.userR);
  const dispatch = useAppDispatch();
  const { username, firstname, lastname, email, image } = user;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        marginLeft: 15,
        maxWidth: 700,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h2" component="h2">
          {username}
        </Typography>
      </Box>
      <Box
        component="img"
        sx={{
          height: 250,
          width: 230,
          marginBottom: 3,
          border: 3,
        }}
        src={`http://localhost:4000/${image}`}
        alt={user.username}
      />
      <List disablePadding>
        <ListItem>
          <Typography variant="h5">First Name: &nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={firstname}
          />
        </ListItem>
        <ListItem>
          <Typography variant="h5">Last Name: &nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={lastname}
          />
        </ListItem>
        <ListItem>
          <Typography variant="h5">Email: &nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={email}
          />
        </ListItem>
      </List>
      <br />
      <Stack spacing={3} width={400}>
        <Button
          variant="contained"
          style={{ fontSize: "1.1rem" }}
          component={Link}
          state={user}
          to={"/dashboard/user/edit-profile"}
        >
          EDIT PROFILE
        </Button>
        <Button
          variant="contained"
          style={{ fontSize: "1.1rem" }}
          component={Link}
          to={"/dashboard/user/change-password"}
        >
          CHANGE PASSWORD
        </Button>
      </Stack>
    </Box>
  );
};
