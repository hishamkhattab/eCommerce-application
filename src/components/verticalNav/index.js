import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

function VerticalNav() {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div className="vertical-bar">
      <div className="admin-info">
        <div className="profile-container">
          <p>Welcome {currentUser.displayName},</p>
        </div>
        <div className="info">
          <p>
            <span>Email:</span> {currentUser.email}
          </p>
          <p>{/* <span>Created at:</span> {currentUser.createdDate} */}</p>
        </div>
      </div>
      <div className="links">
        <button className="global-btn">
          <Link to="/admin/addProduct">
            <span>Add Product</span>
          </Link>
        </button>
        <button className="global-btn">
          <Link to="/admin/showProducts">
            <span>Show admin Products</span>
          </Link>
        </button>
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
