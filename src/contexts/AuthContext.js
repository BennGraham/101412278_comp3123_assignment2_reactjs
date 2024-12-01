import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const signup = async (userData) => {
    try {
      const response = await api.post("/user/signup", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });

      if (response.data.message === "User created successfully.") {
        const user = {
          id: response.data.user_id,
          username: userData.username,
          email: userData.email,
        };

        setUser(user);
        return user;
      }
    } catch (error) {
      console.error("Signup error details:", {
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful.") {
        const token = response.data.token;
        const user = {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("userName", user.username);
        setToken(token);
        setUser(user);

        return user;
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!token;
  };

  useEffect(() => {
    if (token) {
      const requestInterceptor = api.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => Promise.reject(error)
      );

      return () => {
        api.interceptors.request.eject(requestInterceptor);
      };
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
