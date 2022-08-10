import React from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import "./style.scss";

function ProductContent({
  product,
  thumbImg,
  sizeState,
  colorState,
  qty,
  setSizeState,
  setColorState,
  setQty,
  setThumbImg,
  handleAddToCart,
  errorMsg,
}) {
  return (
    <div className="product-page">
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div className="image-container">
        <div className="img">
          <img src={thumbImg} alt="product" />
        </div>
        <div className="other-img">
          {Array.isArray(product.productImages) &&
            product.productImages.map((el, idx) => (
              <button className="other-img-container" key={idx} onClick={() => setThumbImg(el)}>
                <img src={el} alt="product" />
              </button>
            ))}
          {!Array.isArray(product.productImages) &&
            Object.values(product.productImages).map((el, idx) => (
              <button className="other-img-container" key={idx} onClick={() => setThumbImg(el)}>
                <img src={el} alt="product" />
              </button>
            ))}
        </div>
      </div>
      <div className="product-details">
        <div className="product-date">
          <span>Created at: </span>
          <span>{product.createdAt}</span>
        </div>
        <h3 className="product-title">{product.productName}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
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
              <button onClick={() => setColorState(el)} key={idx} className={colorState === el ? "size-active" : ""}>
                {el}
              </button>
            ))}
          </div>
        </div>
        {product.stock > 0 && (
          <div className="product-stock">
            <span>Quantity</span>
            <span className="qty">{qty}</span>
            <div className="control">
              <IoMdArrowDropup
                className="control-arrow"
                onClick={() => {
                  setQty((prev) => (prev === product.stock ? prev : prev + 1));
                }}
              />
              <IoMdArrowDropdown
                className="control-arrow"
                onClick={() => {
                  setQty((prev) => (prev === 0 ? prev : prev - 1));
                }}
              />
            </div>
          </div>
        )}
        {product.stock === 0 && (
          <div className="product-stock out">
            <span className="out-of-stock">out of stock</span>
          </div>
        )}
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <div className="product-control">
          <button className="global-btn" onClick={() => handleAddToCart(product)}>
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductContent;
