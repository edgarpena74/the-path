import React, { useContext } from "react";
import "./TopIntro.css";
// import Image from "react-bootstrap/Image";
// import mainPhoto from "../Assets/mainPhoto.jpeg";
// import mainPhoto from "./Assets/mainPhoto.jpeg";
// import SearchResults from "../SearchResults/SearchResults";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import FunctionsContext from "../../../utils/FunctionsContext";
// import { QueryContext } from "../../../utils/QueryContext";
import { QueryContext } from "../../../utils/Contexts";

//
//
// EDIT CSS DETAILS LATER TO
//
//
//

// const TopIntro = ({ search, onChange, userSearch, setUserSearch }) => {
const TopIntro = () => {
  //This context passes he handleSearch function from App.js
  const { handleSearch } = useContext(FunctionsContext);

  //This context is used to save whats the user is searching
  //allowing the data to be used in other components
  const { userSearch, setUserSearch } = useContext(QueryContext);
  // console.log(userSearch, "usersearch from top intro");
  // Updates the state of userSearch
  const onChange = (e) => {
    // console.log("on change ran");
    setUserSearch({ ...userSearch, [e.target.name]: e.target.value });
  };
  // console.log(userSearch, " this is the value for userSearch TopMain.js");
  return (
    <div>
      <div className="container-fluid topMainDiv d-flex align-items-center">
        {/*  */}
        {/*  */}
        {/* make fluid container a media query */}
        {/* !!!!!!!!! DUDE YOU CAN USE THE DEV TOOLS "DEVICE TOOL BAR" TO HELP WITH MOBILE */}
        {/*  */}
        {/*  */}
        <Container fluid className="overlay">
          {/* <Row className="d-flex justify-content-center"> */}
          <Row className="d-flex justify-content-center">
            <div>
              <h1 className="introText">Find Your Path</h1>
            </div>
          </Row>
          <Row className="topIntFormRow">
            <div className="topIntFormBorder">
              <Form inline className="topIntSearchForm" onSubmit={handleSearch}>
                <Form.Group controlId="topIntSearchFormGroup">
                  {/* Input */}
                  <Form.Control
                    className="topIntSearchFormInput"
                    size="lg"
                    type="text"
                    placeholder="Search "
                    // onChange={onChange}
                    name="input"
                  />
                </Form.Group>
                <Button type="submit" className="topIntSearchFormBtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
                  </svg>
                </Button>
              </Form>
            </div>
          </Row>
        </Container>
        {/* search bar/ form stuff */}
        {/* figure out the margin on the page */}
        {/* Bay area Favorites */}
        {/* Pre-rendered bay sites */}
        {/* four boxes */}
        {/* </Container> */}
      </div>
    </div>
  );
};

export default TopIntro;
