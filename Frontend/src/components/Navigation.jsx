import React from 'react';
import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/pilots">Pilots</Link>
        <Link to="/aircraft">Aircraft</Link>
    </nav>
  );
}

export default Navigation;