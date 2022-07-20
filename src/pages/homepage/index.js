import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HomeDirectory, ProductCard } from "../../components";

import { fetchProducts } from "../../store/productSlice";
import "./style.scss";

function Homepage() {
  const { products, isLoading, hotDeals, newArrival } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ collectionName: "hotDeals" }));
    dispatch(fetchProducts({ collectionName: "newArrival" }));
  }, []);

  console.log(products);
  return (
    <div className="homepage-container">
      <HomeDirectory />

      <div className="homepage-content">
        <section className="homepage-main-section">
          <h2>New Arrival</h2>
          <div className="product-section">
            {!isLoading &&
              Object.keys(newArrival).length > 0 &&
              newArrival.data.map((el, idx) => (
                <ProductCard key={`${el.productAdminUserUID}-${idx}`} product={el} collection="newArrival" />
              ))}
          </div>
        </section>
        <section className="homepage-main-section">
          <h2>Hot Deals</h2>
          <div className="product-section">
            {!isLoading &&
              Object.keys(hotDeals).length > 0 &&
              hotDeals.data.map((el, idx) => (
                <ProductCard key={`${el.productAdminUserUID}-${idx}`} product={el} collection="hotDeals" />
              ))}
          </div>
        </section>
        <section className="homepage-main-section">
          <h2>Categories</h2>
          <div className="categroies-container">
            <div className="category">
              <img src="./assets/men.jpg" alt="men" />
              <Link to="/category/men" className="cat-link">
                Men
              </Link>
            </div>
            <div className="category">
              <img src="./assets/women.jpg" alt="women" />
              <Link to="/category/women" className="cat-link">
                Women
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;
