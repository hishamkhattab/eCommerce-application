import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function ProductList({ item }) {
  return (
    <div className="order-item">
      <div className="product-image">
        <img src={item.productThumbnail} alt="product" />
      </div>
      <div className="product-name">
        <h4>{item.productName}</h4>
        <div className="details">
          <p className="detail">
            <span>Price:</span>${item.price}
          </p>
          <p className="detail">
            <span>Color:</span>
            {item.color}
          </p>
          <p className="detail">
            <span>Size:</span>
            {item.size}
          </p>
          <p className="detail">
            <span>Qty:</span>
            {item.qty}
          </p>
        </div>
      </div>
      <div className="more-details">
        <Link to={`/product/${item._id}`}>details</Link>
      </div>
    </div>
  );
}

export default ProductList;
