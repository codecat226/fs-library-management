import * as React from "react";
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
import { AuthorInBook } from "types/authorTypes";

export const UserSingleAuthorData = () => {
  const { state } = useLocation();
  const { name, writtenBooks } = state;

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
        {name}
      </Typography>
      <br />
      <Divider />
      <br />
      <Typography variant="h5" component="h5">
        Books written by this author:
      </Typography>
      <br />
      <List>
        {writtenBooks &&
          writtenBooks.map((book: AuthorInBook) => {
            return (
              <ListItem key={book._id}>
                <ListItemIcon>
                  <CropSquareIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "1.2rem" }}
                  primary={book.title}
                />
              </ListItem>
            );
          })}
      </List>
      <Box sx={{ marginTop: 10 }}>
        <Button size="large" component={Link} to={`/dashboard/user/authors`}>
          Go back
        </Button>
      </Box>
    </Box>
  );
};
