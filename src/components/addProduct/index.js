import React from "react";

// ck-editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./style.scss";

function AddProdcut({
  setCollenctionName,
  title,
  setTitle,
  price,
  setPrice,
  stock,
  setStock,
  thumbnail,
  setThumbnail,
  image,
  setImage,
  productCategory,
  setproductCategory,
  colors,
  setColors,
  sizes,
  setSizes,
  productDesc,
  setProductDesc,
  handleAdd,
}) {
  return (
    <div className="add-product">
      <form onSubmit={(e) => e.preventDefault()} className="add-product-form">
        <div className="product-type">
          <select name="" id="" onClick={({ target }) => setCollenctionName(target.value)}>
            <option value="" disabled>
              Choose Collection
            </option>
            <option value="products">All Products</option>
            <option value="newArrival">New Arrival</option>
            <option value="hotDeals">Hot Deals</option>
          </select>
        </div>

        <div className="product-input">
          <label htmlFor="product-title">Product Name</label>
          <input
            id="product-title"
            type="text"
            placeholder="Product name"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-price">price</label>
          <input
            type="number"
            id="product-price"
            placeholder="price"
            value={price}
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product=price">Stock</label>
          <input
            type="number"
            id="product-price"
            placeholder="stock"
            value={stock}
            onChange={({ target }) => setStock(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-thumb">Thumbnail</label>
          <input
            id="product-thumb"
            type="text"
            placeholder="image url"
            value={thumbnail}
            onChange={({ target }) => setThumbnail(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-images">Images</label>
          <input
            id="product-images"
            type="text"
            placeholder="seperate url with a comma"
            value={image}
            onChange={({ target }) => setImage(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-category">Category</label>
          <input
            id="product-category"
            type="text"
            placeholder="seperate categories with a comma ex: men, jeans"
            value={productCategory}
            onChange={({ target }) => setproductCategory(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-colors">colors</label>
          <input
            id="product-colors"
            type="text"
            placeholder="seperate colors with a comma ex: white, black"
            value={colors}
            onChange={({ target }) => setColors(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-sizes">size</label>
          <input
            id="product-sizes"
            type="text"
            placeholder="seperate sizes with a comma ex: large, x-large"
            value={sizes}
            onChange={({ target }) => setSizes(target.value)}
          />
        </div>

        <div className="product-input">
          <label htmlFor="product-description">Description</label>
          <CKEditor
            id="product-description"
            editor={ClassicEditor}
            value={productDesc}
            onChange={(event, editor) => setProductDesc(editor.getData())}
          />
        </div>

        <div className="product-input">
          <button className="add-button" onClick={handleAdd}>
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProdcut;
