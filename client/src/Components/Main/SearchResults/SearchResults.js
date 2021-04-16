import React, { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import API from "../../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cards from "./CardBlock/Cards";
import ListGroup from "react-bootstrap/ListGroup";
import InfoBlock from "./InfoBlock/InfoBlock";
import "./SearchResults.css";
// import FunctionsContext from "../../../utils/FunctionsContext";
import { QueryContext } from "../../../utils/QueryContext";

const SearchResults = () => {
  const { userSearch, setUserSearch } = useContext(QueryContext);

  // console.log(
  //   userSearch.input,
  //   " value of userSearch inside of SearchResults.js"
  // );

  const [initSearch, setInitSearch] = useState([]);
  // console.log(initSearch, "init search pre useEffect");

  // API.initSearch(userSearch.input).then((res) => {
  //   return setInitSearch(res.data.data);
  // });

  useEffect(() => {
    API.initSearch(userSearch.input).then((res) => {
      setInitSearch(res.data.data);
    });
  }, [userSearch.input]);

  console.log(userSearch, "current userSearch State");
  console.log(initSearch, " initSearch Data");
  return (
    <div className="searchResultsDiv">
      <Container>
        <Row>
          {/* Left Side */}
          <Col className="leftSide" lg="6" md="6">
            {/* <div className="resultsDiv">
              {initSearch.map((result) => (
                <Cards result={result} />
              ))}
            </div> */}
            <ListGroup className="resultsDiv">
              {initSearch.map((result) => (
                <Cards result={result} />
              ))}
            </ListGroup>
          </Col>
          {/* Right Side */}
          <Col className="rightSide" lg="6" md="6">
            <div className="infoDiv">
              <InfoBlock />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;
