import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { VerticalNav, ProductCard, Modal } from "../../components";
import { FormLayout, Button } from "../../layout";
import { data } from "../../data";

import "./style.scss";

function Adminpage() {
  const [openModal, setOpenModal] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const clearForm = () => {
    setTitle("");
    setPrice(0);
    setStock(0);
    setThumbnail("");
    setImage("");
    setproductCategory("");
    setShortDesc("");
    setProductDesc("");
  };

  const handleAddProduct = () => {
    console.log({
      title,
      price,
      stock,
      thumbnail,
      image,
      productCategory: productCategory.split(","),
      shortDesc,
      productDesc,
    });
    clearForm();
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
              placeholder="thumbnail"
              value={thumbnail}
              onChange={({ target }) => setThumbnail(target.value)}
            />
            <input type="text" placeholder="image" value={image} onChange={({ target }) => setImage(target.value)} />
            <input
              type="text"
              placeholder="category add (,) after each category"
              value={productCategory}
              onChange={({ target }) => setproductCategory(target.value)}
            />
            <input
              type="text"
              placeholder="short description"
              value={shortDesc}
              onChange={({ target }) => setShortDesc(target.value)}
            />
            <div className="model-desc">
              <CKEditor editor={ClassicEditor} onChange={(event, editor) => setProductDesc(editor.getData())} />
            </div>
          </form>
          <Button handleClick={handleAddProduct}>Add</Button>
        </FormLayout>
      </Modal>
    </div>
  );
}

export default Adminpage;
