import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { resetPassword } from "../../services/userServices";
import { ResetUser } from "../../types/userTypes";

export const ResetPassword = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values: ResetUser, { resetForm }) => {
      try {
        const res = await resetPassword(values, token);
        if (res.status === 201) {
          toast.success(res.data.message);
          resetForm({});
          navigate("/login");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            width: 600,
            my: 2,
            mx: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password:{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 6, width: 400 }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              className="form__section"
              label="password"
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box mb={5} mt={5}>
              <Button
                fullWidth
                variant="contained"
                style={{ fontSize: "1.1rem", backgroundColor: "#3a4c40" }}
                type="submit"
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
