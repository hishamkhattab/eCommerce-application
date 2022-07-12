import React from 'react'
import {AiOutlineShoppingCart } from "react-icons/ai";

import "./style.scss";

const ProductCard = () => {
  return (
    <div className='card-container'>
      <div className="card-image">
        <img src="./assets/product-1.jpg" alt="product-iamge" />
      </div>
      <div className="card-controls">
        <span>
          <AiOutlineShoppingCart className='card-icon'/>
        </span>
      </div>
      <div className="card-info">
        <h3 className="title">Card Title</h3>
        <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, fugit?</p>
      </div>

      <div className="card-price">
        <span>$20.55</span>
      </div>

      <div className="card-btn">
        <button>Details</button>
      </div>
    </div>
  )
}

export default ProductCard;
