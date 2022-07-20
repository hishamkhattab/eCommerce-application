import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdStar } from "react-icons/io";

import "./style.scss";
import { fetchSingleProduct } from "../../store/productSlice";

import { Loading } from "../../components";

function Productpage() {
  const { singleProduct, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { productId, productCollection } = useParams();

  const [thumbImg, setThumbImg] = useState("");
  const [sizeState, setSizeState] = useState("unknow");
  const [colorState, setColorState] = useState("unknow");

  useEffect(() => {
    dispatch(fetchSingleProduct({ productId, collectionName: productCollection }));
  }, []);

  useEffect(() => {
    setThumbImg(singleProduct.thumb);
  }, [singleProduct]);

  const [qty, setQty] = useState(0);

  const starArray = new Array(parseInt(5));

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < parseInt(singleProduct.rate); i++) {
    starArray.push(<IoMdStar key={i} />);
  }

  return (
    <>
      {isLoading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div className="product-page">
          <div className="image-container">
            <div className="img">
              <img src={thumbImg} alt="product" />
            </div>
            <div className="other-img">
              {Array.isArray(singleProduct.images) &&
                singleProduct.images.map((el, idx) => (
                  <button className="other-img-container" key={idx} onClick={() => setThumbImg(el)}>
                    <img src={el} alt="product" />
                  </button>
                ))}
              {!Array.isArray(singleProduct.images) &&
                Object.values(singleProduct.images).map((el, idx) => (
                  <button className="other-img-container" key={idx} onClick={() => setThumbImg(el)}>
                    <img src={el} alt="product" />
                  </button>
                ))}
            </div>
          </div>
          <div className="product-details">
            <div className="product-date">
              <span>Created at: </span>
              <span>{singleProduct.createdDate}</span>
            </div>
            <h3 className="product-title">{singleProduct.title}</h3>
            <p className="product-price">${singleProduct.price}</p>
            <p className="product-description">{singleProduct.description}</p>
            <div className="product-info">
              <p>Category</p>
              <div className="info-contaiiner">
                {singleProduct.productCategory.map((el, idx) => (
                  <span key={idx}>{el}</span>
                ))}
              </div>
            </div>
            <div className="product-info">
              <p>size</p>
              <div className="info-contaiiner">
                {singleProduct.size.map((el, idx) => (
                  <button onClick={() => setSizeState(el)} key={idx} className={sizeState === el ? "size-active" : ""}>
                    {el}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-info">
              <p>Color</p>
              <div className="info-contaiiner">
                {singleProduct.colors.map((el, idx) => (
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
            {singleProduct.stock > 0 && (
              <div className="product-stock">
                <span>Quantity</span>
                <span className="qty">{qty}</span>
                <div className="control">
                  <IoMdArrowDropup
                    className="control-arrow"
                    onClick={() => {
                      setQty((prev) => (prev === singleProduct.stock ? prev : prev + 1));
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
            {singleProduct.stock === 0 && (
              <div className="product-stock out">
                <span className="out-of-stock">out of stock</span>
              </div>
            )}
            <div className="product-control">
              <button className="add-button">
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Productpage;
