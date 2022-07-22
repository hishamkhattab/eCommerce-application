import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineArrowRight } from "react-icons/ai";

import { addToCart } from "../../store/cartSlice";
import "./style.scss";

function ProductCard({ product, collection }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title, price, documentID, thumb, productCategory } = product;

  return (
    <div className="card-container">
      <div className="card-img-container">
        <img src={thumb} alt="product-img" />
      </div>
      <div className="card-price">
        <span>${price}</span>
      </div>
      <div className="card-control">
        <AiOutlineArrowRight onClick={() => navigate(`/product/${collection}/${documentID}`)} className="details" />
        <AiOutlineShoppingCart onClick={() => dispatch(addToCart(product))} className="cart" />
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
