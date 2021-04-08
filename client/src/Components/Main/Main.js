import React from "react";
import "./Main.css";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
// import binoculars from "../Assets/binoculars.png";
import mainPhoto from "../Assets/mainPhoto.jpeg";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Main = () => {
  return (
    <div className="mainDiv">
      {/* <Container fluid className="mainContainer"> */}
      {/* Image */}
      <div className="mainPhoto">
        <Image src={mainPhoto} fluid />
      </div>
      {/*  */}
      {/*  */}
      {/* make fluid container a media query */}
      {/*  */}
      {/*  */}
      <Container fluid className="overlay">
        <Row d-flex className="justify-content-center">
          <div>
            <h1>Find Your Path</h1>
          </div>
        </Row>
        <Row className="formRow">
          {/* <Col
            className="icon d-flex align-items-center justify-content-center"
            xs="1"
            sm="1"
            md="1"
            lg="1"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
              </svg>
            </div>
          </Col> */}
          <Col className="form d-flex align-items-center">
            <Form className="searchForm">
              <Form.Control
                className="formControl form-control-lg shadow-none"
                type="text"
                placeholder="Search"
              ></Form.Control>
            </Form>
          </Col>
          <Col
            className="buttonCol d-flex align-items-stretch"
            xs="1"
            sm="1"
            md="1"
            lg="1"
          >
            <Button type="submit" form="searchForm" className="searchBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
              </svg>
            </Button>
          </Col>
        </Row>
      </Container>
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
