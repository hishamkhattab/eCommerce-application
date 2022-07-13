import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./style.scss";

function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);

  const handleIsInCart = () => {
    setIsInCart((prev) => !prev);
  };

  const { title, price, id, stock, thumb, category, description } = product;
  return (
    <div className="card-container">
      <div className="card-price">
        <span className="price">${price}</span>
      </div>
      <div className="card-image">
        <img src={thumb} alt="product-iamge" />
      </div>
      {stock > 0 ? (
        <div className="card-controls">
          <span className={isInCart ? "cart active" : "cart"}>
            <AiOutlineShoppingCart className="card-icon" onClick={handleIsInCart} />
          </span>
        </div>
      ) : (
        <div className="card-controls">
          <span className="out-stock">out of stock</span>
        </div>
      )}
      <div className="card-info">
        <h3 className="title">{title}</h3>
        <p className="desc">{description}</p>
      </div>

      <div className="card-category">
        <span>{category}</span>
      </div>

      <div className="card-btn">
        <button>
          <Link to={`/product/${id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
