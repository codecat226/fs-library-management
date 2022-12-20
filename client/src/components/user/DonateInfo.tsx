import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "app/hooks";
import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchBrainTreeToken,
  processBrainTreeDonation,
} from "../../services/userServices";

const DonateInfo = () => {
  const { user } = useAppSelector((state) => state.userR);
  const navigate = useNavigate();
  const [brainTreeToken, setBrainTreeToken] = useState("");
  const [instance, setInstance] = useState<any | undefined>("");
  const { state } = useLocation();
  const amount = state;

  const getBraintreeToken = async () => {
    try {
      const res = await fetchBrainTreeToken();
      setBrainTreeToken(res.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBraintreeToken();
  }, []);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const res = await processBrainTreeDonation(nonce, amount, user.email);
      if (res.status === 200) {
        toast.success("Donation confirmation email sent!");
        await delay(3000);
        navigate("/dashboard/user/donate");
      }
    } catch (error: any) {
      console.log(error);
      navigate("/dashboard/user/donate");
    }
  };

  return (
    <>
      <Box sx={{ width: 500 }} textAlign="center">
        {brainTreeToken && (
          <div>
            <DropIn
              options={{ authorization: brainTreeToken }}
              onInstance={(instance) => setInstance(instance)}
            />
            <Button size="large" onClick={handlePayment} variant="contained">
              Donate now
            </Button>
          </div>
        )}
      </Box>
    </>
  );
};

export default DonateInfo;
