import React from "react";

import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export const PrivateRoutes = ({}) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
