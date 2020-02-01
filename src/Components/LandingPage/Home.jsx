import React from 'react';
import '../../Styling/home.scss'
import logo from '../../img/touchbase.png';

function Home() {
    return (
      <div className="homeBlock">
        <img className="logo" src={logo} alt="logo" />
        <h1>
            Your entire <span className="jobWord">job</span> search, 
            <br/><span className="secondLine">all in one place.</span>
        </h1>
        <div className="homeLinks">
            <div className="homeLink">
                <i class="fas fa-clipboard-list"></i>
                <a id="reg" href="#">Register</a>
            </div>
            <div className="homeLink">
                <i class="fas fa-arrow-circle-down"></i>
                <a id="log" href="#">Login</a>
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  