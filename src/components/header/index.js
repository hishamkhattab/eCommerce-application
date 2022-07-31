import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import { signoutUser } from "../../store/userSlice";
import { checkCurrentUserIsAdmin } from "../../utils";

import "./style.scss";

const mapppedState = (state) => ({
  currentUser: state.users.currentUser,
  cartTotal: state.carts.cart.length,
});

function Header() {
  const { currentUser, cartTotal } = useSelector(mapppedState);
  const dispatch = useDispatch();

  const isAdmin = checkCurrentUserIsAdmin(currentUser);

  const [searchParam, setSearchParam] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [ref, inView] = useInView();

  console.log(inView);
  return (
    <nav className="header" ref={ref}>
      {inView && isAdmin && (
        <div className="admin">
          <Link to="/admin">Admin</Link>
        </div>
      )}

      {inView && (
        <div className="main-item">
          <ul className="search">
            <li>
              <AiOutlineSearch onClick={() => setShowSearch((prev) => !prev)} />
              {showSearch && (
                <input type="text" value={searchParam} onChange={({ target }) => setSearchParam(target.value)} />
              )}
              {showSearch && <AiOutlineClose className="close-search" onClick={() => setShowSearch((prev) => !prev)} />}
            </li>
          </ul>

          <ul className="logo">
            <li>
              <Link to="/">
                <img src="/assets/Babylon-logos_white.png" alt="logo" />
              </Link>
            </li>
          </ul>

          <ul className="sign-logo">
            <li className="shopping-cart-container">
              <Link to="/cart">
                <AiOutlineShopping className="shopping-cart" />
                <span>{cartTotal}</span>
              </Link>
            </li>
            <li>
              {Object.keys(currentUser).length === 0 && (
                <Link to="/login">
                  <AiOutlineLogin />
                </Link>
              )}
              {currentUser?.displayName && <AiOutlineUser />}
            </li>
            <li>
              {currentUser?.displayName && (
                <Link to="" onClick={() => dispatch(signoutUser())}>
                  <AiOutlineLogout />
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      <ul className={inView ? "nav-links" : "nav-links sticky"}>
        <li>
          <Link to="/">women</Link>
        </li>

        <li>
          <Link to="/">men</Link>
        </li>

        <li>
          <Link to="/">top</Link>
        </li>

        <li>
          <Link to="/">down</Link>
        </li>

        <li>
          <Link to="/">jeans</Link>
        </li>

        <li>
          <Link to="/">Summer</Link>
        </li>

        <li>
          <Link to="/">winter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
