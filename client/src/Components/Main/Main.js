import React from "react";
import "./Main.css";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import mainPhoto from "../Assets/mainPhoto.jpeg";

// import Row from "react-bootstrap/Row";

const Main = () => {
  return (
    <div className="mainDiv">
      {/* <Container fluid className="mainContainer"> */}
      {/* Image */}
      <div className="mainPhoto">
        <Image src={mainPhoto} fluid />
      </div>
      <div className="overlay">TEST TEST *Overlay* TEST TEST</div>
      {/* search bar/ form stuff */}
      {/* figure out the margin on the page */}
      {/* Bay area Favorites */}
      {/* Pre-rendered bay sites */}
      {/* four boxes */}
      {/* </Container> */}
    </div>
  );
};

export default Main;