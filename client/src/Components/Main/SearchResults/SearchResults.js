import React, { useContext, useEffect, useState, useMemo } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import API from "../../../utils/API";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import fern from "./Assets/fern.jpg";

import "./SearchResults.css";
// import { QueryContext } from "../../../utils/QueryContext";
// import { ResultIDContext } from "../../../utils/ResultIDContext";
import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/Contexts";
import { TestContext } from "../../../utils/Contexts";
import { ResultIDContext } from "../../../utils/Contexts";
import { SearchResultsContext } from "../../../utils/SearchResultsContext";

//React-Query library
import { useQueryClient, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//Components
import ResultList from "./ResultList";
import InformationBlock from "./InformationBlock";
const SearchResults = () => {
  //
  //
  // ***********************************
  // USING A CONSOLE LOG OUTSIDE OF A FUNCTION MAKES useEffect RUN MULTIPLE TIMES
  // ***********************************
  //
  //
  // This is the context for the state that was declared in App.js(Parent)
  // It updates the state of what the user is searching(When is get the search bar done)
  const { userSearch, setUserSearch } = useContext(QueryContext);
  const [listItemID, setListItemID] = useState("");

  const queryClient = useQueryClient();

  console.log(userSearch);
  const searchData = useQuery(userSearch.input, () =>
    API.searchRes(userSearch.input)
  );

  const searchResponse = searchData?.data?.data?.data;

  console.log(searchData);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      console.log("hello");
      // console.log("handleSearch ran");
    } catch (error) {
      return console.log(error);
    }
  };

  //Consider putting this inside of handleSearch
  const onChange = (e) => {
    // console.log("onChange ran");
    e.preventDefault();
    return setUserSearch({ [e.target.name]: e.target.value });
  };

  const onClickItem = async (e) => {
    console.log("OnCLickItem ran");
    try {
      e.preventDefault();
      // console.log(e.target.id, "ID inside of onClick");
      let idTarget = e.target.id;
      console.log(idTarget);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchResultsDiv">
      <ReactQueryDevtools initialIsOpen />
      {/* <SearchBar /> */}
      {/*  */}
      {/* Container for cards and info */}
      <Container className="searchResultsContainer">
        {/* Search bar*/}
        {/* <Form onSubmit={handleSearch}> */}
        <Form onSubmit={handleSearch}>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label> */}
              <Form.Control
                onChange={onChange}
                type="text"
                name="input"
                id="searchInput"
                placeholder="Search"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
          </Form.Row>
        </Form>
        <Row>
          {/* Left Side */}
          <Col className="leftSide" lg="6" md="6">
            <ListGroup className="resultsDiv">
              <p></p>
              {searchData.status === "loading" ? (
                "loading..."
              ) : (
                <ResultList
                  onClickItem={onClickItem}
                  results={searchResponse}
                />
              )}
              {/* <ResultList onClickItem={onClickItem} results={searchResponse} /> */}
            </ListGroup>
          </Col>
          {/*  */}
          {/* Right Side */}
          <Col className="rightSide" lg="6" md="6">
            <div className="infoDiv">
              {searchData.status === "loading" ? (
                "loading..."
              ) : (
                <InformationBlock results={searchResponse} />
              )}

              {/* data From API callback
                    -id
                    -images[0].url
                    -latitude
                    -longitude
                    -title
                    -tags[index], tags.length
                    -url
              */}
            </div>
          </Col>
          {/*  */}
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;
