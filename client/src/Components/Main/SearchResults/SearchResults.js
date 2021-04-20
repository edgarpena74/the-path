import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import API from "../../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import InfoBlock from "./InfoBlock/InfoBlock";
import "./SearchResults.css";
import SearchBar from "../../SearchBar/SearchBar";
// import { QueryContext } from "../../../utils/QueryContext";
// import { ResultIDContext } from "../../../utils/ResultIDContext";
import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/Contexts";
import { ResultIDContext } from "../../../utils/Contexts";
import { SearchResultsContext } from "../../../utils/SearchResultsContext";

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

  const [testData, setTestData] = useState([]);

  // console.log(
  //   userSearch.input,
  //   " value of userSearch inside of SearchResults.js"
  // );

  //Stores and is used to render the search query from IntroMain.js component(first page user sees)
  const [searchData, setSearchData] = useState([]);

  const onClickItem = async (e) => {
    try {
      e.preventDefault();
      console.log("onClick Ran");
      return setTestData({ ...testData, [e.target.id]: e.target.value });
    } catch (error) {
      return console.log(error);
    }
    // console.log("onClick");
    // console.log(data);
    // await setTestData({ ...testData, [e.target.id]: e.target.value });
    // console.log(testData);
    // return;
  };

  //When the component mounts the userSearch.input is passed down as the param when
  //getting data from the API.
  useEffect(() => {
    console.log("useEffect ran for Search Results");
    API.searchRes(userSearch.input).then((res) => {
      setSearchData(res.data.data);
    });
  }, []);

  console.log(testData, "testData");
  console.log(searchData);
  return (
    <ResultIDContext.Provider value={{ resultID, setResultID }}>
      {/* <SearchResultsContext.Provider value={{ onClick }}> */}
      <div className="searchResultsDiv">
        {/* Search bar component */}
        {/* <SearchBar /> */}
        {/*  */}
        {/* Container for cards and info */}
        <Container>
          <Row>
            {/* Left Side */}
            <Col className="leftSide" lg="6" md="6">
              {/* <div className="resultsDiv">
              {searchData.map((result) => (
                <Cards result={result} />
              ))}
            </div> */}
              <ListGroup className="resultsDiv">
                {searchData.map((result) => (
                  <ListGroup.Item
                    data={result}
                    key={result.id}
                    action
                    onClick={onClickItem}
                    className="cardStyle"
                    id={result.id}
                  >
                    <Image
                      className="listItemImg d-inline"
                      src={result.images[0].url}
                      alt=""
                    />
                    <div className="title d-inline">{result.title}</div>
                  </ListGroup.Item>
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
      {/* </SearchResultsContext.Provider> */}
    </ResultIDContext.Provider>
  );
};

export default SearchResults;
