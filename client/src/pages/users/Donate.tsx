import React, { ChangeEvent, useState } from "react";
import { UserSideMenu } from "layouts/UserSideMenu";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const Donate = () => {
  const [amount, setAmount] = useState<number>(0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    Number(e.target.value) < 0
      ? Number((e.target.value = "0"))
      : Number(e.target.value);
    setAmount(Number(e.target.value));
  };
  return (
    <>
      <Box sx={{ width: 700, mt: 20, mb: 6, ml: 50 }}>
        <Typography variant="h2">
          Make a donation today &nbsp;&hearts;
        </Typography>
        <br />
        <Typography variant="h6">
          This Library is run solely by volunteers.
          <br />
          Please help us keep this library in business with your donations.
          <br />
          <br />- Integrify Public Library
        </Typography>
      </Box>
      <Box sx={{ width: 600, ml: 50 }}>
        <Paper elevation={8} sx={{ padding: 7 }}>
          <Typography variant="h4">Donation Form</Typography>
          <br />
          <TextField
            id="outlined-number"
            label="Amount in euros (&euro;)"
            type="number"
            value={amount}
            onChange={handleChange}
          />
          <br />
          <Button
            variant="contained"
            component={Link}
            state={amount}
            to={`/dashboard/user/make-donation`}
            sx={{ marginTop: 4, fontSize: "1.1rem" }}
          >
            Donate Now
          </Button>
        </Paper>
      </Box>
      <UserSideMenu />
    </>
  );
};
