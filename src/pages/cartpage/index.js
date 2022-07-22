import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductCart } from "../../components";

import { reduceCartItem, increaseCartItem, removeCartItem } from "../../store/cartSlice";
import "./style.scss";

function Cartpage() {
  const { cart } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const handleReduceQty = (product) => {
    dispatch(reduceCartItem(product));
  };

  const handleIncreaseQty = (product) => {
    dispatch(increaseCartItem(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeCartItem(product));
  };

  return (
    <div className="main-page-container cart-page">
      <div className="main-section">
        <h2>Cart</h2>
      </div>

      <div className="cart-content" />
      {cart.map((product) => (
        <ProductCart
          key={product.documentID}
          product={product}
          reduceQty={handleReduceQty}
          increseQty={handleIncreaseQty}
          removeProduct={handleRemoveProduct}
        />
      ))}
    </div>
  );
}

export default Cartpage;
