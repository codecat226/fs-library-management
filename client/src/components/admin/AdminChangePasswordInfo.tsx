import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserPassword } from "types/userTypes";
import { Link } from "react-router-dom";
import { changePassword } from "services/userServices";
import { useAppSelector } from "app/hooks";

export const AdminChangePasswordInfo = () => {
  const { user } = useAppSelector((state) => state.userR);
  const formik = useFormik({
    initialValues: {
      _id: "",
      username: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Must provide your username"),
      oldpassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      newpassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmpassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values: updateUserPassword, { resetForm }) => {
      try {
        const res = await changePassword(values, user._id);
        if (res.status === 200) {
          toast.success(res.data.message);
          resetForm({});
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
          width: 500,
          my: 2,
          mx: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Typography component="h1" variant="h5">
          Change Password:
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 6 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                className="form__section"
                label="username"
                type="text"
                id="username"
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="oldpassword"
                type="password"
                id="old password"
                {...formik.getFieldProps("oldpassword")}
                error={
                  formik.touched.oldpassword &&
                  Boolean(formik.errors.oldpassword)
                }
                helperText={
                  formik.touched.oldpassword && formik.errors.oldpassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="newpassword"
                id="new password"
                {...formik.getFieldProps("newpassword")}
                error={
                  formik.touched.newpassword &&
                  Boolean(formik.errors.newpassword)
                }
                helperText={
                  formik.touched.newpassword && formik.errors.newpassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                id="confirmpassword"
                label="confirm password"
                {...formik.getFieldProps("confirmpassword")}
                error={
                  formik.touched.confirmpassword &&
                  Boolean(formik.errors.confirmpassword)
                }
                helperText={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                }
              />
            </Grid>
          </Grid>
          <Box mb={5} mt={5}>
            <Button
              fullWidth
              variant="contained"
              style={{ fontSize: "1.1rem", backgroundColor: "#3a4c40" }}
              type="submit"
            >
              Change Password
            </Button>
          </Box>
        </Box>
        <Link to={`/dashboard/admin/profile`}>{"Back to profile"}</Link>
      </Box>
    </>
  );
};
