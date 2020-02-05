import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/LandingPage/Home';
import Register from './Components/LandingPage/Register';
import Login from './Components/LandingPage/Login';
import ProtectedRoutes from './Components/Auth/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <LandingPage path="/">
          <Home path="/" />
          <Register path="register" />
          <Login path="login" />
        </LandingPage>
        <ProtectedRoutes path="dashboard/*" />
      </Router>
    </div>
  );
}

export default App;
