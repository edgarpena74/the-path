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
import { ResultIDContext } from "../../../utils/Contexts";
import { SearchResultsContext } from "../../../utils/SearchResultsContext";

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

  const [manyState, setManyState] = useState({
    // New user search for this component
    userInput: "",
    // The data from the search api call
    searchData: [],
    // The id for the item that was clicked on
    listItemID: "", //This is used to et the data below
    // The Data for the list item that was clicked on
    listItemData: [],
    // Latitude and longitude data from mapping the search data
    latLon: [],
    //The location data after processing latLon in an api call
    locationData: [],
  });

  const source = axios.CancelToken.source();
  let searchResArray = [];

  //Since useEffect uses componentDidMount under the hood it is rerendering twice
  useEffect(() => {
    try {
      let latLonArray = [];
      axios
        .get(`http://localhost:5000/api/places/${userSearch.input}`, {
          cancelToken: source.token,
        })
        .then((res) => {
          console.log(res);
          // console.log(res, "res");
          // Proceed with setting data is res is ok
          if (res.status === 200) {
            //Array from the response
            const resData = res.data.data;
            console.log([resData[0]]);

            resData.map((data) => {
              searchResArray.push(data);
              latLonArray.push({ lat: data.latitude, lon: data.longitude });
            });
            console.log(searchResArray);
            console.log(latLonArray);
            setManyState({
              searchData: searchResArray,
              latLon: latLonArray,
              listItemData: [resData[0]],
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
    return () => {
      console.log("unmounted");
      console.log(manyState);
      source.cancel("was cancelled");
      console.log("hello");
    };
  }, []);

  const testEle = () => {
    if (manyState.latLon !== undefined || manyState.latLon !== []) {
      return <h1>hello</h1>;
    }
  };

  const listItems = () => {
    if (manyState.searchData !== undefined || manyState.searchData !== []) {
      return manyState.searchData.map((result) => (
        //
        //
        // *** set point-events to non in order to make this one cohesive clickable item
        // List items for results
        <ListGroup.Item
          id={result.id}
          key={result.id}
          // onClick={(e) => onClickItem(e)}
          type="button"
          action
          className="listItemStyle"
        >
          <Image
            className="listItemImg d-inline"
            src={result.images[0].url === "" ? fern : result.images[0].url}
            alt="No Image Available"
          />
          <div className="listItemTitle d-inline">{result.title}</div>
        </ListGroup.Item>
      ));
    }
  };

  // const infoItemMap = manyState.listItemData.map((data) => (
  //   <div key={data.id}>
  //     <h1>{data.title}</h1>

  //     <Image
  //       src={data.images[0].url === "" ? fern : data.images[0].url}
  //       fluid
  //     />
  //     <div style={{ display: "none" }}>Hello World</div>
  //     <p>{data.audioDescription}</p>
  //     {"\n"}
  //     <p>
  //       {data.isOpenToPublic === "1" ? "Open to public" : "Not open to public"}
  //     </p>
  //     <div>
  //       <a href={data.url}>See More Information</a>
  //     </div>
  //     {/* <div>{data.bodyText}</div> */}
  //   </div>
  // ));
  // const infoItem = () => {
  //   if (manyState.listItemData !== null) {
  //     return infoItemMap;
  //   }
  // };

  // const handleSearch = async (e) => {
  //   try {
  //     e.preventDefault();
  //     // console.log("handleSearch ran");
  //     API.searchRes(userSearch.input).then((res) => {
  //       setSearchData(res.data.data);
  //       setListItemData([res.data.data[0]]);
  //     });
  //   } catch (error) {
  //     return console.log(error);
  //   }
  // };

  // const onChange = (e) => {
  //   // console.log("onChange ran");
  //   setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
  // };

  // const onClickItem = async (e) => {
  //   console.log("OnCLickItem ran");
  //   try {
  //     e.preventDefault();
  //     // console.log(e.target.id, "ID inside of onClick");
  //     let idTarget = e.target.id;
  //     // console.log(idTest, "idTest value");
  //     // console.log(searchData, "search Data inside of onCLick");
  //     let listItemFilter = searchData.filter((data) => data.id === idTarget);
  //     setListItemData(listItemFilter);
  //   } catch (error) {
  //     return console.log(error);
  //   }
  // };

  return (
    <div className="searchResultsDiv">
      {/* <SearchBar /> */}
      {/*  */}
      {/* Container for cards and info */}
      <Container className="searchResultsContainer">
        {/* Search bar*/}
        {/* <Form onSubmit={handleSearch}> */}
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label> */}
              <Form.Control
                // onChange={onChange}
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
              <h1>Search: Hello</h1>
              {listItems()}
            </ListGroup>
          </Col>
          {/*  */}
          {/* Right Side */}
          <Col className="rightSide" lg="6" md="6">
            <div className="infoDiv">
              {manyState.listItemData !== undefined
                ? manyState.listItemData.map((data) => (
                    <div key={data.id}>
                      <h1>{data.title}</h1>

                      <Image
                        src={
                          data.images[0].url === "" ? fern : data.images[0].url
                        }
                        fluid
                      />
                      <div style={{ display: "none" }}>Hello World</div>
                      <p>{data.audioDescription}</p>
                      {"\n"}
                      <p>
                        {data.isOpenToPublic === "1"
                          ? "Open to public"
                          : "Not open to public"}
                      </p>
                      <div>
                        <a href={data.url}>See More Information</a>
                      </div>
                      {/* <div>{data.bodyText}</div> */}
                    </div>
                  ))
                : ""}
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
