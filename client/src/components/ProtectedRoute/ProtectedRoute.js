import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookie from "universal-cookie";
const cookies = new Cookie();

export function PrivateRoute({ children }) {
  let location = useLocation();
  if (!cookies.get("token_chat_user")) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
