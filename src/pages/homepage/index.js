import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HomeDirectory, ProductCard } from "../../components";

import { fetchSingleProduct, fetchProducts } from "../../store/productSlice";
import "./style.scss";

function Homepage() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchSingleProduct("680T6Ggv9LobjSMrFOKb"));
    dispatch(fetchProducts({}));
  }, []);

  console.log(products);
  return (
    <div className="homepage-container">
      <HomeDirectory />

      <div className="homepage-content">
        <section className="homepage-main-section">
          <h2>New Arrival</h2>
          <div className="product-section">
            {products &&
              products.map((el, idx) => <ProductCard key={`${el.productAdminUserUID}-${idx}`} product={el} />)}
          </div>
        </section>
        <section className="homepage-main-section">
          <h2>Hot Deals</h2>
        </section>
        <section className="homepage-main-section">
          <h2>Top Categories</h2>
        </section>
      </div>
    </div>
  );
}

export default Homepage;
