import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import "./style.scss";
import { ProductCard } from "../../components";

function Categorypage() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    dispatch(fetchProducts({ filterType: type }));
  }, []);

  return (
    <div className="category-page">
      <h2>{type}</h2>
      <div className="product-section">
        {products.map((el) => (
          <ProductCard key={el.documentID} product={el} />
        ))}
      </div>
    </div>
  );
}

export default Categorypage;
