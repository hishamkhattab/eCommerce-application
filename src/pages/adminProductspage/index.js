import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
// components
import { ProductCard } from "../../components";

// reducer
import { fetchProducts } from "../../store/productSlice";
import "./style.scss";

function AdminProductspage() {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ collectionName: "products" }));
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchProducts({
        collectionName: "products",
        startAfterDoc: products.queryDoc,
        persistsProduct: products.data,
      })
    );
  };

  return (
    <div className="show-products-page">
      <div className="title">
        <h3>Show Products</h3>
      </div>

      <div className="products-container">
        {!isLoading && products.data.map((el) => <ProductCard product={el} key={el.documentID} />)}
      </div>
      <div className="load-more-btn">
        {!isLoading && !products.isLastPage && (
          <button onClick={handleLoadMore}>
            <span>Load more</span>
            <AiOutlineDoubleRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminProductspage;
