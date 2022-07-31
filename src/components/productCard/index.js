import React, { useState } from "react";
import Modal from "../modal";
import "./style.scss";

function ProductCard({ product, collection }) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const [sizeState, setSizeState] = useState("");
  const [colorState, setColorState] = useState("");

  const { title, price, documentID, thumb, description } = product;

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
      {viewDetails && (
        <Modal closeModal={setViewDetails}>
          <div className="modal-product-container">
            <img src={thumb} alt="" />
          </div>
          <div className="modal-product-info">
            <h4 className="title">{title}</h4>
            <p className="price">$ {price}</p>
            <div className="product-info">
              <p>Category</p>
              <div className="info-contaiiner">
                {product.productCategory.map((el, idx) => (
                  <span key={idx}>{el}</span>
                ))}
              </div>
            </div>
            <div className="product-info">
              <p>size</p>
              <div className="info-contaiiner">
                {product.size.map((el, idx) => (
                  <button onClick={() => setSizeState(el)} key={idx} className={sizeState === el ? "size-active" : ""}>
                    {el}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-info">
              <p>Color</p>
              <div className="info-contaiiner">
                {product.colors.map((el, idx) => (
                  <button
                    onClick={() => setColorState(el)}
                    key={idx}
                    className={colorState === el ? "size-active" : ""}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>
            <button>Add to cart</button>
            <p>{description}</p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProductCard;
