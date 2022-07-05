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

      <ul className="header-links">
        <li>
          <Link to="/register">register</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header
