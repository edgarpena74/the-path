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

  console.log(locationArray);

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
    <div className="searchResultsSection">
      {/* <ReactQueryDevtools initialIsOpen /> */}
      {/* <SearchBar /> */}
      {/*  */}
      {/* Container for cards and info */}
      {/* <Row> */}
      <Container className="searchBar">
        <Row className="formRow d-flex align-items-stretch">
          {/* Blank */}
          <Col sm="1" md="1" lg="1" className="blankColLeft"></Col>
          {/* blank */}
          {/* Start of form col*/}
          <Col
            sm="8"
            md="8"
            lg="8"
            className="formCol d-flex align-items-center"
          >
            <Form className="form-inline searchForm" id="inputSearch">
              <input
                type="text"
                className="form-control formInput form-control-lg"
                placeholder="Search"
                name="input"
              ></input>
            </Form>
          </Col>
          {/* End of form */}
          {/* Start of Button col */}
          <Col
            sm="2"
            md="2"
            lg="2"
            className="btnCol d-flex border-left  align-items-center justify-content-center "
          >
            <button type="submit" className="btn submitBtn" form="inputSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
              </svg>
            </button>
          </Col>
          {/* End of button col */}
          {/* Blank */}
          <Col sm="1" md="1" lg="1" className="blankColRight"></Col>
          {/* Blank */}
        </Row>
      </Container>
      {/* </Row> */}
      <Container className="searchResultsContainer">
        {/* Search bar*/}
        {/* <Form onSubmit={handleSearch}> */}

        <Row className="leftRightRow">
          {/* Left Side */}
          <Col className="leftSide" md="7" lg="7" sm="7">
            <ListGroup className="resultsDiv">
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
          <Col className="rightSide">
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
            </div>
          </Col>
          {/*  */}
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;
