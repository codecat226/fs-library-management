import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { createBook } from "services/bookServices";
import { AddBookInitialValues } from "../../types/bookTypes";

export const AdminAddBookInfo = () => {
  const formik = useFormik({
    initialValues: {
      ISBN: "",
      title: "",
      description: "",
      publisher: "",
      author: "",
      status: true,
      publishDate: "",
    },
    validationSchema: Yup.object({
      ISBN: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      title: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      description: Yup.string()
        .min(20, "Must be at least 20 characters")
        .required("Required"),
      publisher: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      publishDate: Yup.string()
        .required("Required")
        .matches(
          /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/,
          "Must be in mm/dd/yyyy format"
        ),
    }),
    onSubmit: async (values: AddBookInitialValues, { resetForm }) => {
      try {
        const res = await createBook(values);
        if (res.status === 201) {
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
      <CssBaseline />
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
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create a new book:
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 6 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  className="form__section"
                  label="ISBN"
                  type="text"
                  id="ISBN"
                  {...formik.getFieldProps("ISBN")}
                  error={formik.touched.ISBN && Boolean(formik.errors.ISBN)}
                  helperText={formik.touched.ISBN && formik.errors.ISBN}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="title"
                  type="title"
                  id="title"
                  {...formik.getFieldProps("title")}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  rows="6"
                  multiline
                  type="description"
                  label="description"
                  id="description"
                  {...formik.getFieldProps("description")}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="publisher"
                  id="publisher"
                  label="publisher"
                  {...formik.getFieldProps("publisher")}
                  error={
                    formik.touched.publisher && Boolean(formik.errors.publisher)
                  }
                  helperText={
                    formik.touched.publisher && formik.errors.publisher
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="author"
                  label="author"
                  id="author"
                  {...formik.getFieldProps("author")}
                  error={formik.touched.author && Boolean(formik.errors.author)}
                  helperText={formik.touched.author && formik.errors.author}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  className="form__section"
                  label="publish date"
                  type="text"
                  id="publishDate"
                  {...formik.getFieldProps("publishDate")}
                  error={
                    formik.touched.publishDate &&
                    Boolean(formik.errors.publishDate)
                  }
                  helperText={
                    formik.touched.publishDate && formik.errors.publishDate
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel component="legend">Available</FormLabel>
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Box mb={5} mt={5}>
              <Button
                fullWidth
                variant="contained"
                style={{ fontSize: "1.1rem", backgroundColor: "#3a4c40" }}
                type="submit"
              >
                Create Book
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
