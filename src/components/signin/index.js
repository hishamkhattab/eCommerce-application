import React from "react";

import "./style.scss";

function Signin({ email, password, setEmail, setPassword, error }) {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {error && <p className="error-message">{error}</p>}
        <input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          required
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </form>
    </div>
  );
}

export default Signin;
