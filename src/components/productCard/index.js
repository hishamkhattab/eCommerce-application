import React, {useState} from 'react'
import {AiOutlineShoppingCart } from "react-icons/ai";

import "./style.scss";

const ProductCard = () => {

  const [isInCart, setIsInCart] = useState(false);

  const handleIsInCart = () => {
    setIsInCart(prev => !prev);
  }
  return (
    <div className='card-container'>
      <div className="card-price">
        <span className='price'>$2000</span>
      </div>
      <div className="card-image">
        <img src="./assets/product-1.jpg" alt="product-iamge" />
      </div>
      <div className="card-controls">
        <span className={isInCart ? "cart active" : 'cart'}>
          <AiOutlineShoppingCart
            className='card-icon'
            onClick={handleIsInCart}
          />
        </span>
      </div>
      <div className="card-info">
        <h3 className="title">Rose Water & Adams</h3>
        <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, fugit?</p>
      </div>

      <div className="card-category">
        <span>men's wear</span>
        <span>watch</span>
        <span>watch</span>
      </div>

      <div className="card-btn">
        <button>Details</button>
      </div>
    </div>
  )
}

export default ProductCard;
