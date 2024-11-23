import React from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

function Layout() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              Employee Manager
            </RouterLink>
          </Typography>

          {isAuthenticated() ? (
            <>
              <Button color="inherit" component={RouterLink} to="/employees">
                Employees
              </Button>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{user?.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: theme.palette.grey[200],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Employee Manager
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
