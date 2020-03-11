import React, { useState } from 'react';
import '../../Styling/dashboard/dashboardnav.scss';
import { navigate } from '@reach/router';
import navLogo from '../../img/touchbaseblack.png';

function DashboardNav() {
    
    // this changes the value for the sign out warning
    const [ warning, setWarning ] = useState(false);
    
    // adds a 2 second delay to signing out
    setTimeout(const signOut = () => {
        window.localStorage.clear();
        navigate('/');
        }, 2000);

    return (
        <nav className="dashboardNav">
            <a href="/">
              <img src={navLogo} alt="navLogo" />
            </a>
            <a href="profile">Profile</a>
            <a href="jobs">Jobs</a>
            <a href="networking">Networking</a>
            <a href="events">Events</a>
            <button id="signOutButton" onMouseEnter={setWarning(true)} onMouseExit={setWarning(false)} onClick={signOut}>
                <i className="fas fa-sign-out-alt"></i>
            </button>
            {warning ? <h3 className="signOut">Sign Out?</h3> : null}
        </nav>
    )
}

export default DashboardNav;
