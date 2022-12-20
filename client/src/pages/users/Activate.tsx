import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../services/userServices";
import { Button, Typography } from "@mui/material";

export const Activate = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await verifyUser(token);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <Typography component="h1" variant="h5">
        Activate Account:
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Yes, I want to activate my account
      </Button>
    </>
  );
};
