import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

function CategoryCard({ image, title }) {
  return (
    <div className="category-card">
      <img src={image} alt="category" />
      <Link to="" className="category-link">
        {title}
      </Link>
    </div>
  );
}

export default CategoryCard;
