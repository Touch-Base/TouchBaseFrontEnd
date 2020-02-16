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
            <a href="jobs">Jobs</a>
            <a href="jobs">Networking</a>
            <a href="jobs">Events</a>
            <button onClick={signOut}>sign out</button>
        </nav>
    )
}

export default DashboardNav;