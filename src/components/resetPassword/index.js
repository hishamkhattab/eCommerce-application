import React from 'react'

import "./style.scss";

const ResetPassword = ({email, setEmail, error}) => {
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} className="reset-form">
                {error && <p className='error-message'>{error}</p>}
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={({ target }) => setEmail(target.value)}
                />
            </form>
        </div>
    );
}

export default ResetPassword
