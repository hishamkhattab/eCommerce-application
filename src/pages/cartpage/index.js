import React from "react";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdRemove } from "react-icons/io";

import "./style.scss";

function Cartpage() {
  return (
    <div className="main-page-container cart-page">
      <div className="main-section">
        <h2>Cart</h2>
      </div>

      <div className="cart-content">
        <div className="cart-product">
          <div className="img-container">
            <img src="/assets/men.jpg" alt="" />
          </div>
          <h6 className="product-name">Wrangler Mens Authentics Men's Short Sleeve Classic Woven Shirt Shirt</h6>
          <p className="product-price">$20.99</p>
          <div className="product-qty">
            <span>3</span>
            <div className="control">
              <IoMdArrowDropup />
              <IoMdArrowDropdown />
            </div>
          </div>
          <p>$62.97</p>
          <IoMdRemove />
        </div>
      </div>
    </div>
  );
}

export default Cartpage;
