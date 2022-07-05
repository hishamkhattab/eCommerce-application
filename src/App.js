import React from "react";

//pages
import { Homepage } from "./pages";


//components
import { Header } from "./components";

// style
import "./index.scss";


const App = () => {
  return (
    <div className="App">
      <Header />
      <Homepage/>
    </div>
  );
}

export default App;
