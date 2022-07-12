import React from 'react'
import { useSelector } from 'react-redux';

import "./style.scss";

const VerticalNav = () => {

    const { currentUser } = useSelector(state => state.users);

    return (
        <div className="vertical-bar">
            <div className="profile-container">
                <p>Welcome {currentUser.displayName},</p>
            </div>
            <div className="info">
                <p><span>Email:</span> {currentUser.email}</p>
                <p><span>Created at:</span> {currentUser.createdDate}</p>
            </div>
            <div className="control">
                <button>add product</button>
            </div>
            <div className="users-list">
                <p className='user-title'>Users:</p>
                <div className="user">
                    <span>name</span>
                    <span>-</span>
                    <span>email</span>
                </div>
                <div className="user">
                    <span>name</span>
                    <span>-</span>
                    <span>email</span>
                </div>
                <div className="user">
                    <span>name</span>
                    <span>-</span>
                    <span>email</span>
                </div>
            </div>
        </div>
    );
}

export default VerticalNav
