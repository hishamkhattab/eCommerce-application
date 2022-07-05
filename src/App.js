import React from "react";
import { Routes, Route} from "react-router-dom";

//pages
import { Homepage, Registerpage,Loginpage } from "./pages";


//components
import { Header,Footer } from "./components";

// style
import "./index.scss";


const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/register" element={<Registerpage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
