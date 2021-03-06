// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import IntroMain from "./Components/Main/Intro/IntroMain";
import SearchResults from "./Components/Main/SearchResults/SearchResults";
import Footer from "./Components/Footer/Footer";
// import ContextRoute from "./utils/ContextRoute";
import FunctionsContext from "./utils/FunctionsContext";
// import { QueryContext } from "./utils/QueryContext";
import { QueryContext } from "./utils/Contexts";

const queryClient = new QueryClient();

function App() {
  //Setting up userSearch in parent to send to children
  const [userSearch, setUserSearch] = useState({
    input: "",
  });

  //initial state for redirecting. If redirect is true then
  //user gets redirected to /searchresults
  const [redirectState, setRedirectState] = useState({
    redirect: false,
  });

  //When this function runs it sets the redirect state to true and
  //which would Redirect the user
  function renderRedirect() {
    if (redirectState.redirect === true) {
      return <Redirect to="/searchresults" />;
    } else {
      return console.log("Redirect did not work");
    }
  }

  console.log(redirectState, "redirect state before handleSearch");
  //handleSearch is run when the user clicks submit on TopInto.js
  //then user it redirected to SearchResults.js page
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
      <Nav />
      <BrowserRouter>
        {/* <Nav /> */}
        {/* This function activates the Redirect function which redirects the user to /searchResults */}
        {renderRedirect()}
        <Switch>
          <QueryClientProvider client={queryClient}>
            <FunctionsContext.Provider value={{ handleSearch }}>
              <QueryContext.Provider value={{ userSearch, setUserSearch }}>
                {/* Search results page */}
                <Route path="/searchresults" component={SearchResults} />
                {/* Intro Page */}
                <Route path="/intro" component={IntroMain} />
                {/* This had to be added to make the redirect work. Still not sure why its needed for it to work but it does. oh well */}
                <Redirect from="/" to="/intro" />
              </QueryContext.Provider>
            </FunctionsContext.Provider>
          </QueryClientProvider>
        </Switch>

        {/* <Footer /> */}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
