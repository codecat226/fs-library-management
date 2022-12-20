import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRegister } from "../../types/userTypes";
import { registerUser } from "../../services/userServices";
import Image from "../../images/book-bg.webp";

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      image: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      firstname: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      lastname: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values: UserRegister, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("image", values.image);
        const res = await registerUser(formData);
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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PermIdentityIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 6 }}
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="firstname"
                  type="firstname"
                  id="firstname"
                  {...formik.getFieldProps("firstname")}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="lastname"
                  label="lastname"
                  id="lastname"
                  {...formik.getFieldProps("lastname")}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button variant="outlined" component="label">
                Upload File
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="file_input"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!event.currentTarget.files) return;
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  accept="image/*"
                  hidden
                />
              </Button>
            </Box>
            <Box mb={5} mt={5}>
              <Button
                fullWidth
                variant="contained"
                style={{ fontSize: "1.1rem" }}
                type="submit"
              >
                Register
              </Button>
            </Box>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
