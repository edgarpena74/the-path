import React, { useState } from "react";
import "./Main.css";
import Image from "react-bootstrap/Image";
import mainPhoto from "../Assets/mainPhoto.jpeg";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

//
//
// EDIT CSS DETAILS LATER TO
//
//
//

const Main = () => {
  const [userSearch, setUserSearch] = useState({
    input: "",
  });

  const onChange = (e) => {
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
    console.log("onChange function ran");
  };

  const search = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/searchinput", userSearch);
      console.log(userSearch, " this is from handleSearch");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mainDiv">
      {/* Image */}
      <div className="mainPhoto">
        <Image src={mainPhoto} fluid />
      </div>
      {/*  */}
      {/*  */}
      {/* make fluid container a media query */}
      {/* !!!!!!!!! DUDE YOU CAN USE THE DEV TOOLS "DEVICE TOOL BAR" TO HELP WITH MOBILE */}
      {/*  */}
      {/*  */}
      <Container fluid className="overlay">
        <Row d-flex className="justify-content-center">
          <div>
            <h1>Find Your Path</h1>
          </div>
        </Row>
        <Row className="formRow d-flex align-items-stretch">
          {/* Blank */}
          <Col sm="1" md="1" lg="1" className="blankColLeft"></Col>
          {/* blank */}
          {/* Start of form col*/}
          <Col
            sm="9"
            md="9"
            lg="9"
            className="formCol d-flex align-items-center"
          >
            <Form
              className="form-inline searchForm"
              id="inputSearch"
              onSubmit={search}
            >
              <input
                onChange={onChange}
                type="text"
                className="form-control formInput form-control-lg"
                placeholder="Search"
                name="input"
              ></input>
            </Form>
          </Col>
          {/* End of form */}
          {/* Start of Button col */}
          <Col
            sm="1"
            md="1"
            lg="1"
            className="btnCol d-flex border-left  align-items-center justify-content-center "
          >
            <button type="submit" className="btn submitBtn" form="inputSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
              </svg>
            </button>
          </Col>
          {/* End of button col */}
          {/* Blank */}
          <Col sm="1" md="1" lg="1" className="blankColRight"></Col>
          {/* Blank */}
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
