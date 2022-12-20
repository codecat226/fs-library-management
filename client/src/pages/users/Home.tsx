import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Image from "../../images/home-bg.webp";

export const Home = () => {
  return (
    <Paper
      elevation={8}
      sx={{
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: 13,
        padding: 0,
        height: "65vh",
      }}
    >
      <Box
        sx={{
          my: 8,
          mx: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ marginTop: 4 }}>
          <AccountBalanceIcon fontSize="inherit" sx={{ paddingTop: 3 }} />
          <br />
          INTEGRIFY
          <br />
          PUBLIC
          <br />
          LIBRARY
          <br />
        </Typography>
      </Box>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack spacing={14} direction="row" sx={{ marginTop: 10 }}>
          <Button
            component={Link}
            to={`/login`}
            variant="contained"
            style={{ fontSize: "1.1rem" }}
          >
            Go to Login
          </Button>
          <Button
            component={Link}
            to={`/register`}
            variant="contained"
            style={{ fontSize: "1.1rem" }}
          >
            Go to Register
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
