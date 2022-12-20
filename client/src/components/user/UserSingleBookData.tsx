import * as React from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { useAppSelector } from "app/hooks";
import { toast } from "react-toastify";
import { borrowBook } from "services/bookServices";

const UserSingleBookData = () => {
  const { user } = useAppSelector((state) => state.userR);
  const { state } = useLocation();
  const {
    createdAt,
    updatedAt,
    _id,
    ISBN,
    title,
    description,
    status,
    author,
    publisher,
    publishDate,
  } = state;
  const createDate = format(parseISO(createdAt), "MM/dd/yyyy 'at' h:mm a");
  const updateDate = format(parseISO(updatedAt), "MM/dd/yyyy 'at' h:mm a");

  const onBorrowBook = async () => {
    try {
      const res = await borrowBook(_id, user._id);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: 15,
        maxWidth: 700,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
      <List>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">ISBN:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={ISBN}
          />
        </ListItem>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">Author:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={author?.name}
          />
        </ListItem>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5">Description:&nbsp;</Typography>
        </Box>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={description}
          />
        </ListItem>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">Publisher:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={publisher}
          />
        </ListItem>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">Publish Date:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={publishDate}
          />
        </ListItem>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">Availability:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={status ? "Available" : "Unavailable"}
          />
        </ListItem>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">Created At:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={createDate}
          />
        </ListItem>
        <ListItem sx={{ mb: 1 }}>
          <ListItemIcon>
            <CropSquareIcon />
          </ListItemIcon>
          <Typography variant="h5">Last Updated At:&nbsp;</Typography>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1.2rem" }}
            primary={updateDate}
          />
        </ListItem>
      </List>
      <br />
      <Divider />
      <Button
        fullWidth
        variant="contained"
        style={{ fontSize: "1.1rem" }}
        onClick={onBorrowBook}
      >
        BORROW THIS BOOK
      </Button>
      <Box sx={{ marginTop: 10 }}>
        <Button size="large" component={Link} to={`/dashboard/user/library`}>
          Go back
        </Button>
      </Box>
    </Box>
  );
};

export default UserSingleBookData;
