import React from "react";
import { AiOutlineShoppingCart, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./style.scss";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { title, price, documentID, stock, thumb, productCategory } = product;
  // const { title, price, documentID, stock, thumb } = product;
  return (
    <div className="card-container">
      <div className="card-img-container">
        <img src={thumb} alt="product-img" />
      </div>
      <div className="card-price">
        <span>${price}</span>
      </div>
      <div className="card-control">
        <AiOutlineArrowRight onClick={() => navigate(`/product/${documentID}`)} className="details" />
        <AiOutlineShoppingCart className="cart" />
      </div>
      <div className="card-info-container">
        <h3>{title}</h3>
        <div className="cat">
          {productCategory.map((el, idx) => (
            <span key={idx}>{el}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

/**
 *     /* <div className="card-container">
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
      </div>

      <div className="card-category">
        {productCategory.map((el, idx) => (
          <span key={idx}>{el}</span>
        ))}
      </div>

      <div className="card-btn">
        <button>
          <Link to={`/product/${documentID}`}>Details</Link>
        </button>
      </div>
    </div> */
