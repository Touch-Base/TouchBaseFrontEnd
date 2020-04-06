import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import ProtectedRoutes from "./Components/Auth/ProtectedRoutes";
import { Route, Switch, useLocation } from "react-router-dom";
import Footer from "./Components/Helpers/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Switch>
        <ProtectedRoutes path="/dashboard/" />
        <Route path="/" component={LandingPage} />
      </Switch>
      <Footer color={location.pathname === "/dashboard"} />
    </div>
  );
}

export default App;
