import React, { useContext, useEffect, useState, Component } from "react";
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

import "./SearchResults.css";
// import { QueryContext } from "../../../utils/QueryContext";
// import { ResultIDContext } from "../../../utils/ResultIDContext";
import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/Contexts";
import { ResultIDContext } from "../../../utils/Contexts";
import { SearchResultsContext } from "../../../utils/SearchResultsContext";

const FuncComp = () => {
  // This is the context for the state that was declared in App.js(Parent)
  // It updates the state of what the user is searching(When is get the search bar done)
  const { userSearch, setUserSearch } = useContext(QueryContext);
  console.log(userSearch, "userSearch value");

  // Stores and is used to render the search query from IntroMain.js component(first page user sees)
  const [searchData, setSearchData] = useState([]);
  console.log(searchData, "searchData after search");

  // State for saving the list item id that was clicked on
  const [listItemID, setListItemID] = useState("");
  // console.log(listItemID, "listItemID outside on onClick");

  //State for the data based on the list item id
  const [listItemData, setListItemData] = useState([]);
  // console.log(listItemData, "before onclick list item data");

  //state for latitude and longitude
  const [latLonState, setLatLonState] = useState([
    {
      lat: "",
      lon: "",
    },
  ]);
  // console.log(latLonState, " state of lat long");

  //State for location data
  const [locationState, setLocationState] = useState([]);
  // console.log(locationState, "location state");

  //Since useEffect uses componentDidMount under the hood it is rerendering twice
  useEffect(() => {
    // console.log("useEffect ran for Search Results");
    API.searchRes(userSearch.input).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setSearchData(res.data.data);
        console.log(searchData, "searchData inside of useEffect");
        setListItemData([res.data.data[0]]);
      }
    });
  }, [userSearch.input]);

  // useEffect(() => {
  //   testFunc(searchData);
  // }, [searchData]);

  const testFunc = async (searchData) => {
    // console.log("useEffect ran for Search searchData");
    console.log(searchData, "this is searchData inside of the test func");

    const latLonArray = await searchData.map((data) => ({
      lon: data.longitude,
      lat: data.latitude,
    }));
    console.log(latLonArray, " lat lon array inside of testFunc");
    setLatLonState(latLonArray);
    console.log(latLonState, "latLonState inside of testFunc");
    const locationArray = [];
    for (let index = 0; index < latLonState.length; index++) {
      // console.log(latLonState[index].lat, "latitude");
      // console.log(latLonState[index].lon, "longitude");
      API.getLocation(latLonState[index].lon, latLonState[index].lat).then(
        (res) => {
          // console.log(res.data.features);
          // Optional chaining for returning a value or undefined when the data is returned
          // from the api
          console.log(
            res?.data?.features,
            "res?.data?.feature inside of testFunc"
          );
          const resData = res?.data?.features;

          //Map resData in order to extract the object then push the objects into
          //the location array
          resData.map((obj) => {
            console.log(obj);
            locationArray.push(obj);
          });

          console.log(resData, index++);
          // setLocationState(res)
        }
      );
    }
    console.log(locationArray, "locationArray");
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      // console.log("handleSearch ran");
      API.searchRes(userSearch.input).then((res) => {
        setSearchData(res.data.data);
        setListItemData([res.data.data[0]]);
      });
    } catch (error) {
      return console.log(error);
    }
  };

  const onChange = (e) => {
    // console.log("onChange ran");
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
  };

  // console.log(searchData, "searchData value");
  const onClickItem = async (e) => {
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
      return console.log(error);
    }
  };

  // console.log(listItemData, "listItem data after onClick");
  return (
    <div className="searchResultsDiv">
      {/* <SearchBar /> */}
      {/*  */}
      {/* Container for cards and info */}
      <Container className="searchResultsContainer">
        {/* Search bar*/}
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
              {searchData.map((result) => (
                //
                //
                // *** set point-events to non in order to make this one cohesive clickable item
                // List items for results
                <ListGroup.Item
                  id={result.id}
                  key={result.id}
                  onClick={(e) => onClickItem(e)}
                  type="button"
                  action
                  className="listItemStyle"
                >
                  <Image
                    className="listItemImg d-inline"
                    src={result.images[0].url}
                    alt=""
                  />
                  <div className="listItemTitle d-inline">{result.title}</div>
                </ListGroup.Item>
                // </div>
              ))}
            </ListGroup>
          </Col>
          {/*  */}
          {/* Right Side */}
          <Col className="rightSide" lg="6" md="6">
            <div className="infoDiv">
              {listItemData.map((data) => (
                <div key={data.id}>
                  <h1>{data.title}</h1>

                  <Image src={data.images[0].url} fluid />
                  <div style={{ display: "none" }}>Hello World</div>
                  <div>
                    <a href={data.url}>Link to Location</a>
                  </div>
                  {/* <div>{data.bodyText}</div> */}
                </div>
              ))}
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

export default FuncComp;
