import React from "react";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdCloseCircle } from "react-icons/io";
import "./style.scss";

function ProductCart({ product, reduceQty, increseQty, removeProduct }) {
  return (
    <div className="cart-product">
      <div className="img-container">
        <img src={product.productThumbnail} alt="" />
      </div>
      <div>
        <h6 className="product-name">{product.productName}</h6>
        <div className="product-more-info">
          <p>
            <span>Color:</span>
            {product.color}
          </p>
          <p>
            <span>Size: </span>
            {product.size}
          </p>
        </div>
      </div>
      <p className="product-price">${product.price}</p>
      <div className="product-qty">
        <span>{product.qty}</span>
        <div className="control">
          <IoMdArrowDropup onClick={() => increseQty(product)} />
          <IoMdArrowDropdown onClick={() => reduceQty(product)} />
        </div>
      </div>
      <p>${(product.qty * product.price).toFixed(2)}</p>
      <IoMdCloseCircle className="remove-btn" onClick={() => removeProduct(product)} />
    </div>
  );
}

export default ProductCart;
