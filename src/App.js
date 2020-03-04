import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/LandingPage/Home';
import Register from './Components/LandingPage/Register';
import Login from './Components/LandingPage/Login';
import Teams from './Components/LandingPage/Teams';
import Learn from './Components/LandingPage/Learn';
import Blog from './Components/LandingPage/Blog';
import Support from './Components/LandingPage/Support';
import Pricing from './Components/LandingPage/Pricing';
import ProtectedRoutes from './Components/Auth/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <LandingPage path="/">
          <Home path="/" />
          <Register path="register" />
          <Login path="login" />
          <Teams path="teams" />
          <Learn path="learn" />
          <Blog path="blog" />
          <Support path="support" />
          <Pricing path="pricing />
        </LandingPage>
        <ProtectedRoutes path="dashboard/*" />
      </Router>
    </div>
  );
}

export default App;
