import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
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

  const headerStyle = { height: isAdmin ? "8.5rem" : "6.5rem" };
  return (
    <div className="header" style={headerStyle}>
      {isAdmin && (
        <div className="admin-wrapper">
          <Link to="/admin">Admin</Link>
        </div>
      )}
      <div className="header-wrapper">
        <div className="logo-wrapper">
          <Link to="/" className="img-container">
            <img src="/assets/Babylon-logos_transparent.png" alt="logo" />
          </Link>
        </div>
        <ul className="header-links">
          {Object.keys(currentUser).length > 0 && (
            <li>
              <Link to="/">
                <div className="profile-img-container">
                  <img src={currentUser.photoURL ? currentUser.photoURL : "./assets/user.png"} alt="profile" />
                </div>
              </Link>
            </li>
          )}
          <li className="shopping-cart-container">
            <Link to="/cart">
              <AiOutlineShoppingCart className="shopping-cart" />
              <span>{cartTotal}</span>
            </Link>
          </li>
          <li>{Object.keys(currentUser).length === 0 && <Link to="/register">register</Link>}</li>
          <li>
            {Object.keys(currentUser).length === 0 && <Link to="/login">login</Link>}
            {currentUser?.displayName && (
              <Link to="" onClick={() => dispatch(signoutUser())}>
                logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
