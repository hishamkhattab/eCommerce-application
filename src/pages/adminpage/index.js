import React from "react";
import { VerticalNav, ProductCard } from "../../components";

import "./style.scss";

function Adminpage() {
  return (
    <div className="admin-page">
      {/* <VerticalNav /> */}
      <ProductCard />
    </div>
  );
}

export default Adminpage;
