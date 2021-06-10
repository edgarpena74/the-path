import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
import logo from "./Assets/logo.png";

const Navigation = () => {
  return (
    <div>
      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
      <Nav collapseOnSelect expand="lg" className="navBar">
        {/* <div className="imgContainer" >
          <img className="logo" src={logo} />
        </div> */}
        <Navbar.Brand className="logoImg" href="/">
          <img className="logo" src={logo} />
        </Navbar.Brand>
      </Nav>
    </div>
  );
};

export default Navigation;
