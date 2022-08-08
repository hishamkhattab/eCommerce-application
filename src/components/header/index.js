import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import { AiOutlineSearch, AiOutlineShopping, AiOutlineClose, AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { signoutUser } from "../../store/userSlice";
import { checkCurrentUserIsAdmin } from "../../utils";

import "./style.scss";

const mapppedState = (state) => ({
  currentUser: state.users.currentUser,
  cartTotal: state.carts.cart.length,
});

function Header() {
  const location = useLocation();
  const { currentUser, cartTotal } = useSelector(mapppedState);
  const dispatch = useDispatch();

  const isAdmin = checkCurrentUserIsAdmin(currentUser);

  const [searchParam, setSearchParam] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);
  const [ref, inView] = useInView();

  return (
    <nav className="header" ref={ref}>
      {(inView || location.pathname !== "/") && isAdmin && (
        <div className="admin">
          <Link to="/admin">Admin</Link>
        </div>
      )}

      {(inView || location.pathname !== "/") && (
        <div className="main-item">
          <ul className="search">
            <li>
              <AiOutlineSearch onClick={() => setShowSearch((prev) => !prev)} />
              {showSearch && (
                <input type="text" value={searchParam} onChange={({ target }) => setSearchParam(target.value)} />
              )}
              {showSearch && (
                <AiOutlineClose
                  className="close-search"
                  onClick={() => {
                    setShowSearch((prev) => !prev);
                    setSearchParam("");
                  }}
                />
              )}
            </li>
          </ul>

          <ul className="logo">
            <li>
              <Link to="/">
                <img src="/assets/Babylon-logos_white.png" alt="logo" />
              </Link>
            </li>
          </ul>

          <ul className="drop-list">
            <li>
              <GiHamburgerMenu onClick={() => setShowDropDown((prev) => !prev)} />
            </li>
            {showDropDown && (
              <div className="drop-down">
                <ul className="drop-down-list">
                  <li className="drop-down-search">
                    <AiOutlineSearch onClick={() => setShowSearch((prev) => !prev)} />
                    {showSearch && (
                      <input type="text" value={searchParam} onChange={({ target }) => setSearchParam(target.value)} />
                    )}
                    {showSearch && (
                      <AiOutlineClose
                        className="close-search"
                        onClick={() => {
                          setShowSearch((prev) => !prev);
                          setSearchParam("");
                        }}
                      />
                    )}
                    <span>search</span>
                  </li>
                  <li className="drop-down-user-name">
                    {currentUser?.displayName && (
                      <p>
                        Hi,<span className="name">{currentUser?.displayName}</span>
                      </p>
                    )}
                  </li>
                  <li className="drop-down-shopping-cart">
                    <Link to="/cart">
                      <AiOutlineShopping className="shopping-cart" />
                      <span>{cartTotal}</span>
                    </Link>
                  </li>
                  <li className="drop-down-sign-out">
                    {currentUser?.displayName && (
                      <Link to="" onClick={() => dispatch(signoutUser())}>
                        <AiOutlineLogout />
                        <span>Logout</span>
                      </Link>
                    )}
                    {Object.keys(currentUser).length === 0 && (
                      <Link to="/login">
                        <AiOutlineLogin />
                        <span>Login</span>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </ul>

          <ul className="sign-logo">
            <li className="user-name">
              {currentUser?.displayName && (
                <p>
                  Hi,<span className="name">{currentUser?.displayName}</span>
                </p>
              )}
            </li>
            <div className="logos">
              <li className="shopping-cart-container">
                <Link to="/cart">
                  <AiOutlineShopping className="shopping-cart" />
                  <span>{cartTotal}</span>
                </Link>
              </li>
              <li>
                {currentUser?.displayName && (
                  <Link to="" onClick={() => dispatch(signoutUser())}>
                    <AiOutlineLogout />
                  </Link>
                )}
                {Object.keys(currentUser).length === 0 && (
                  <Link to="/login">
                    <AiOutlineLogin />
                  </Link>
                )}
              </li>
            </div>
          </ul>
        </div>
      )}

      <ul className={inView || location.pathname !== "/" ? "nav-links" : "nav-links sticky"}>
        <li>
          <Link to="/category/women">women</Link>
        </li>

        <li>
          <Link to="/category/men">men</Link>
        </li>

        <li>
          <Link to="/category/top">top</Link>
        </li>

        <li>
          <Link to="/category/bottom">bottom</Link>
        </li>

        <li>
          <Link to="/category/jeans">jeans</Link>
        </li>

        <li>
          <Link to="/category/summer">Summer</Link>
        </li>

        <li>
          <Link to="/category/winter">winter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
