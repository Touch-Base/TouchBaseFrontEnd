import React from "react";
import "../../Styling/home.scss";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

function ProtectedRoutes({ path }) {
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
    return <Redirect to={{ pathname: "/login", error: true }} />;
  } else {
    return <Route path={path} component={Dashboard} />;
  }
}

export default ProtectedRoutes;
