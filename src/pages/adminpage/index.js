import React from "react";
import { Outlet } from "react-router-dom";

// components
import { VerticalNav } from "../../components";

import "./style.scss";

function Adminpage() {
  return (
    <div className="admin-page main-page-container">
      <VerticalNav />
      <Outlet />
    </div>
  );
}

export default Adminpage;
