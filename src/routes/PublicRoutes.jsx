import React from "react";

import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export const PublicRoutes = ({}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};
