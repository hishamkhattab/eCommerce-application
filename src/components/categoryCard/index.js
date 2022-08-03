import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

function CategoryCard({ image, title }) {
  let link;

  switch (title) {
    case "New Arrival":
      link = "new-arrivals";
      break;
    case "Hot Deals":
      link = "hot-deals";
      break;
    case "Big sales":
      link = "big-sales";
      break;
    default:
      link = "summer";
      break;
  }
  return (
    <div className="category-card">
      <img src={image} alt="category" />
      <Link to={`/category/${link}`} className="category-link">
        {title}
      </Link>
    </div>
  );
}

export default CategoryCard;
