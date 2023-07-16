import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Container,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import UsersService from "services/users.service";

const Users = () => {
  const titleStyle = {
    marginBottom: 24,
  };

  const [usersFetched, setUsersFetched] = useState([]);

  const fetchUsers = async () => {
    const users = await UsersService.getAllUsers();
    setUsersFetched(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h5" component="h1" align="center" style={titleStyle} gutterBottom>
            Liste des utilisateurs du SDK
          </Typography>
          <Card>
            <List
              sx={{
                width: "98%",
                bgcolor: "background.paper",
                alignSelf: "center",
              }}
            >
              {usersFetched.map((value) => (
                <ListItem
                  key={value._id}
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label="comment">
                      <Icon fontSize="small">visibility</Icon>
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${value.companyName}`} />
                  <ListItemText primary={`${value.email}`} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Users;
