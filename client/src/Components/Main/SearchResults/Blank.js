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

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  static contextType = QueryContext;

  componentDidMount() {
    // console.log(this.state.searchData, "searchData before callback");
    console.log("did mount");
    this.getSearchData();
    console.log(this.state.searchData);
  }
  componentDidUpdate(prevState) {
    console.log("componentDidUpdate", this.state);

    if (
      this.state.searchData !== prevState.searchData &&
      this.state.latLon !== prevState.latLon &&
      this.state.locationData.length < 3
    ) {
      let locationArray = [];
      console.log(locationArray);
      // console.log(this.state.latLon);
      // this.state.latLon.forEach((data, index) => {
      this.state.latLon.map((data, index) => {
        console.log(data, index);
        // Conditional for getting undefined or empty data for the lon and lat
        if (
          (data.lon === undefined && data.lat === undefined) ||
          (data.lon === "" && data.lat === "")
        ) {
          const emptyObj = {
            label: "No Location Available",
          };
          let pushArr = [];
          let pushObj = emptyObj;
          locationArray.push(pushObj);
          console.log(locationArray);
          console.log(pushObj);

          // console.log("data undefined for lat lon");
          //
          // Test this out using "hiking"
          //
        } else {
          // Needed to do nested call in order to avoid async bugs
          // This callback gets location data
          console.log("else ran// running location call back");
          API.getLocation(data.lon, data.lat).then((res) => {
            //
            // ************
            // camping returns features data as undefined for one of the responses
            // ************
            //
            //Conditional for undefined responses when getting location
            const resData = res.data;
            if (resData.features[0] === undefined || resData === undefined) {
              // If empty push this response otherwise proceed
              // console.log("Data value undefined for features or data");
              const emptyLabel = { label: "No Location Available" };
              console.log(
                "if ran, undefined features // no label data",
                emptyLabel
              );
              let pushData = emptyLabel;
              locationArray.push(pushData);
              // console.log(locationArray);

              //
            } else {
              console.log("else ran, features/ label available");
              console.log({ label: res.data.features[0].properties.label });
              const labelData = {
                label: resData.features[0].properties.label,
              };
              let pushData = labelData;
              // let testArray = labelData;
              // console.log(testArray);
              // console.log(pushData);
              locationArray.push(pushData);
              // console.log(locationArray);
              // this.setState({ locationData: locationArray });
            }
          });
          // console.log(locationArray);
        }
        // end of for
        if (locationArray.length === 3) {
          console.log(locationArray);
          console.log("hello");
          return locationArray;
        }
      });
      console.log(locationArray);
      this.setState({ locationData: locationArray });
    } else if (this.state.locationData.length === 3) {
      console.log(this.state.locationData);
      console.log("hello");
      return;
    }
    // if(locationArray.length !== [])
  }

  getSearchData() {
    const { userSearch } = this.context;
    //
    // **************
    // Hiking returns back a few undefined responses
    // **************
    //
    const userQuery = encodeURIComponent(userSearch.input);
    // console.log(userQuery, "user search");
    const searchResArray = [];
    const latLonArray = [];
    axios
      .get(`http://localhost:5000/api/places/${userQuery}`)
      .then((res) => {
        // console.log(res, "res");
        // Proceed with setting data is res is ok
        if (res.status === 200) {
          //Array from the response
          const resData = res.data.data;
          // console.log(resData);
          resData.map((data) => {
            searchResArray.push(data);
            latLonArray.push({ lat: data.latitude, lon: data.longitude });
          });

          // console.log(searchResArray);
          // console.log(latLonArray);
          if (searchResArray !== [] && latLonArray !== []) {
            // console.log("success!");
            // console.log(latLonArray);
            this.setState({
              searchData: searchResArray,
              listItemData: [searchResArray[0]],
              latLon: latLonArray,
            });
            // console.log(this.state);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // onClickItem(e) {
  //   console.log("onClickItem");
  //   try {
  //     e.preventDefault();
  //     let idTarget = e.target.id;
  //     let listItemFilter = this.state.searchData.filter(
  //       (data) => data.id === idTarget
  //     );
  //     this.setState({ listItemData: listItemFilter });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  render() {
    return (
      <div className="searchResultsDiv">
        {/* Container for cards and info */}
        <Container className="searchResultsContainer">
          {/*  */}
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
                {/* {this.state.searchData.map((result) => (
                  //
                  //
                  // *** set point-events to non in order to make this one cohesive clickable item
                  // List items for results
                  <ListGroup.Item
                    id={result.id}
                    key={result.id}
                    onClick={(e) => this.onClickItem(e)}
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
                ))} */}
              </ListGroup>
            </Col>
            {/*  */}
            {/* Right Side */}
            <Col className="rightSide" lg="6" md="6">
              <div className="infoDiv">
                {/* {this.state.listItemData.map((data) => (
                  <div key={data.id}>
                    <h1>{data.title}</h1>
                    <Image src={data.images[0].url} fluid />
                    <div style={{ display: "none" }}>Hello World</div>
                    <div>
                      <a href={data.url}>Link to Location</a>
                    </div>
                    <div>
                      <p>{data.audioDescription}</p>
                    </div>
                  </div>
                ))} */}
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
  }
}

export default SearchResults;
