import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import "./Cards.css";
// import { ResultIDContext } from "../../../../utils/ResultIDContext";
// import {QueryContext} from "../../../../utils/QueryContext"
// renders the API data to the list items/ cards
const Cards = ({ result }) => {
  // const { onClick } = useContext(SearchResultsContext);

  return (
    <ListGroup
      variant="flush"
      className="border-bottom"
      // id={result.id}
    >
      <ListGroup.Item action className="cardStyle">
        <Image className="img d-inline" src={result.images[0].url} alt="" />
        <div className="title d-inline">{result.title}</div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Cards;
