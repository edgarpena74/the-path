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
      latLon: {
        lat: "", //this data will be processed through an API call to
        lon: "", //get the location using reverse geocoding
      },
      //The location data after processing latLon in an api call
    };
  }

  static contextType = QueryContext;

  componentDidMount() {
    console.log(this.state.searchData, "searchData before callback");
    console.log("did mount");
    const { userSearch } = this.context;
    const userQuery = encodeURIComponent(userSearch.input);
    const resArray = [];
    console.log(resArray, "res arr before callback");
    axios
      .get(`http://localhost:5000/api/places/${userQuery}`)
      .then((res) => {
        console.log(res, "res");
        // Proceed with setting data is res is ok
        if (res.status === 200) {
          //Array from the response
          const resData = res.data.data;
          console.log(resData);
          resData.map((data) => {
            resArray.push(data);
          });
        }
        console.log(resArray, "resArray outside if");
        if (resArray !== []) {
          this.setState({ searchData: resArray, listItemData: [resArray[0]] });
        }
        console.log(this.state.searchData, "searchDatastate inside then");
        if (this.state.searchData !== [] && this.listItemData !== []) {
          console.log(this.state.searchData, "searchData isnide if");
          const latLonArray = this.state.searchData.map((data) => ({
            lon: data.longitude,
            lat: data.latitude,
          }));
          console.log(latLonArray, "latLonArray");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // if (
    //   resArray !== [] &&
    //   this.state.searchData !== [] &&
    //   this.state.listItemData !== []
    // ) {
    //   console.log("success");
    //   console.log(
    //     this.state.searchData,
    //     "searchData",
    //     this.state.listItemData,
    //     "listItemdata"
    //   );
  }
  //   // const latLonArray = this.state.searchData.map((data) => ({
  //   //   lon: data.Longitude,
  //   //   lat: data.latitude,
  //   // }));
  //   // console.log(latLonArray, "latLongArray");
  // }

  onClickItem(e) {
    console.log("onClickItem");
    try {
      e.preventDefault();
      let idTarget = e.target.id;
      let listItemFilter = this.state.searchData.filter(
        (data) => data.id === idTarget
      );
      this.setState({ listItemData: listItemFilter });
    } catch (error) {
      console.log(error);
    }
  }
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
