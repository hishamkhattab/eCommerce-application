import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdStar } from "react-icons/io";
import { data } from "../../data";
import "./style.scss";

function Productpage() {
  const { products } = useSelector((state) => state.products);
  const { productId } = useParams();

  const { title, price, stock, thumb, productCategory, description, rate, review, createdDate, images, size } =
    products.find((el) => el.documentID === productId);
  const [thumbImg, setThumbImg] = useState(thumb);
  const [sizeState, setSizeState] = useState("unknow");

  const [qty, setQty] = useState(0);

  const starArray = new Array(parseInt(5));

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < parseInt(rate); i++) {
    starArray.push(<IoMdStar key={i} />);
  }

  console.log(sizeState);
  return (
    <div className="product-page">
      <div className="image-container">
        <div className="img">
          <img src={thumbImg} alt="product" />
        </div>
        <div className="other-img">
          {Object.values(images).map((el, idx) => (
            <button className="other-img-container" key={idx} onClick={() => setThumbImg(el)}>
              <img src={el} alt="product" />
            </button>
          ))}
        </div>
      </div>
      <div className="product-details">
        <div className="product-date">
          <span>Created at: </span>
          <span>{createdDate}</span>
        </div>
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
        <p className="product-description">{description}</p>
        <div className="product-category">
          {productCategory.map((el, idx) => (
            <span key={idx}>{el}</span>
          ))}
        </div>
        <div className="product-rate">{starArray.map((el) => el)}</div>
        <div className="product-size">
          <p>size</p>
          <div className="size-contaiiner">
            {size.map((el, idx) => (
              <button onClick={() => setSizeState(el)} key={idx}>
                {el}
              </button>
            ))}
          </div>
        </div>
        {stock > 0 && (
          <div className="product-stock">
            <span>Quantity</span>
            <span>{qty}</span>
            <div className="control">
              <IoMdArrowDropup
                className="control-arrow"
                onClick={() => {
                  setQty((prev) => (prev === stock ? prev : prev + 1));
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
        {stock === 0 && (
          <div className="product-stock out">
            <span className="out-of-stock">out of stock</span>
          </div>
        )}
        <div className="product-control">
          <button>
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
