import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import "./style.scss";
import { ProductCard, LoadMoreButton, Loading } from "../../components";

function Categorypage() {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const { type } = useParams();

  const page = searchParams.get("page");
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setProductsData([]);
    setSearchParams({ page: 0 });
    dispatch(fetchProducts({ category: type, page: 0 }));
    if (products) {
      setProductsData((prevState) => prevState.concat(products));
    }
  }, [type]);

  const handleLoadMore = () => {
    const p = parseInt(page) + 1;
    setSearchParams({ page: p });
    dispatch(fetchProducts({ page: p }));
    setProductsData((prevState) => prevState.concat(products));
  };

  return (
    <div className="category-page main-page-container">
      <div className="main-section">
        <h2>{type}</h2>
        <div className="product-section">
          {isLoading && <Loading />}
          {!isLoading && productsData.length > 0 && productsData.map((el) => <ProductCard key={el._id} product={el} />)}
        </div>
      </div>
      {products.length >= 8 && <LoadMoreButton handleLoadMore={handleLoadMore} />}
    </div>
  );
}

export default Categorypage;
