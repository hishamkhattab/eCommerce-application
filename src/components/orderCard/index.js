import React from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BsArrowRightCircle } from "react-icons/bs";
import "./style.scss";

function OrderCard({ order }) {
  return (
    <div className="order-itmes">
      <div className="delivery-status">
        <span>Order Date: </span>
        <p>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</p>
      </div>
      <div className="delivery-status">
        <span>Delivery Status: </span>
        <p>{order.deliveryStatus}</p>
      </div>
      <div className="delivery-status">
        <span>payment Status: </span>
        <p>{order.paymentStatus}</p>
      </div>
      <div className="delivery-status">
        <span>paid Currency: </span>
        <p>{order.paidCurrency}</p>
      </div>
      <Link to={`/order/${order._id}`} className="details-link">
        Details
        <BsArrowRightCircle />
      </Link>
    </div>
  );
}

export default OrderCard;
