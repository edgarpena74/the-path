import React from "react";
import "./Loader.css";
import Container from "react-bootstrap/Container";
import loadingGif from "./loadingGif.gif";

const Loader = () => {
  return (
    //work on height
    <Container className="loaderCont">
      <div className="loaderDiv">
        <img src={loadingGif} alt="..Loading" className="loadingGif" />
      </div>
    </Container>
  );
};

export default Loader;
