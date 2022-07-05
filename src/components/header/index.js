import React from 'react'
import { Link } from 'react-router-dom';

import "./style.scss";

const Header = () => {
  return (
    <div className='header'>
      <div className="header-wrapper">
        <Link to="/">
          <h1 className='logo'>LOGO</h1>
        </Link>
      </div>

      <div className="header-links">
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Header
