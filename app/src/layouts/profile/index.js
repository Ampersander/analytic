/**
=========================================================
* Analytics KPI React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Analytics KPI React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Analytics KPI React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";

import { useState, useEffect } from "react";
import AuthService from "services/auth.service";
import { Box, Typography, Button, TextField } from "@mui/material";

function Overview() {
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    address: "",
    corsApp: "",
    appId: "",
    appSecret: "",
  });
  const isConnected = AuthService.getCurrentUser();

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    AuthService.getProfile().then((user) => {
      setCurrentUser(user);
      setUpdatedUser({
        name: user.name,
        email: user.email,
        password: "",
        companyName: user.companyName,
        address: user.address,
        corsApp: user.corsApp,
        appId: user.appId,
        appSecret: user.appSecret,
      });
    });
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log(updatedUser);
    AuthService.updateProfile(updatedUser)
      .then((response) => {
        const user = response.data;
        setCurrentUser(user);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du profil :", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header currentUser={currentUser}>
        <Typography variant="h2" fontWeight="bold" textAlign="center">Mon Profil</Typography>
        <Typography variant="h5" fontWeight="bold" textAlign="center" style={{ marginTop: 50 }}>Connectez vous pour gérer votre profil !</Typography>

        <Box mt={5} mb={3} display="flex" justifyContent="center">
          {currentUser && !editMode && (
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Nom: <span style={{ fontWeight: "normal" }}>{currentUser.name}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Email: <span style={{ fontWeight: "normal" }}>{currentUser.email}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Mot de passe: <span style={{ fontWeight: "normal" }}>{currentUser.password}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Nom de l'entreprise: <span style={{ fontWeight: "normal" }}>{currentUser.companyName}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Adresse: <span style={{ fontWeight: "normal" }}>{currentUser.address}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                URL Site: <span style={{ fontWeight: "normal" }}>{currentUser.corsApp}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                App ID: <span style={{ fontWeight: "normal" }}>{currentUser.appId}</span>
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                App Secret: <span style={{ fontWeight: "normal" }}>{currentUser.appSecret}</span>
              </Typography>
              <Button variant="contained" onClick={handleEdit} sx={{ mt: 2 }} style={{ color: '#fff' }}>
                Modifier
              </Button>
            </Box>
          )}
          {currentUser && editMode && (
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              onSubmit={handleSave}
            >
              <TextField
                name="name"
                label="Nom"
                value={updatedUser.name}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                name="email"
                label="Email"
                value={updatedUser.email}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                type="password"
                name="password"
                label="Mot de passe"
                value={updatedUser.password}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                name="companyName"
                label="Nom de l'entreprise"
                value={updatedUser.companyName}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                name="address"
                label="Adresse"
                value={updatedUser.address}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                name="corsApp"
                label="URL Site"
                value={updatedUser.corsApp}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                name="appId"
                label="App ID"
                value={updatedUser.appId}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />
              <TextField
                name="appSecret"
                label="App Secret"
                value={updatedUser.appSecret}
                onChange={handleInputChange}
                sx={{ mt: 1, mb: 2 }}
                required
              />

              <Button variant="contained" type="submit" sx={{ mt: 2 }} style={{ color: "#fff" }}>
                Enregistrer
              </Button>
            </Box>
          )}
        </Box>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
