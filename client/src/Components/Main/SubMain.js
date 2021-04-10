import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./subMain.css";
const SubMain = () => {
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
          <Col className="subBox">1</Col>
          <Col className="subBox">2</Col>
          <Col className="subBox">3</Col>
          <Col className="subBox">4</Col>
        </Row>
      </Container>
    </div>
  );
};

export default SubMain;
