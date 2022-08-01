import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

function ProductCategory() {
  return (
    <div className="product-category-container">
      <div className="image-container container-four">
        <div className="image-container">
          <img src="/assets/shoes.jpg" alt="shoes" />
          <Link to="" className="category-link">
            Shoes
          </Link>
        </div>
        <div className="image-container">
          <img src="/assets/top.png" alt="top" />
          <Link to="" className="category-link">
            Top
          </Link>
        </div>
        <div className="image-container">
          <img src="/assets/jeans.jpg" alt="jeans" />
          <Link to="" className="category-link">
            Jeans
          </Link>
        </div>
        <div className="image-container">
          <img src="/assets/accessories.jpg" alt="bottom" />
          <Link to="" className="category-link">
            accessories
          </Link>
        </div>
      </div>
      <div className="image-container">
        <img src="/assets/summer.jpg" alt="summer" />
        <Link to="" className="category-link">
          Hot summer
        </Link>
      </div>
      <div className="image-container">
        <img src="/assets/winter.jpg" alt="winter" />
        <Link to="" className="category-link">
          Winter
        </Link>
      </div>
      <div className="image-container">
        <img src="/assets/sale.jpg" alt="sale" />
        <Link to="" className="category-link">
          sales
        </Link>
      </div>
    </div>
  );
}

export default ProductCategory;
