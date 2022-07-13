import React from "react";
import { VerticalNav, ProductCard } from "../../components";
import { data } from "../../data";

import "./style.scss";

function Adminpage() {
  return (
    <div className="admin-page">
      {/* <VerticalNav /> */}
      <div className="grid">
        {data.products.map((el, idx) => (
          <ProductCard product={el} key={`${el.uniq_id}_${idx}`} />
        ))}
      </div>
    </div>
  );
}

export default Adminpage;
