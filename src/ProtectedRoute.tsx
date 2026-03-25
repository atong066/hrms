import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const LogoutRoute = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return <Navigate to="/" replace />;
};

export const FallbackRoute = () => {
  const token = localStorage.getItem("token");

  return <Navigate to={token ? "/dashboard" : "/"} replace />;
};
