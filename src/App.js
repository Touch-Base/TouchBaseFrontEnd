import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './Components/LandingPage/Home';
import TopNav from './Components/LandingPage/TopNav';
import Register from './Components/LandingPage/Register';
import Login from './Components/LandingPage/Login';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Router>
        <Home path="/" />
        <Register path="register" />
        <Login path="login" />
        {/* <ProtectedRoutes path="dashboard/*" /> */}
      </Router>
    </div>
  );
}

export default App;
