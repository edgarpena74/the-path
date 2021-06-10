import React, { useContext, useState } from "react";
import API from "../../../utils/API";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Loader from "../../Loader/Loader";
import "./SearchResults.css";
import { QueryContext } from "../../../utils/Contexts";
//React-Query library
import { useQuery } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

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

  const [testState, setTestState] = useState({
    input: "",
  });
  const onChange = (e) => {
    // const searchInput = e.target.value;
    const { name, value } = e.target;
    return handleNewSearch(name, value);
  };
  const handleNewSearch = (name, value) => {
    console.log(name, value, "handle new search");
  };
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      console.log(e.target.input.name);
      setUserSearch({
        [e.target.input.name]: e.target.input.value,
      });
      console.log(testState);
      return;
      // console.log("handle search");
    } catch (error) {
      return console.log(error);
    }
  };

  const onClickList = (e) => {
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
      <Container className="searchBar">
        <Row className="formRow">
          <div className="formBorder">
            <Form inline className="searchBarForm" onSubmit={handleSearch}>
              <Form.Group controlId="searchFormInput">
                {/* Input */}
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Search "
                  // onChange={onChange}
                  name="input"
                />
              </Form.Group>
              <Button type="submit" className="searchFormButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
                </svg>
              </Button>
            </Form>
          </div>
          {/* <button type="submit" className="btn submitBtn" form="inputSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
              </svg>
            </button> */}
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
                <Loader />
              ) : searchData.status !== "success" ? (
                "loading..."
              ) : (
                <ResultList
                  // props
                  onClickList={onClickList}
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
                <Loader />
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
      <Container className="mt-5 mb-5 border-bottom border-top">
        <h1 className="pt-2">Future Development</h1>
        {"\n"}
        <h5>Visual Aspects</h5>
        <ul>
          <li></li>
          <li>
            Include a single loading component that spans the entire page
            instead of having the loading visual show up on both of the
            container blocks.{" "}
          </li>
          <li>
            Styling the list item element so that the location appears like
            this.
            <p className="text-center mb-4 mt-4">
              <div>Location</div>
              <div>County, state, Country</div>
            </p>
            This format would allow for better visual styling across different
            screen widths.
          </li>
        </ul>
        <h5>Technological Features</h5>
        <ul>
          <li>Include a weather API on the information section.</li>
          <li>
            Have a way to correct user searches incase they spell something
            incorrectly.
          </li>
        </ul>
        <h5>Future Bug Fixes</h5>
        <p>
          Upon searching for something else in this component the information
          section on the right does not load. However, when the user clicks on a
          list item the right side does load.
        </p>
        <p>
          Solving the issues of overlap between elements on smaller screen
          widths
        </p>
        <h5>API Limitations</h5>
        <p>
          The developer version of the reverse geocode API, that gives us the
          location, limits the search requests to 1000 per day. In order to make
          this feature functional, the React Query library needed to be
          implemented. React Query updates the state of the data periodically
          which causes an API request to be sent. This feature of React Query
          can cause a rapid depletion of the requests therefore potentially
          causing instability.
        </p>
        <p>
          Luckily this site will have a very small number of potential users
          which ensures the functionality. In the future there will be a way to
          count the amount of requests being sent and once a certain threshold
          is met there will be a notice shown to the user explaining why the
          site needs to be put on pause for the day.
        </p>
      </Container>
    </div>
  );
};

export default SearchResults;
