import React, { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import { useDispatch } from "react-redux";

//pages
import { Homepage, Registerpage,Loginpage,ForgotPassword, Adminpage } from "./pages";


//components
import { Header,Footer } from "./components";

//reducer
import {checkIfUserSignin} from "./store/userSlice";

//high-order-component
import { WithAdminAuth } from "./HOC";


// style
import "./index.scss";

const App = () => {
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
        <Route path="/admin"
          element={
            // <WithAdminAuth>
              <Adminpage />
            /* </WithAdminAuth> */
          } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
