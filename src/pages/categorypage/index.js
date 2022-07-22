import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import "./style.scss";
import { ProductCard, LoadMoreButton, Loading } from "../../components";

function Categorypage() {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    dispatch(fetchProducts({ filterType: type, collectionName: "products" }));
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchProducts({
        filterType: type,
        collectionName: "products",
        startAfterDoc: products.queryDoc,
        persistsProduct: products.data,
      })
    );
  };

  return (
    <div className="category-page main-page-container">
      <div className="main-section">
        <h2>{type}</h2>
        <div className="product-section">
          {isLoading && <Loading />}
          {!isLoading &&
            Object.keys(products).length > 0 &&
            products.data.map((el) => <ProductCard key={el.documentID} product={el} />)}
        </div>
      </div>
      {!products.isLastPage && <LoadMoreButton handleLoadMore={handleLoadMore} />}
    </div>
  );
}

export default Categorypage;
