import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

function VerticalNav() {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div className="vertical-bar">
      <div className="profile-container">
        <p>Welcome {currentUser.displayName},</p>
      </div>
      <div className="info">
        <p>
          <span>Email:</span> {currentUser.email}
        </p>
        <p>{/* <span>Created at:</span> {currentUser.createdDate} */}</p>
      </div>
      <div className="links">
        <Link to="/admin/addProduct">Add Product</Link>
        <Link to="/admin/showProducts">Show Products</Link>
      </div>
      {/* <div className="users-list">
        <p className="user-title">Users:</p>
        <div className="user">
          <span>name</span>
          <span>-</span>
          <span>email</span>
        </div>
      </div> */}
    </div>
  );
}

export default VerticalNav;
