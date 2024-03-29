import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// reducer
import { addProduct } from "../../store/productSlice";

// components
import { AddProdcut } from "../../components";

import "./style.scss";

const mapState = (state) => ({
  error: state.products.error,
  emptyFields: state.products.emptyFields,
  msg: state.products.msg,
  productAdminID: state.users.currentUser.userID,
});

function AddProductpage() {
  const { error, emptyFields, msg, productAdminID } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (msg === "Added successfully") navigate("/admin");
  }, [msg]);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productImages, setProductImages] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [colors, setColors] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = () => {
    const product = {
      productName,
      price,
      stock,
      productThumbnail,
      productImages: productImages ? productImages.split(",").map((el) => el.trim()) : "",
      productCategory: productCategory ? productCategory.split(",").map((el) => el.trim()) : "",
      colors: colors ? colors.split(",").map((el) => el.trim()) : "",
      size: size.split(",").map((el) => el.trim()),
      description: description.split("<p>").join("").split("</p>").join(""),
      productAdminID,
    };

    dispatch(addProduct({ product }));
  };

  return (
    <div className="add-product-page">
      <div className="title">
        <h3>Add Product</h3>
        {msg && <div className="success">{msg}</div>}
      </div>
      <AddProdcut
        emptyFields={emptyFields}
        error={error}
        title={productName}
        setTitle={setProductName}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        thumbnail={productThumbnail}
        setThumbnail={setProductThumbnail}
        image={productImages}
        setImage={setProductImages}
        productCategory={productCategory}
        setproductCategory={setproductCategory}
        colors={colors}
        setColors={setColors}
        sizes={size}
        setSizes={setSize}
        productDesc={description}
        setProductDesc={setDescription}
        handleAdd={handleAddProduct}
      />
    </div>
  );
}

export default AddProductpage;
