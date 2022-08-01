import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal";
import "./style.scss";

function ProductCard({ product }) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const [sizeState, setSizeState] = useState("");
  const [colorState, setColorState] = useState("");

  const { productName, price, _id, productThumbnail, description, productCategory, size, colors } = product;

  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
      >
        <div className="product-img-container">
          <img src={productThumbnail} alt="prodcut" />
          {mouseEntered && (
            <button onClick={() => setViewDetails(true)} className="quick-view">
              Quick View
            </button>
          )}
        </div>
        <Link to={`/product/${_id}`} className="product-info">
          <h4 className="product-title">{productName}</h4>
          <p className="product-price">$ {price}</p>
        </Link>
      </div>
      {viewDetails && (
        <Modal closeModal={setViewDetails}>
          <div className="modal-product-container">
            <img src={productThumbnail} alt="" />
          </div>
          <div className="modal-product-info">
            <h4 className="title">{productName}</h4>
            <p className="price">$ {price}</p>
            <div className="product-info">
              <p>Category</p>
              <div className="info-contaiiner">
                {productCategory.map((el, idx) => (
                  <span key={idx}>{el}</span>
                ))}
              </div>
            </div>
            <div className="product-info">
              <p>size</p>
              <div className="info-contaiiner">
                {size.map((el, idx) => (
                  <button onClick={() => setSizeState(el)} key={idx} className={sizeState === el ? "size-active" : ""}>
                    {el}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-info">
              <p>Color</p>
              <div className="info-contaiiner">
                {colors.map((el, idx) => (
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
            <button className="global-btn">
              <Link to="/cart">
                <span>Add To Cart</span>
              </Link>
            </button>
            <p className="desc">{description.split("<p>").join("").split("</p>").join("")}</p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProductCard;
