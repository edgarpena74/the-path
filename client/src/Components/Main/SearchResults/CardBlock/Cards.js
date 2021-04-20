import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import "./Cards.css";
// import { ResultIDContext } from "../../../../utils/ResultIDContext";
// import {QueryContext} from "../../../../utils/QueryContext"
import { SearchResultsContext } from "../../../../utils/SearchResultsContext";
// renders the API data to the list items/ cards
const Cards = ({ result }) => {
  // const { onClick } = useContext(SearchResultsContext);
  const onClick = (e) => {
    console.log("onClick");
    console.log(e.target.id);
  };

  return (
    // <ListGroup variant="flush" className="border-bottom">
    <ListGroup.Item
      action
      className="cardStyle"
      // id={result.id}
      id={result.id}
      onClick={(e) => onClick(e)}
    >
      <Image className="img d-inline" src={result.images[0].url} alt="" />
      <div className="title d-inline">{result.title}</div>
    </ListGroup.Item>
    // </ListGroup>
  );
};

export default Cards;
