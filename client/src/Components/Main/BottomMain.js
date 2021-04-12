import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BottomMain.css";
import API from "../../utils/API";
//implement use effect to render code upon loading
const BottomMain = () => {
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    getSeedData();
  });

  function getSeedData() {
    API.getSeeds().then((res) => {
      console.log(res.data.items);
    });
  }

  return (
    <div className="subDiv d-flex align-items-stretch">
      <Container fluid className="subContainer ">
        <Row className="subHeading">
          <h1>Northern California Favorites</h1>
        </Row>
        <Row className="subBoxRow d-flex justify-content-center">
          {/*  */}
          {/*  */}
          {/*  */}
          {/* CONSIDER CHANGING cols to divs and float them */}
          {/*  */}
          {/*  */}
          {/*  */}
          <Col className="subBox">
            <p>title</p>
            <Image src="holder.js/100px250" fluid />
          </Col>
          <Col className="subBox">2</Col>
          <Col className="subBox">3</Col>
          <Col className="subBox">4</Col>
        </Row>
      </Container>
    </div>
  );
};

export default BottomMain;
