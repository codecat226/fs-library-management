import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { UpdateAuthor } from "types/authorTypes";
import { updateAuthor } from "services/authorServices";

export const AdminUpdateAuthorInfo = () => {
  const { state } = useLocation();
  const { name, _id } = state;
  const [updatedAuthor, setUpdatedAuthor] = useState({});
  const [requestSent, setRequestSent] = useState(false);

  const initialState: UpdateAuthor = {
    name: name,
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialState,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
    }),
    onSubmit: async (values: UpdateAuthor, { resetForm }) => {
      try {
        const res = await updateAuthor(values, _id);
        if (res.status === 200) {
          setUpdatedAuthor(res.data.data);
          toast.success(res.data.message);
          setRequestSent(true);
          resetForm({});
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        setRequestSent(false);
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
            Update author:
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
            />
            <Box mb={5} mt={5}>
              <Button
                fullWidth
                variant="contained"
                style={{ fontSize: "1.1rem", backgroundColor: "#3a4c40" }}
                type="submit"
              >
                UPDATE AUTHOR
              </Button>
            </Box>
            <Button
              component={Link}
              state={requestSent ? updatedAuthor : state}
              to={`/dashboard/admin/author-data`}
            >
              Go back
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
