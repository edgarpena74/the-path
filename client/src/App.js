// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";

function App() {
  const [userSearch, setUserSearch] = useState({
    input: "",
  });

  const onChange = (e) => {
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
    console.log("onChange function ran");
  };

  const search = async (userInput) => {
    try {
      const apiData = await axios.get(`/api/places/${userInput}`);
      console.log(userInput, "this was the user input App.js");
      console.log(apiData, " this is from handleSearch App.js");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Nav />
        </header>
        <main>
          <Main searchFunction={search} onChangeFunction={onChange} />
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
