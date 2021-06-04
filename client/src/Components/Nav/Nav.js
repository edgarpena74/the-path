import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
import logo from "./Assets/logo.png";

// const Navigation = () => {
//   return (
//     <div>
//       {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
//       <Navbar collapseOnSelect expand="lg" className="navBar">
//         <Navbar.Brand className="logoImg" href="/">
//           <img className="logo" src={logo} />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav>
//             {/* <Nav.Item>
//               <Nav.Link href="/searchresults">Search Results</Nav.Link>
//             </Nav.Item> */}

//             {/* <Nav.Link eventKey={2} href="#memes">
//               Dank memes
//             </Nav.Link> */}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// };

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
