import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import API from "../../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import InfoBlock from "./InfoBlock/InfoBlock";
import "./SearchResults.css";
import SearchBar from "../../SearchBar/SearchBar";
// import { QueryContext } from "../../../utils/QueryContext";
// import { ResultIDContext } from "../../../utils/ResultIDContext";
import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/Contexts";
import { ResultIDContext } from "../../../utils/Contexts";
import { SearchResultsContext } from "../../../utils/SearchResultsContext";

const SearchResults = () => {
  //This is the context for the state that was declared in App.js(Parent)
  //It updates the state of what the user is searching(When is get the search bar done)
  const { userSearch, setUserSearch } = useContext(QueryContext);

  //This context is intended to be passed the children components of this component.
  //It will get the state updated when clicked on and render the image, desc, etc
  // to the InfoBlock component.
  const [resultID, setResultID] = useState({
    id: "",
  });

  const [listItemSelection, setListItemSelection] = useState({});

  // console.log(
  //   userSearch.input,
  //   " value of userSearch inside of SearchResults.js"
  // );

  //Stores and is used to render the search query from IntroMain.js component(first page user sees)
  const [searchData, setSearchData] = useState([]);

  const onClickItem = async (e) => {
    try {
      e.preventDefault();
      console.log("onClick Ran");
      console.log(e.target.data);
      console.log(e.target.id);
      setListItemSelection([e.target.id]);
      console.log(
        listItemSelection,
        "new value after click for list item selection"
      );
      // return setListItemSelection({ ...listItemSelection, [e.target.id]: e.target.value });
      return;
    } catch (error) {
      return console.log(error);
    }
  };

  //When the component mounts the userSearch.input is passed down as the param when
  //getting data from the API.
  useEffect(() => {
    console.log("useEffect ran for Search Results");
    API.searchRes(userSearch.input).then((res) => {
      setSearchData(res.data.data);
    });
  }, []);

  console.log(listItemSelection, "listItemSelection");
  console.log(searchData);
  return (
    <ResultIDContext.Provider value={{ resultID, setResultID }}>
      <div className="searchResultsDiv">
        {/* Search bar*/}
        {/* <SearchBar /> */}
        {/*  */}
        {/* Container for cards and info */}
        <Container>
          <Row>
            {/* Left Side */}
            <Col className="leftSide" lg="6" md="6">
              <ListGroup className="resultsDiv">
                {searchData.map((result) => (
                  // <div onClick={onClickItem} id={result.id}>
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
                <InfoBlock />
              </div>
            </Col>
            {/*  */}
          </Row>
        </Container>
      </div>
    </ResultIDContext.Provider>
  );
};

export default SearchResults;
