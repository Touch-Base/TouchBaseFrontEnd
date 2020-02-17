import React from 'react';
import { Router, Redirect } from '@reach/router';
import Dashboard from '../Dashboard/Dashboard';
import Overview from '../Dashboard/Overview';
import Profile from '../Dashboard/Profile';
import Jobs from '../Dashboard/Jobs';
import Networking from '../Dashboard/Networking';

function ProtectedRoutes() {
    // eslint-disable-next-line consistent-return
    function getToken() {
      try {
        const token = localStorage.getItem('token');
        return token;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return null;
      }
    }
    const token = getToken();
  
    if (!token) {
      console.log("no token")
      return <Redirect to="/" noThrow />;
    } else {
      return (
        <Router>
          <Dashboard path="/">
            <Overview path="/" />
            <Profile path="/profile" />
            <Jobs path="/jobs" />
            <Networking path="/networking" />
          </Dashboard>
        </Router>
      );
      }
  }
  
  export default ProtectedRoutes;