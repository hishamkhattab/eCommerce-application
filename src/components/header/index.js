import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signoutUser} from "./../../store/userSlice";
import "./style.scss";

const Header = () => {
  const { username } = useSelector(state => state.users);
  const dispatch = useDispatch();

  console.log(username);
  return (
    <div className='header'>
      <div className="header-wrapper">
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
  );
}

export default Header
