import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./style.scss";
import { fetchSingleProduct } from "../../store/productSlice";

import { Loading, ProductContent } from "../../components";

function Productpage() {
  const { productId, productCollection } = useParams();
  const { singleProduct, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [thumbImg, setThumbImg] = useState("");
  const [sizeState, setSizeState] = useState("unknow");
  const [colorState, setColorState] = useState("unknow");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleProduct({ productId, collectionName: productCollection }));
  }, []);

  useEffect(() => {
    setThumbImg(singleProduct.thumb);
  }, [singleProduct]);

  return (
    <div className="main-page-container">
      {isLoading && (
        <div className="loading-container">
          <Loading />
        </div>
      )}
      {!isLoading && (
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
        />
      )}
    </div>
  );
}

export default Productpage;
