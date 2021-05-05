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
import { useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//Components
import ResultList from "./ResultList";
const SearchResults = (props) => {
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

  // Stores and is used to render the search query from IntroMain.js component(first page user sees)
  const [searchData, setSearchData] = useState([]);

  //State for the data based on the list item id
  const [listItemData, setListItemData] = useState([]);
  // console.log(listItemData, "before onclick list item data");

  //state for latitude and longitude
  const [latLonState, setLatLonState] = useState([]);

  // const {
  //   //Data retrieved from the api call
  //   searchData,
  //   setSearchData,
  //   // Data from the first array will be called on first
  //   //then when a user clicks on a list item the data is
  //   //rendered to the information div
  //   listItemData,
  //   setListItemData,
  //   //the latitude and Longitude data that will be used to get location and
  //   // weather data
  //   latLonState,
  //   setLatLonState,
  // } = useContext(TestContext);

  // const [manyState, setManyState] = useState({
  //   // New user search for this component
  //   userInput: "",
  //   // The data from the search api call
  //   searchData: [],
  //   // The id for the item that was clicked on
  //   listItemID: "", //This is used to et the data below
  //   // The Data for the list item that was clicked on
  //   listItemData: [],
  //   // Latitude and longitude data from mapping the search data
  //   latLon: [],
  //   //The location data after processing latLon in an api call
  //   locationData: [],
  //   hello: "",
  // });

  const source = axios.CancelToken.source();
  let searchResArray = [];
  let latLonArray = [];
  // let listItemFilter = [];

  //Since useEffect uses componentDidMount under the hood it is rerendering twice
  // useEffect(() => {
  //   console.log("useEffect");
  //   try {
  //     axios
  //       .get(`http://localhost:5000/api/places/${userSearch.input}`, {
  //         cancelToken: source.token,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         // console.log(res, "res");
  //         // Proceed with setting data is res is ok
  //         if (res.status === 200) {
  //           //Array from the response
  //           const resData = res.data.data;
  //           // console.log([resData[0]]);

  //           resData.map((data) => {
  //             searchResArray.push(data);
  //             latLonArray.push({ lat: data.latitude, lon: data.longitude });
  //           });
  //           const latLonPush = latLonArray;

  //           setSearchData(searchResArray);
  //           setLatLonState(latLonArray);
  //           setListItemData([resData[0]]);
  //           console.log(listItemData);
  //           console.log(searchData);
  //           console.log(latLonState);
  //         }
  //       });
  //     // return API.getLocation(many);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return () => {
  //     console.log("unmounted");

  //     source.cancel("was cancelled");
  //     console.log("hello");
  //   };
  // }, []);

  // useMemo(() => {
  //   console.log("hello");
  //   const something = latLonState;
  //   console.log(something);
  //   if (searchData !== []) {
  //     console.log("success");
  //   }
  // }, []);

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
    console.log(listItemData);
    console.log(searchData);
    console.log(latLonState);
    console.log("OnCLickItem ran");
    try {
      e.preventDefault();
      // console.log(e.target.id, "ID inside of onClick");
      let idTarget = e.target.id;
      // console.log(idTest, "idTest value");
      // console.log(searchData, "search Data inside of onCLick");
      let listItemFilter = searchData.filter((data) => data.id === idTarget);
      setListItemData(listItemFilter);
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
              <ResultList />
            </ListGroup>
          </Col>
          {/*  */}
          {/* Right Side */}
          <Col className="rightSide" lg="6" md="6">
            <div className="infoDiv">
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
