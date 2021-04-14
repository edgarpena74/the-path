import React from "react";
import Image from "react-bootstrap/Image";
import "./Cards.css";
const Cards = () => {
  return (
    <div className="cardStyle">
      <Image className="img d-inline" src="https://via.placeholder.com/150" />
      <div className="title d-inline">This is the title</div>
    </div>
  );
};

export default Cards;
