import React from 'react';
import '../../Styling/dashboard/dashboardnav.scss'

function DashboardNav() {

    return (
        <nav className="dashboardNav">
            <a href="#">Profile</a>
            <a href="#">Jobs</a>
            <a href="#">Networking</a>
            <a href="#">Events</a>
        </nav>
    )
}

export default DashboardNav;