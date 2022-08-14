import React from "react";

import "./style.scss";

function Signup({ handleForm, signupData, isPassowrdMatch, error }) {
  const { displayName, email, password, confirmPassword } = signupData;

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {!isPassowrdMatch && <p className="error-message">*Password and confirm password does not match</p>}
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Full Name"
          onChange={({ target }) => handleForm(target)}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={({ target }) => handleForm(target)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={({ target }) => handleForm(target)}
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={({ target }) => handleForm(target)}
        />
      </form>
    </div>
  );
}

export default Signup;
