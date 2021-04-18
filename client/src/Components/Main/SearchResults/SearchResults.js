import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import API from "../../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cards from "./CardBlock/Cards";
import ListGroup from "react-bootstrap/ListGroup";
import InfoBlock from "./InfoBlock/InfoBlock";
import "./SearchResults.css";
// import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/QueryContext";
import { ResultIDContext } from "../../../utils/ResultIDContext";

const SearchResults = () => {
  //This is the context for the state that was declared in App.js(Parent)
  //It updates the state of what the user is searching(When is get the search bar done)
  const { userSearch, setUserSearch } = useContext(QueryContext);

  //This context is intended to be passed the children components of this component.
  //It will get the state updated when clicked on and render the image, desc, etc
  // to the InfoBlock component.
  const [resultID, setResultID] = useState({
    id: "",
  });

  // console.log(
  //   userSearch.input,
  //   " value of userSearch inside of SearchResults.js"
  // );

  //Stores and is used to render the search query from IntroMain.js component(first page user sees)
  const [initSearch, setInitSearch] = useState([]);

  //When the component mounts the userSearch.input is passed down as the param when
  //getting data from the API.
  useEffect(() => {
    API.initSearch(userSearch.input).then((res) => {
      setInitSearch(res.data.data);
    });
  }, [userSearch.input]);

  console.log(userSearch, "current userSearch State");
  console.log(initSearch, " initSearch Data");
  return (
    <ResultIDContext.provider value={{ resultID, setResultID }}>
      <div className="searchResultsDiv">
        <Container>
          <Row>
            {/* Left Side */}
            <Col className="leftSide" lg="6" md="6">
              {/* <div className="resultsDiv">
              {initSearch.map((result) => (
                <Cards result={result} />
              ))}
            </div> */}
              <ListGroup className="resultsDiv">
                {initSearch.map((result) => (
                  <Cards result={result} />
                ))}
              </ListGroup>
            </Col>
            {/* Right Side */}
            <Col className="rightSide" lg="6" md="6">
              <div className="infoDiv">
                <InfoBlock />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ResultIDContext.provider>
  );
};

export default SearchResults;
