// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Intro from "./Components/Main/Intro/IntroMain";
import SearchResults from "./Components/Main/SearchResults/SearchResults";
import Footer from "./Components/Footer/Footer";
// import ContextRoute from "./utils/ContextRoute";
import SearchContext from "./utils/SearchContext";
function App() {
  // const history = useHistory();

  const [userSearch, setUserSearch] = useState({
    searchInput: "",
  });

  console.log(userSearch, " current userSearch state");

  const onChange = (e) => {
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
    console.log("onChange function ran");
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      console.log("Handlesearch ran from parent div");
      const apiData = await axios.get(`/api/places/${userSearch.searchInput}`);
      // console.log(userInput, "this was the user input App.js");
      console.log(apiData, " this is from handleSearch App.js");
      return;
      // return history.push("/searchresults");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Switch>
          <SearchContext.Provider
            value={{ ...userSearch, onChange, handleSearch }}
          >
            {/* Search results page */}
            <Route path="/searchresults" component={SearchResults} />
            {/* Intro Page */}
            <Route path="/" component={Intro} />
          </SearchContext.Provider>
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
