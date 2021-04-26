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
  state = {
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

  static contextType = QueryContext;

  componentDidMount() {
    console.log("did mount");
    const { userSearch } = this.context;
    console.log(userSearch, "test context val");
    API.searchRes(userSearch)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <h1>Hello</h1>;
  }
}

export default SearchResults;
