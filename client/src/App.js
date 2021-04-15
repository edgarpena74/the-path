// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
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
  const [userSearch, setUserSearch] = useState({
    searchInput: "",
  });

  const [redirectState, setRedirectState] = useState({
    redirect: false,
  });

  function renderRedirect() {
    if (redirectState.redirect === true) {
      return <Redirect to="/searchresults" />;
    } else {
      return console.log("Redirect did not work");
    }
  }

  console.log(userSearch, " current userSearch state");

  const onChange = (e) => {
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
    // setRedirectState({ redirect: true });
    console.log("onChange function ran");
  };
  console.log(redirectState, "redirect state before handleSearch");
  const handleSearch = async (e) => {
    try {
      e.preventDefault();

      console.log("handleSearch ran from parent div");

      //
      // Consider using the get function in a child component to
      //
      const apiData = await axios.get(`/api/places/${userSearch.searchInput}`);
      // console.log(userInput, "this was the user input App.js");
      console.log(apiData, " this is from handleSearch App.js");
      return setRedirectState({ redirect: true });
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        {renderRedirect()}
        <Switch>
          <SearchContext.Provider
            value={{ ...userSearch, onChange, handleSearch }}
          >
            {/* Search results page */}
            <Route path="/searchresults" component={SearchResults} />
            {/* Intro Page */}
            <Route path="/intro" component={Intro} />
            <Redirect from="/" to="/intro" />
          </SearchContext.Provider>
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
