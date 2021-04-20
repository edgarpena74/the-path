import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <footer
        className=" justify-content-center bg-dark"
        // sticky="bottom"
        // bg="dark"
      >
        <p className="footerText">&copy; Edgar Peña 2021</p>
      </footer>
    </div>
  );
};

export default Footer;
