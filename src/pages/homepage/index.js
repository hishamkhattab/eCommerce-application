import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSunnyOutline, IoCloudyOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { CategoryCard, HomeDirectory, Loading, ProductCard, ProductCategory } from "../../components";

import { fetchProducts } from "../../store/productSlice";

import "./style.scss";

function Homepage() {
  const { isLoading, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, []);

  return (
    <div className="homepage-container main-page-container">
      <HomeDirectory />

      <div className="product-categories">
        <CategoryCard image="/assets/summer.jpg" title="New Arrival" />
        <CategoryCard image="/assets/winter.jpg" title="Hot Deals" />
        <CategoryCard image="/assets/dress.jpg" title="Big sales" />
        <CategoryCard image="/assets/women.jpg" title="Summer Vibe" />
      </div>

      <div className="homepage-content">
        <section className="main-section">
          <div className="product-section">
            <div className="slide-show">
              {isLoading && <Loading />}
              {!isLoading &&
                products.length > 0 &&
                products.map((el, idx) => <ProductCard key={el._id} product={el} />)}
            </div>
          </div>
        </section>
      </div>

      <section className="main-categories">
        <div className="categroies-container">
          <div className="category">
            <img src="/assets/men.jpg" alt="men" />
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

      {/* <div className="category-content">
        <div className="main-category">
          <Link to="/category/summer">
            <h3>Summer Vibes</h3>
          </Link>
          <IoSunnyOutline />
        </div>
        <div className="main-category">
          <Link to="/category/winter">
            <h3>Winter Vibes</h3>
          </Link>
          <IoCloudyOutline />
        </div>
      </div> */}

      <div className="product-category-content">
        <ProductCategory />
      </div>
    </div>
  );
}

export default Homepage;
