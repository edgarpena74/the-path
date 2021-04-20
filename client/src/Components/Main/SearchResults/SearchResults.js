import React, { useContext, useEffect, useState } from "react";
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
import InfoBlock from "./InfoBlock/InfoBlock";

import "./SearchResults.css";
// import { QueryContext } from "../../../utils/QueryContext";
// import { ResultIDContext } from "../../../utils/ResultIDContext";
import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/Contexts";
import { ResultIDContext } from "../../../utils/Contexts";
import { SearchResultsContext } from "../../../utils/SearchResultsContext";

const SearchResults = () => {
  // This is the context for the state that was declared in App.js(Parent)
  // It updates the state of what the user is searching(When is get the search bar done)
  const { userSearch, setUserSearch } = useContext(QueryContext);

  // Stores and is used to render the search query from IntroMain.js component(first page user sees)
  const [searchData, setSearchData] = useState([]);

  // State for saving the list item id that was clicked on
  const [listItemID, setListItemID] = useState("");
  console.log(listItemID, "listItemID");

  //State for the data based on the list item id
  const [listItemData, setListItemData] = useState({});

  // Filter the searchData based on the id of the item that was selected
  // and update the state of the list item data
  // const infoBlockData = () => {
  //   try {
  //     console.log("InfoBlockData function ran");
  //     return setListItemData(
  //       searchData.filter((data) => data.id === listItemID)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const listItemTest = searchData.filter((data) => data.id === listItemID);
  console.log(listItemTest, "list Items after filter");

  // onClick function for getting the id of the selected list item
  const onClickItem = async (e) => {
    try {
      e.preventDefault();
      console.log("onClick ran");
      setListItemID(e.target.id);
      // infoBlockData(e);
      console.log(e.target.id, "inside of onClick");
      // return setListItemID(e.target.id);
      return setListItemData({ listItemTest });
    } catch (error) {
      return console.log(error);
    }
  };

  // function infoBlockData() {
  //   return setListItemData(searchData.filter((data) => data.id === listItemID));
  // }

  // // Const for getting the data of the specific list item
  // // const selectedItemData = searchData.filter((data) => data.id === listItemID);
  // // console.log(selectedItemData, "selectedItemData test");

  // const [selectedItemData, setSelectedItemData] = useState();

  // When the component mounts the userSearch.input is passed down as the param when
  // getting data from the API.
  useEffect(() => {
    console.log("useEffect ran for Search Results");
    API.searchRes(userSearch.input).then((res) => {
      setSearchData(res.data.data);
      setListItemData(res.data.data[0]);
    });
  }, []);

  console.log(listItemData, "listItem data");
  return (
    <div className="searchResultsDiv">
      {/* <SearchBar /> */}
      {/*  */}
      {/* Container for cards and info */}
      <Container>
        {/* Search bar*/}
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              {/* <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label> */}
              <Form.Control id="searchInput" placeholder="Search" />
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
                  onClick={onClickItem}
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
              <h1>{listItemData.title}</h1>
              {/* data From API callback
                    -id
                    -images[0].url
                    -latitude
                    -longitude
                    -title
                    -tags[index], tags.length
                    -url
              */}
              {/* <div className="title">{listItemData.title}</div> */}
              {/* <Image className="img d-inline" src={listItemData.image.url} /> */}
              {/* <div className="info">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut al
              </div> */}
            </div>
          </Col>
          {/*  */}
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;
