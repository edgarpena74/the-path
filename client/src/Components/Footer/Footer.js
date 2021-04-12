import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <Navbar
        className="footer justify-content-center"
        sticky="bottom"
        bg="dark"
      >
        <Nav>
          <Nav.Item className="footerText">&copy; Edgar Peña 2021</Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Footer;
