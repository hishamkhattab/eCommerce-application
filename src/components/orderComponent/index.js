import React from "react";

import ProductList from "../productList";
import "./style.scss";

function OrderComponent({ orderDetails }) {
  return (
    <div>
      <p className="detail main-detail">
        <span>paid Currency:</span>
        {orderDetails.paidCurrency}
      </p>
      <div className="detail main-detail important">
        <span>delivery Status:</span>
        {orderDetails.deliveryStatus}
      </div>
      <div className="detail main-detail important">
        <span>payment Status:</span>
        {orderDetails.paymentStatus}
      </div>
      <div className="main-section">
        <h2>Shipping Details</h2>
      </div>
      <div className="shipping-details">
        <p className="detail">
          <span>City:</span> {orderDetails.shipping.address.city}
        </p>
        <p className="detail">
          <span>Country: </span>
          {orderDetails.shipping.address.country}
        </p>
        <p className="detail">
          <span>Line1:</span> {orderDetails.shipping.address.line1}
        </p>
        <p className="detail">
          <span>Line2:</span> {orderDetails.shipping.address.line2}
        </p>
        <p className="detail">
          <span>Postal Card: </span>
          {orderDetails.shipping.address.postalCard}
        </p>
        <p className="detail">
          <span>State:</span> {orderDetails.shipping.address.state}
        </p>
        <p className="detail">
          <span>Email: </span>
          {orderDetails.shipping.email}
        </p>
        <p className="detail">
          <span>Name: </span>
          {orderDetails.shipping.name}
        </p>
        <p className="detail">
          <span>Phone Number:</span> {orderDetails.shipping.phone}
        </p>
        <p className="detail">
          <span>Order Total: </span>${orderDetails.orderTotal}
        </p>
        <p className="detail">
          <span>Order Sub-Total:</span> ${orderDetails.orderSubTotal}
        </p>
      </div>
      <div className="OrderItems">
        <div className="main-section">
          <h2>Order Items</h2>
        </div>
        {orderDetails.orderItems.map((item) => (
          <ProductList item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default OrderComponent;
