import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

function UserPage() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div className="main-page-container">
      <div className="main-section">
        <h2>User Details</h2>
      </div>
      <div className="page-container">
        <div className="user-info">
          <p className="detail">
            <span>Email:</span>
            {currentUser.email}
          </p>
          <p className="detail">
            <span>Display Name:</span>
            {currentUser.displayName}
          </p>
        </div>
        <div className="user-update">
          <button className="global-btn">
            <Link to="/orders">All Orders</Link>
          </button>
          <button className="global-btn">
            <Link to="/orders">Update user details</Link>
          </button>
          <button className="global-btn important">
            <Link to="/orders">Reset password</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
