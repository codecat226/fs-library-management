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

const AdminSingleBookData = () => {
  const { state } = useLocation();
  const { title, ISBN, publisher, publishDate, status, description, author } =
    state;
  const createDate = format(
    parseISO(state.createdAt),
    "MM/dd/yyyy 'at' h:mm a"
  );
  const updateDate = format(
    parseISO(state.updatedAt),
    "MM/dd/yyyy 'at' h:mm a"
  );

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
        component={Link}
        state={state}
        to={`/dashboard/admin/update-book`}
      >
        UPDATE THIS BOOK
      </Button>
      <Box sx={{ marginTop: 7 }}>
        <Button size="large" component={Link} to={`/dashboard/admin/library`}>
          Go back
        </Button>
      </Box>
    </Box>
  );
};

export default AdminSingleBookData;
