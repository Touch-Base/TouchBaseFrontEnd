import React from "react";
import "./App.css";
import { Router, Location } from "@reach/router";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/LandingPage/Home";
import Register from "./Components/LandingPage/Register";
import Login from "./Components/LandingPage/Login";
import Learn from "./Components/LandingPage/Learn";
import Blog from "./Components/LandingPage/Blog";
import Support from "./Components/LandingPage/Support";
import Pricing from "./Components/LandingPage/Pricing";
import ProtectedRoutes from "./Components/Auth/ProtectedRoutes";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const TransitionRouter = props => (
    <Location>
      {({ location }) => (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 2 }}
          >
            <Router location={location}>{props.children}</Router>
          </motion.div>
        </AnimatePresence>
      )}
    </Location>
  );

  return (
    <div className="App">
      <TransitionRouter>
        <LandingPage path="/">
          <Home path="/" />
          <Register path="register" />
          <Login path="login" />
          <Learn path="learn" />
          <Blog path="blog" />
          <Support path="support" />
          <Pricing path="pricing" />
        </LandingPage>
        <ProtectedRoutes path="dashboard/*" />
      </TransitionRouter>
      >
    </div>
  );
}

export default App;
