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
// import { Promise } from "mongoose";
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
  // const [locations, setLocations] = useState([]);

  // const queryClient = useQueryClient();

  // const CancelToken = axios.CancelToken;

  // // console.log(userSearch);
  // const searchData = useQuery(userSearch.input, () => {
  //   const source = CancelToken.source();
  //   const promise = API.searchRes(userSearch.input, {
  //     cancelToken: source.token,
  //   });
  //   promise.cancel = () => {
  //     console.log("cancelled?");
  //     source.cancel("Query was cancelled by React-Query");
  //   };

  //   return promise;

  //Don't use curly brackets for a single statement in a function
  //If you use curly braces the callback data will return undefined
  const searchData = useQuery(
    userSearch.input,
    () => API.searchRes(userSearch.input),
    { refetchInterval: false }
  );
  // console.log(searchData);

  const searchResponse = searchData?.data?.data?.data;
  // console.log(searchResponse);

  const lonLatArr =
    searchResponse === undefined
      ? undefined
      : searchResponse.map((data) => ({
          lon: data.longitude,
          lat: data.latitude,
        }));

  //
  //
  // THIS WONT WORK BECAUSE YOU CANT MAP USING USEQUERY
  //
  //
  // const locationRes = useQuery(lonLatArr, () => {
  //   if (lonLatArr !== undefined) {
  //     console.log("hello");
  //     lonLatArr.map((data) => {
  //       API.getLocation(data.lon, data.lat);
  //     });
  //   }
  // });

  // console.log(locationRes);

  const locationArray =
    lonLatArr !== undefined
      ? lonLatArr.map((data) => {
          if (
            (data.lon === "" && data.lat === "") ||
            (data.lon === undefined && data.lat === undefined)
          ) {
            return;
          } else {
            return API.getLocation(data.lon, data.lat);
          }
        })
      : undefined;

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      // console.log("handle search");
    } catch (error) {
      return console.log(error);
    }
  };

  //Consider putting this inside of handleSearch
  const onClick = (e) => {
    // console.log("onChange ran");
    e.preventDefault();
    return setUserSearch({ [e.target.name]: e.target.value });
  };

  const onClickItem = (e) => {
    // console.log("OnCLickItem ran");
    try {
      e.preventDefault();
      // console.log(searchResponse);
      // console.log(e.target.id, "ID inside of onClick");
      let idTarget = e.target.id;
      // console.log(idTarget);
      setListItemID(idTarget);
      return;
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
                // onClick={(e) => {
                //   onClick(e);
                // }}
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
              ) : searchData.status !== "success" ? (
                "loading..."
              ) : (
                <ResultList
                  onClickItem={onClickItem}
                  results={searchResponse}
                  locationArray={locationArray}
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
              ) : searchData.data !== undefined ? (
                <InformationBlock
                  results={searchResponse}
                  locationArray={locationArray}
                  listItemID={listItemID}
                />
              ) : (
                "Data Undefined"
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
