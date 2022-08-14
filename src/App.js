import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  UserPage,
  OrdersPage,
  SingleOrderPage,
} from "./pages";

// components
import { Header, Footer } from "./components";

// reducer
import { checkIfUserSignin } from "./store/userSlice";

// high-order-component
import { WithAdminAuth, WithUserAuth } from "./HOC";

// style
import "./index.scss";

function App() {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfUserSignin());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/register"
          element={Object.keys(currentUser).length === 0 ? <Registerpage /> : <Navigate to="/" />}
        />
        <Route path="/login" element={Object.keys(currentUser).length === 0 ? <Loginpage /> : <Navigate to="/" />} />
        <Route
          path="/reset"
          element={Object.keys(currentUser).length === 0 ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route path="/product/:productId" element={<Productpage />} />
        <Route path="/category/:type" element={<Categorypage />} />
        <Route
          path="/cart"
          element={
            <WithUserAuth>
              <Cartpage />
            </WithUserAuth>
          }
        />
        <Route
          path="/purchase"
          element={
            <WithUserAuth>
              <Purchasepage />
            </WithUserAuth>
          }
        />
        <Route
          path="/user"
          element={
            <WithUserAuth>
              <UserPage />
            </WithUserAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <WithUserAuth>
              <OrdersPage />
            </WithUserAuth>
          }
        />
        <Route
          path="/order/:id"
          element={
            <WithUserAuth>
              <SingleOrderPage />
            </WithUserAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <WithAdminAuth>
              <Adminpage />
            </WithAdminAuth>
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
