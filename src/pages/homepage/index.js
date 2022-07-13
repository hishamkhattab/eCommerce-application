import React from "react";
import { HomeDirectory } from "../../components";

import "./style.scss";

function Homepage() {
  return (
    <div className="homepage-container">
      <HomeDirectory />

      <div className="homepage-content">
        <section className="homepage-main-section">
          <h2>New Arrival</h2>
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
