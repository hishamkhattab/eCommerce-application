import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProductCart } from "../../components";

import { reduceCartItem, increaseCartItem, removeCartItem } from "../../store/cartSlice";
import "./style.scss";
import { getPaymentURL } from "../../store/orderSlice";

const mappedState = (state) => ({
  cart: state.carts.cart,
  paymentURL: state.orders.url,
});
function Cartpage() {
  const { cart, paymentURL } = useSelector(mappedState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReduceQty = (product) => {
    dispatch(reduceCartItem(product));
  };

  const handleIncreaseQty = (product) => {
    dispatch(increaseCartItem(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeCartItem(product));
  };

  const handlePurchase = () => {
    dispatch(getPaymentURL(cart));
  };

  useEffect(() => {
    if (paymentURL) {
      window.location.replace(paymentURL);
    }
  }, [paymentURL]);
  return (
    <div className="main-page-container cart-page">
      <div className="main-section">
        <h2>Cart</h2>
      </div>

      <div className="cart-content">
        {cart.map((product) => (
          <ProductCart
            key={product._id}
            product={product}
            reduceQty={handleReduceQty}
            increseQty={handleIncreaseQty}
            removeProduct={handleRemoveProduct}
          />
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-total">
          <h4>Total</h4>
          <p>$ {cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}</p>
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-control">
          <button className="global-btn" onClick={() => {}}>
            <Link to="/">continue Shopping</Link>
          </button>
          <button className="global-btn" onClick={handlePurchase}>
            <span>purchase</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Cartpage;
