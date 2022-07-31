import React, { useState } from "react";
import "./style.scss";

function ProductCard({ product, collection }) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const { title, price, documentID, thumb } = product;

  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
      >
        <div className="product-img-container">
          <img src={thumb} alt="prodcut" />
          {mouseEntered && (
            <button onClick={() => setViewDetails(true)} className="quick-view">
              Quick View
            </button>
          )}
        </div>
        <div className="product-info">
          <h4 className="product-title">{title}</h4>
          <p className="product-price">$ {price}</p>
        </div>
      </div>
      {/* {viewDetails && <Model open={setViewDetails} />} */}
    </>
  );
}

export default ProductCard;
