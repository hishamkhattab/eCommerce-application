import React, { useState } from "react";
import { useDispatch } from "react-redux";

// ck-editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// reducer
import { addProduct } from "../../store/productSlice";

// components
import { VerticalNav, AddProdcut, Modal } from "../../components";

// layout
import { FormLayout, Button } from "../../layout";

import "./style.scss";

function Adminpage() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

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
      image: image.split(",").map((el) => el.trim()),
      productCategory: productCategory.split(",").map((el) => el.trim()),
      colors: colors.split(",").map((el) => el.trim()),
      sizes: sizes.split(",").map((el) => el.trim()),
      description: productDesc,
    };
    console.log(product);
    console.log(collectionName);

    dispatch(addProduct({ product, collectionName }));
    // clearForm();
  };
  return (
    <div className="admin-page">
      <VerticalNav handleOpen={() => setOpenModal(true)} />
      {/* <div className="grid">
        {data.products.map((el, idx) => (
          <ProductCard product={el} key={`${el.uniq_id}_${idx}`} />
        ))}
      </div> */}
      <Modal
        isOpen={openModal}
        handleClose={() => {
          clearForm();
          setOpenModal(false);
        }}
      >
        <FormLayout title="Add Product">
          <form onSubmit={(e) => e.preventDefault()} className="form-layout">
            <input type="text" placeholder="title" value={title} onChange={({ target }) => setTitle(target.value)} />
            <input type="number" placeholder="price" value={price} onChange={({ target }) => setPrice(target.value)} />
            <input type="number" placeholder="stock" value={stock} onChange={({ target }) => setStock(target.value)} />
            <input
              type="text"
              placeholder="thumbnail url"
              value={thumbnail}
              onChange={({ target }) => setThumbnail(target.value)}
            />
            <input
              type="text"
              placeholder="images url, seperated by (,)"
              value={image}
              onChange={({ target }) => setImage(target.value)}
            />
            <input
              type="text"
              placeholder="category, seperated by (,)"
              value={productCategory}
              onChange={({ target }) => setproductCategory(target.value)}
            />
            <input
              type="text"
              placeholder="Colors seperated by (,)"
              value={colors}
              onChange={({ target }) => setColors(target.value)}
            />
            <input
              type="text"
              placeholder="Sizes seperated by (,)"
              value={sizes}
              onChange={({ target }) => setSizes(target.value)}
            />
            <div className="model-desc">
              <CKEditor
                editor={ClassicEditor}
                value={productDesc}
                onChange={(event, editor) => setProductDesc(editor.getData())}
              />
            </div>
          </form>
          <Button handleClick={handleAddProduct}>Add</Button>
        </FormLayout>
      </Modal>
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

export default Adminpage;
