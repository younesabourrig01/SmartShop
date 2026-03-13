/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";

export const UserRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const AdminRoute = ({ children }: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};
