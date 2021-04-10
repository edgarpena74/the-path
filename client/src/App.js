// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import TopMain from "./Components/Main/TopMain";
import BottomMain from "./Components/Main/BottomMain";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <TopMain />
        <BottomMain />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
