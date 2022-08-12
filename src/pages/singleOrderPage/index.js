import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../../store/orderSlice";
import { Loading, OrderComponent } from "../../components";

function SingleOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, orderDetails } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  const handleClk = () => {
    navigate("/orders");
  };
  return (
    <div className="main-page-container">
      <div className="main-section">
        <h2>Order Details</h2>
      </div>
      <button onClick={handleClk} className="global-btn">
        <span>All Orders</span>
      </button>

      <div className="page-container">
        {error && <p className="error-message">{error}</p>}
        {isLoading && <Loading />}
        {!isLoading && !error && Object.keys(orderDetails).length && <OrderComponent orderDetails={orderDetails} />}
      </div>
    </div>
  );
}

export default SingleOrderPage;
