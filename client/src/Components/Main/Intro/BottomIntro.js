// import React, { useState, useEffect } from "react";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BottomMain.css";
// import API from "../../../utils/API";
import Card from "react-bootstrap/Card";
import Loader from "../../Loader/Loader";

const BottomIntro = () => {
  //***************************************************** */
  //
  // Commenting this out to to issues with having more than one cluster in mongoDB
  //
  //
  //This brings the seed data in to the bottom section of the
  //first page
  // const [seeds, setSeeds] = useState([]);
  // This renders the seed data when it loads(is mounted)
  // useEffect(() => {
  //   getSeedData();
  // }, []);

  // This is the callback for getting te seed data and updating
  // the state for seeds const
  // function getSeedData() {
  //   API.getSeeds().then((res) => {
  //     // console.log(res.data);
  //     setSeeds(res.data);
  //   });
  // }
  //
  //***************************************************** */

  const seeds = [
    {
      id: "1",
      title: "Point Reyes Lighthouse",
      imageURL:
        "https://www.nps.gov/common/uploads/cropped_image/DFB0CAAA-EE69-F1BA-5D4C31A2CB62CB66.jpg",
    },
    {
      id: "2",
      title: "Baker Beach",
      imageURL:
        "https://www.nps.gov/common/uploads/cropped_image/CCF42D59-ABD7-9F3D-9C16257CC86F35F4.jpg",
    },
    {
      id: "4",
      title: "Drakes Beach",
      imageURL:
        "https://www.nps.gov/common/uploads/cropped_image/primary/820D2985-9030-A353-D0DB1EEF0A9BFDBC.jpg",
    },
    {
      id: "5",
      title: "Muir Woods Main Trail",
      imageURL: "http://www.redwoodhikes.com/Muir/Main1.jpg",
    },
  ];

  return (
    // <div className="subDiv d-flex align-items-stretch">
    //
    // original div
    // <div className="d-flex botIntParDiv">
    // test div
    <div className="botIntParDiv">
      <Container className="  bottomContainer ">
        <Row className="subHeading ">
          <Col className="headingCol">
            <h1 className="heading d-flex">Northern California Favorites</h1>
          </Col>
        </Row>
        <Row className="subBoxRow">
          {seeds === undefined ? (
            <Loader />
          ) : (
            seeds.map((data) => (
              <Card key={data.id} style={{ width: "15rem", margin: "7px" }}>
                <Card.Body>
                  <Card.Text className="text-center">{data.title}</Card.Text>
                </Card.Body>
                <Card.Img
                  style={{ height: "178px" }}
                  variant="bottom"
                  src={data.imageURL}
                />
              </Card>
            ))
          )}
        </Row>
      </Container>
      <Container className="mt-5 mb-5 border-bottom border-top">
        <h1 className="pt-2">Future Development</h1>
        <h5>User Accounts</h5>
        <ul>
          <li>Allow users to create accounts.</li>
        </ul>
        <p>
          The user information would be store in a mongoDB database. Their
          password would be encrypted using bcrypt, a password hashing function,
          to ensure their information is secure.
        </p>
        <h5>Page Functionality</h5>
        <p>
          When the card items below the "Northern California Favorites" heading
          are clicked the user would be redirected to a page that shows the
          information for the location.
        </p>
        <h5>Visual Aspects</h5>
        <p>
          There will be continual development of the CSS for this page. The
          addition of media query's will allow there to be cleaner styling of
          the elements across different screen widths.
        </p>
      </Container>
    </div>
  );
};

export default BottomIntro;
