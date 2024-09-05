import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Healthcare System</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/patients">Patients</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/portal">Patient Portal</Link></li>
                <li><Link to="/reconciliation">Reconciliation</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
