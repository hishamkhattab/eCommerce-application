import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading, OrderCard } from "../../components";
import { getOrderHistory } from "../../store/orderSlice";

const mappedState = (state) => ({
  userID: state.users.currentUser.userID,
  orderHistory: state.orders.orderHistory,
  isLoading: state.orders.isLoading,
  error: state.orders.error,
});
function OrdersPage() {
  const { orderHistory, isLoading, error, userID } = useSelector(mappedState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrderHistory(userID));
  }, []);

  return (
    <div>
      <div className="main-section">
        <h2>User Orders</h2>
      </div>
      <button className="global-btn" onClick={() => navigate("/user")}>
        <span>User Details</span>
      </button>
      {error && <p className="error-message">{error}</p>}
      <div className="page-container">
        {isLoading && <Loading />}
        {!isLoading && !error && orderHistory.map((order) => <OrderCard order={order} key={order._id} />)}
      </div>
    </div>
  );
}

export default OrdersPage;
