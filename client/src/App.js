// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useMemo } from "react";
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
import FunctionsContext from "./utils/FunctionsContext";
import { QueryContext } from "./utils/QueryContext";
function App() {
  const [userSearch, setUserSearch] = useState("");
  const providerValue = useMemo(() => ({ userSearch, setUserSearch }), [
    userSearch,
    setUserSearch,
  ]);
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

  console.log(redirectState, "redirect state before handleSearch");
  const handleSearch = async (e) => {
    try {
      e.preventDefault();

      console.log("handleSearch ran from parent div");

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
          <FunctionsContext.Provider value={{ handleSearch }}>
            <QueryContext.Provider value={providerValue}>
              {/* Search results page */}
              <Route path="/searchresults" component={SearchResults} />
              {/* Intro Page */}
              <Route path="/intro" component={Intro} />
              <Redirect from="/" to="/intro" />
            </QueryContext.Provider>
          </FunctionsContext.Provider>
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
