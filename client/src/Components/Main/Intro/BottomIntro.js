import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
import "./BottomMain.css";
import API from "../../../utils/API";
import Card from "react-bootstrap/Card";

//implement use effect to render code upon loading
const BottomIntro = () => {
  const [seeds, setSeeds] = useState([
    // {
    //   title: "",
    //   imageURL: "",
    // },
  ]);

  useEffect(() => {
    getSeedData();
  }, []);

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
    <div className="subDiv ">
      <Container className="subContainer ">
        <Row className="subHeading">
          <h1>Northern California Favorites</h1>
        </Row>
        {/* <Row className="subBoxRow d-flex justify-content-center"> */}
        <Row className="subBoxRow d-flex justify-content-center">
          {seeds.map((data) => (
            <Card style={{ width: "15rem", margin: "7px" }}>
              <Card.Body>
                <Card.Text>
                  <p>{data.title}</p>
                </Card.Text>
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
    </div>
  );
};

export default BottomIntro;
