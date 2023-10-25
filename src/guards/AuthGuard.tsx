import React from "react";
import useAuth from "../core/auth/useAuth";
import { Navigate } from "react-router-dom";

type AuthGuardProps = { children: React.ReactNode };

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { jwt } = useAuth();
  const token = jwt.getToken();
  const isAuthenticated = jwt.isValidToken(token ? token : "");

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};
export default AuthGuard;
