import React from 'react'

import "./style.scss";

const ResetPassword = () => {
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()} className="reset-form">
                {/* {!isPassowrdMatch && <p className='error-message'>*Password and confirm password does not match</p>} */}
                {/* {error && <p className='error-message'>{error}</p>} */}
                <input
                    type="email"
                    name="email"
                    // value={email}
                    placeholder="Email"
                // onChange={({target}) => handleForm(target)}
                />
            </form>
        </div>
    );
}

export default ResetPassword
