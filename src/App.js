import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeView from "./components/EmployeeView";
import AuthRoute from "./components/AuthRoute";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "employees",
        element: (
          <AuthRoute>
            <EmployeeView />
          </AuthRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
