import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { addToCart } from "../../store/cartSlice";
import Modal from "../modal";
import "./style.scss";

function ProductCard({ product, showDelete, handleDelete }) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const [sizeState, setSizeState] = useState("");
  const [colorState, setColorState] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  const { productName, price, _id, productThumbnail, description, productCategory, size, colors } = product;

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    if (colorState && qty > 0 && sizeState) {
      setError("");
      const cartItem = {
        _id: item._id,
        productName: item.productName,
        price: item.price,
        productThumbnail: item.productThumbnail,
        productAdminID: item.productAdminID,
        color: colorState,
        size: sizeState,
        stock: item.stock,
        qty,
      };
      dispatch(addToCart(cartItem));
      setViewDetails(false);
    } else {
      setError("Must specify color and size");
    }
  };

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
          {showDelete && (
            <button className="delete-btn" onClick={() => handleDelete(product._id)}>
              X
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
            <img src={productThumbnail} alt="product" />
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
            {error && <p className="error-message">{error}</p>}
            <button className="global-btn" onClick={() => handleAddToCart(product)}>
              <span>Add To Cart</span>
            </button>
            <p className="desc">{description.split("<p>").join("").split("</p>").join("")}</p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProductCard;
