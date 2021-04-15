import React, { useContext } from "react";
// import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cards from "./CardBlock/Cards";
import InfoBlock from "./InfoBlock/InfoBlock";
import "./SearchResults.css";
import SearchContext from "../../../utils/SearchContext";
const SearchResults = () => {
  const { userSearch } = useContext(SearchContext);
  return (
    <div className="searchResultsDiv">
      <Container>
        <Row>
          {/* Left Side */}
          <Col className="leftSide" lg="6" md="6">
            <div className="resultsDiv">
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
            </div>
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
