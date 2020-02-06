import React from 'react';
import '../../Styling/dashboard/dashboardnav.scss';
import { navigate } from '@reach/router';

function DashboardNav() {

    const signOut = () => {
        window.localStorage.clear();
        navigate('/');
        };

    return (
        <nav className="dashboardNav">
            <a href="profile">Profile</a>
            <a href="#">Jobs</a>
            <a href="#">Networking</a>
            <a href="#">Events</a>
            <button onClick={signOut}>sign out</button>
        </nav>
    )
}

export default DashboardNav;