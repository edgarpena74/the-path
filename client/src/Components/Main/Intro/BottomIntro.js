import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
import "./BottomMain.css";
import API from "../../../utils/API";
import Card from "react-bootstrap/Card";

const BottomIntro = () => {
  //This brings the seed data in to the bottom section of the
  //first page
  const [seeds, setSeeds] = useState([
    // {
    //   title: "",
    //   imageURL: "",
    // },
  ]);
  // This renders the seed data when it loads(is mounted)
  useEffect(() => {
    getSeedData();
  }, []);

  // This is the callback for getting te seed data and updating
  // the state for seeds const
  function getSeedData() {
    API.getSeeds().then((res) => {
      // console.log(res.data);
      setSeeds(res.data);
    });
  }
  // console.log(seeds);

  // const cards = ({title, imageURL}) => {

  // }

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
          {seeds.map((data) => (
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
          ))}
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
