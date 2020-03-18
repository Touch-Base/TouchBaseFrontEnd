import React, { useState } from 'react';
import '../../Styling/dashboard/dashboardnav.scss';
import { navigate, redirectTo } from '@reach/router';
import navLogo from '../../img/touchbaseblack.png';

function DashboardNav() {
    
    // this changes the value for the sign out warning
    const [ warning, setWarning ] = useState(false);
    
    // adds a 2 second delay to signing out
    const signOut = () => {
        window.localStorage.clear();
        setTimeout(() => navigate('/'), 1000);
        };

    // change warning value
    const warningHandler = event => {
        event.preventDefault();

        setWarning(!warning)
    }

    return (
        <nav className="dashboardNav">
            <a href="#">
              <img src={navLogo} alt="navLogo" />
            </a>
            <a href="profile">Profile</a>
            <a href="jobs">Jobs</a>
            <a href="networking">Networking</a>
            <a href="events">Events</a>
            <button id="signOutButton" onMouseEnter={warningHandler} onMouseLeave={warningHandler} onClick={signOut}>
                <i className="fas fa-sign-out-alt"></i>
            </button>
            <h3 className="signOut" style={warning ? {opacity: 1} : {opacity: 0}}>Sign Out?</h3>
        </nav>
    )
}

export default DashboardNav;
