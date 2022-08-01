import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// pages
import {
  Homepage,
  Registerpage,
  Loginpage,
  ForgotPassword,
  Adminpage,
  Productpage,
  Categorypage,
  Cartpage,
  AddProductpage,
  AdminProductspage,
  Purchasepage,
} from "./pages";

// components
import { Header, Footer } from "./components";

// reducer
import { checkIfUserSignin } from "./store/userSlice";

// high-order-component
import { WithAdminAuth } from "./HOC";

// style
import "./index.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfUserSignin());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/product/:productId" element={<Productpage />} />
        <Route path="/category/:type" element={<Categorypage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/purchase" element={<Purchasepage />} />
        <Route
          path="/admin"
          element={
            // <WithAdminAuth>
            <Adminpage />
            // </WithAdminAuth>
          }
        >
          <Route path="addProduct" element={<AddProductpage />} />
          <Route path="showProducts" element={<AdminProductspage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
