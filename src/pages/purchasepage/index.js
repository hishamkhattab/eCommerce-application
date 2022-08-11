import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SuccessPayment } from "../../components";
import { updateProduct } from "../../store/productSlice";
import { clearCart } from "../../store/cartSlice";

import "./style.scss";

function Purchasepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    dispatch(updateProduct(cart));
    localStorage.removeItem("cart");
    dispatch(clearCart());
  }, []);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <div className="main-page-container center">
      <SuccessPayment />
    </div>
  );
}

export default Purchasepage;
