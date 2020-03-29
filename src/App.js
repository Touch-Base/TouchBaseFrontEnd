import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import ProtectedRoutes from "./Components/Auth/ProtectedRoutes";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoutes path="/dashboard" />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
