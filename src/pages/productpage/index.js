import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdStar } from "react-icons/io";
import { data } from "../../data";
import "./style.scss";

function Productpage() {
  const { productId } = useParams();
  const { title, price, stock, thumb, category, completeDescription, rate, review, createdDate } = data.products.find(
    (el) => el.id === productId
  );

  const [qty, setQty] = useState(0);

  const starArray = new Array(parseInt(rate));

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < parseInt(rate); i++) {
    starArray.push(<IoMdStar key={i} />);
  }

  return (
    <div className="product-page">
      <div className="image-container">
        <div className="img">
          <img src={thumb} alt="product" />
        </div>
      </div>
      <div className="product-details">
        <div className="product-date">
          <span>Created at: </span>
          <span>{createdDate}</span>
        </div>
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
        <p className="product-description">{completeDescription}</p>
        <div className="product-category">
          <span>{category}</span>
        </div>
        <div className="product-rate">
          {starArray.map((el) => el)}
          <span className="product-review">
            <span>{review}</span> Reviews
          </span>
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
