import React, { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//pages
import { Homepage, Registerpage,Loginpage,ForgotPassword } from "./pages";


//components
import { Header,Footer } from "./components";

//reducer
import {checkIfUserSignin} from "./store/userSlice";

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
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/reset" element={<ForgotPassword/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
