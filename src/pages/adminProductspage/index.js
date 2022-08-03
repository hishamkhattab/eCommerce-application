import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
// components
import { ProductCard } from "../../components";

// reducer
import { fetchProducts, deleteProduct } from "../../store/productSlice";
import "./style.scss";

function AdminProductspage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const page = searchParams.get("page");
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts({}));
    setSearchParams({ page: 0 });
    setProductsData((prevState) => prevState.concat(products));
  }, []);

  const handleLoadMore = () => {
    const p = parseInt(page) + 1;
    setSearchParams({ page: p });
    dispatch(fetchProducts({ page: p }));
    setProductsData((prevState) => prevState.concat(products));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ productId: id }));
    setProductsData((prevState) => prevState.filter((item) => item._id !== id));
  };

  return (
    <div className="show-products-page">
      <div className="title">
        <h3>Show Products</h3>
      </div>

      <div className="products-container">
        {!isLoading &&
          productsData.map((el) => (
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
      </div>
    </div>
  );
}

export default AdminProductspage;
