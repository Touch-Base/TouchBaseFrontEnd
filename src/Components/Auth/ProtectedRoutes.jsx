import React from "react";
import { Router, Redirect, Link, Location } from "@reach/router";
import Dashboard from "../Dashboard/Dashboard";
import Overview from "../Dashboard/Overview";
import Profile from "../Dashboard/Profile";
import Jobs from "../Dashboard/Jobs";
import Networking from "../Dashboard/Networking";
import Events from "../Dashboard/Events";
import "../../Styling/home.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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

  /// setting up pose group for component transitions
  const FadeTransitionRouter = props => (
    <Location>
      {({ location }) => (
        <TransitionGroup className="transition-group">
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            {/* the only difference between a router animation and
                any other animation is that you have to pass the
                location to the router so the old screen renders
                the "old location" */}
            <Router location={location} className="router">
              {props.children}
            </Router>
          </CSSTransition>
        </TransitionGroup>
      )}
    </Location>
  );

  const token = getToken();

  if (!token) {
    console.log("no token");
    return <Redirect to="/" noThrow />;
  } else {
    return (
      <FadeTransitionRouter>
        <Dashboard path="/">
          <Overview path="/" />
          <Profile path="/profile" />
          <Jobs path="/jobs" />
          <Networking path="/networking" />
          <Events path="/events" />
        </Dashboard>
      </FadeTransitionRouter>
    );
  }
}

export default ProtectedRoutes;
