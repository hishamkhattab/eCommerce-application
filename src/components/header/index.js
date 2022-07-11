import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signoutUser} from "./../../store/userSlice";
import { checkCurrentUserIsAdmin} from "./../../utils";
import "./style.scss";

const Header = () => {
  const { username, currentUser } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const isAdmin = checkCurrentUserIsAdmin(currentUser);
  return (
    <div className='header'>
      {isAdmin &&
        <div className="admin-wrapper">
        <Link to="/admin">Admin</Link>
      </div>}
      <div className="header-wrapper">
        <div className="logo-wrapper">
          <Link to="/">
            <h1 className='logo'>LOGO</h1>
          </Link>
        </div>
        <ul className="header-links">
          {username &&
          <li>
            <Link to="/">{username}</Link>
          </li>
          }
          <li>
          {username === "" && <Link to="/register">register</Link>}
          </li>
          <li>
            {username === "" && <Link to="/login">login</Link>}
            {username && <Link to="" onClick={() => dispatch(signoutUser())}>logout</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header
