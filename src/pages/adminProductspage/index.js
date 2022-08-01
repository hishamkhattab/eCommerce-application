import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
// components
import { ProductCard } from "../../components";

// reducer
import { fetchProducts } from "../../store/productSlice";
import "./style.scss";

function AdminProductspage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const page = 0;

  useEffect(() => {
    dispatch(fetchProducts({ collectionName: "products" }));
  }, []);

  const handleLoadMore = () => {
    const p = parseInt(searchParams.get("page")) + 1;
    setSearchParams({ page: p });
    dispatch(fetchProducts({ p }));
  };

  return (
    <div className="show-products-page">
      <div className="title">
        <h3>Show Products</h3>
      </div>

      <div className="products-container">
        {!isLoading && products.map((el) => <ProductCard product={el} key={el._id} />)}
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
