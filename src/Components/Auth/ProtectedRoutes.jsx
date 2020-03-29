import React from "react";
import "../../Styling/home.scss";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

function ProtectedRoutes() {
  // eslint-disable-next-line consistent-return
  function getToken() {
    try {
      const token = localStorage.getItem("token");
      return token;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return null;
    }
  }

  const token = getToken();

  if (!token) {
    console.log("no token");
    return <Redirect to="/" noThrow />;
  } else {
    return <Dashboard />;
  }
}

export default ProtectedRoutes;
