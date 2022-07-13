import React from "react";

import "./style.scss";

function Button({ children, handleClick, ...otherProps }) {
  return (
    <button className="btn" {...otherProps} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
