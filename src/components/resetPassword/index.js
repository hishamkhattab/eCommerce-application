import React from "react";

import "./style.scss";

function ResetPassword({ email, setEmail, error }) {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {error && <p className="error-message">{error}</p>}
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

export default ResetPassword;
