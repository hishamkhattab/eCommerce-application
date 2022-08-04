import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
// components
import { Modal, ProductCard } from "../../components";

// reducer
import { fetchProducts, deleteProduct } from "../../store/productSlice";
import "./style.scss";

const mappedState = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
  deletedProduct: state.products.deletedProduct,
  adminID: state.users.currentUser.userID,
});
function AdminProductspage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, deletedProduct, adminID } = useSelector(mappedState);
  const dispatch = useDispatch();
  const page = searchParams.get("page");

  const [showDeletedProduct, setShowDeletedProduct] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ adminID }));
    setSearchParams({ page: 0 });
  }, []);

  const handleLoadMore = () => {
    const p = parseInt(page) + 1;
    setSearchParams({ page: p });
    dispatch(fetchProducts({ page: p, oldData: products, adminID }));
  };

  const handleDelete = (id) => {
    setShowDeletedProduct(true);
    dispatch(deleteProduct({ productId: id }));
  };

  return (
    <div className="show-products-page">
      <div className="main-section">
        <h2>Show Products</h2>
      </div>

      <div className="products-container">
        {!isLoading &&
          products.map((el) => (
            <ProductCard product={el} key={el._id} showDelete handleDelete={(id) => handleDelete(id)} />
          ))}
      </div>
      <div className="load-more-btn">
        {!isLoading && products.length >= 8 && (
          <button onClick={handleLoadMore}>
            <span>Load more</span>
            <AiOutlineDoubleRight />
          </button>
        )}
        {deletedProduct && showDeletedProduct && (
          <Modal closeModal={() => setShowDeletedProduct(false)}>
            <div className="modal-product-container">
              <img src={deletedProduct.productThumbnail} alt="" />
            </div>
            <div className="modal-product-info">
              <h4 className="title">{deletedProduct.productName}</h4>
              <p className="price">$ {deletedProduct.price}</p>
              <div className="product-info">
                <p>Category</p>
                <div className="info-contaiiner">
                  {deletedProduct.productCategory.map((el, idx) => (
                    <span key={idx}>{el}</span>
                  ))}
                </div>
              </div>
              <div className="product-info">
                <p>size</p>
                <div className="info-contaiiner">
                  {deletedProduct.size.map((el, idx) => (
                    <button key={idx}>{el}</button>
                  ))}
                </div>
              </div>
              <div className="product-info">
                <p>Color</p>
                <div className="info-contaiiner">
                  {deletedProduct.colors.map((el, idx) => (
                    <button key={idx}>{el}</button>
                  ))}
                </div>
              </div>

              <p className="desc">{deletedProduct.description.split("<p>").join("").split("</p>").join("")}</p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default AdminProductspage;
