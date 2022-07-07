import React from 'react'

import "./style.scss";
const Signin = () => {
  return (
    <div>
    <form onSubmit={(e) => e.preventDefault()} className="signup-form">
        {/* {!isPassowrdMatch && <p className='error-message'>*Password and confirm password does not match</p>} */}
        {/* {error && <p className='error-message'>{error}</p>} */}
        <input
            type="email"
            name="email"
            // value={email}
            placeholder="Email"
            // onChange={({target}) => handleForm(target)}
        />
        <input
            type="password"
            name="password"
            // value={password}
            placeholder="Password"
            // onChange={({target}) => handleForm(target)}
        />
    </form>
</div>
  )
}

export default Signin
