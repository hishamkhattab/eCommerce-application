import React, { useState } from "react";
import { useDispatch } from "react-redux";

// reducer
import { addProduct } from "../../store/productSlice";

// components
import { AddProdcut } from "../../components";

import "./style.scss";

function AddProductpage() {
  const dispatch = useDispatch();

  const [collectionName, setCollenctionName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const clearForm = () => {
    setTitle("");
    setPrice(0);
    setStock(0);
    setThumbnail("");
    setImage("");
    setproductCategory("");
    setColors("");
    setSizes("");
    setProductDesc("");
  };

  const handleAddProduct = () => {
    const product = {
      title,
      price,
      stock,
      thumb: thumbnail,
      images: image.split(",").map((el) => el.trim()),
      productCategory: productCategory.split(",").map((el) => el.trim()),
      colors: colors.split(",").map((el) => el.trim()),
      size: sizes.split(",").map((el) => el.trim()),
      description: productDesc,
    };
    console.log(product);
    console.log(collectionName);

    dispatch(addProduct({ product, collectionName }));
    // clearForm();
  };

  return (
    <div className="add-product-page">
      <div className="title">
        <h3>Add Product</h3>
      </div>
      <AddProdcut
        setCollenctionName={setCollenctionName}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        image={image}
        setImage={setImage}
        productCategory={productCategory}
        setproductCategory={setproductCategory}
        colors={colors}
        setColors={setColors}
        sizes={sizes}
        setSizes={setSizes}
        productDesc={productDesc}
        setProductDesc={setProductDesc}
        handleAdd={handleAddProduct}
      />
    </div>
  );
}

export default AddProductpage;
