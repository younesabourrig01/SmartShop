/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Regular logged-in users only — admins are redirected to dashboard
export const UserRoute = ({ children }: any) => {
  const { token, user } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const AdminRoute = ({ children }: any) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
