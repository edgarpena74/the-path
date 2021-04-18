import React from "react";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import "./Cards.css";
// renders the API data to the list items/ cards
const Cards = ({ result }) => {
  return (
    <ListGroup.Item className="cardStyle">
      <Image
        className="img d-inline"
        src={result.images[0].url}
        alt="No image"
      />
      <div className="title d-inline">{result.title}</div>
    </ListGroup.Item>
  );
};

export default Cards;
