import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const SearchBar = () => {
  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Search" />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
