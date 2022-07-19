import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";

import "./style.scss";

function LoadMoreButton({ handleLoadMore }) {
  return (
    <div className="load-more-btn">
      <button onClick={handleLoadMore}>
        <span>Load more</span>
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
}

export default LoadMoreButton;
