import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./style.scss";
import { fetchSingleProduct } from "../../store/productSlice";
import { addToCart } from "../../store/cartSlice";

import { Loading, ProductContent } from "../../components";

function Productpage() {
  const { productId } = useParams();
  const { singleProduct, isLoading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [thumbImg, setThumbImg] = useState("");
  const [sizeState, setSizeState] = useState("unknow");
  const [colorState, setColorState] = useState("unknow");
  const [qty, setQty] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProduct({ productId }));
  }, []);

  useEffect(() => {
    if (Object.keys(singleProduct).length) setThumbImg(singleProduct.productThumbnail);
  }, [singleProduct]);

  const handleAddToCart = (item) => {
    if (colorState && qty > 0 && sizeState) {
      setErrorMsg("");
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
    } else {
      setErrorMsg("Must specify color and size");
    }
  };

  return (
    <div className="main-page-container">
      {isLoading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ProductContent
          product={singleProduct}
          thumbImg={thumbImg}
          sizeState={sizeState}
          colorState={colorState}
          qty={qty}
          setSizeState={setSizeState}
          setColorState={setColorState}
          setQty={setQty}
          setThumbImg={setThumbImg}
          handleAddToCart={(p) => handleAddToCart(p)}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
}

export default Productpage;
