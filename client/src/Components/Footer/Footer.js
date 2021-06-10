import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.css";
import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <footer
          className=" justify-content-center "
          // sticky="bottom"
          // bg="dark"
        >
          <p className="footerText">&copy; Edgar Peña 2021</p>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
