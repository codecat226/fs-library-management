import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AddAuthorInitialValues } from "../../types/authorTypes";
import { createAuthor } from "services/authorServices";

export const AdminAddAuthorInfo = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
    }),
    onSubmit: async (values: AddAuthorInitialValues, { resetForm }) => {
      try {
        const res = await createAuthor(values);
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
            Create a new author:
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
              label="name"
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Box mb={5} mt={5}>
              <Button
                fullWidth
                variant="contained"
                style={{ fontSize: "1.1rem", backgroundColor: "#3a4c40" }}
                type="submit"
              >
                Create Author
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
