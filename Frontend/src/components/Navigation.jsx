import React from 'react';
import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <nav className='nav-bar'>
      <ul>
        <li><Link className={'link-style'} to="/">Home</Link></li>
       <li><Link className={'link-style'} to="/pilots">Pilots</Link></li> 
        <li><Link className={'link-style'} to="/aircraft">Aircraft</Link></li>
        <li><Link className={'link-style'} to="/aircraftType">Aircraft Type</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;