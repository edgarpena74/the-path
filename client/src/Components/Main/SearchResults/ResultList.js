import React, { useState, useEffect } from "react";

import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import LocationList from "./LocationList";

//try moving the jsx as a separate function

const ResultList = ({ onClickList, results, locationArray }) => {
  const [locationElementState, setLocationElementState] = useState([]);

  useEffect(() => {
    // Gets the data from the promise and makes data usable
    const locationPromise =
      locationArray !== undefined
        ? Promise.all(locationArray).then((data) => {
            // console.log(data);
            //
            //
            // This gets the name of the search result
            const dataMap = data.map((res) => {
              console.log(res);
              if (res === undefined) {
                const noLocation = "No Location Found";
                return noLocation;
              } else {
                const mapRes = res.data?.features[0]?.properties?.label;
                // const mapRes = res.data?.features[0]?.properties;
                return mapRes;
              }
            });
            // Passes dataMap as a param
            return locationRefine(dataMap);
          })
        : undefined;
    // console.log(locationPromise, "hello");

    // Refines the data and changes any undefined data to "No Location Found"
    const locationRefine = (dataMap, index) => {
      // console.log(dataMap);
      const promiseData = dataMap;
      // Array with updated data
      const arr = promiseData.map((el) => {
        if (el === undefined) {
          return "No Location Found";
        } else {
          return el;
        }
      });
      // New data gets passed as a param
      return locationElement(arr);
    };
    // Function that sets the location element state with fulfilled data(not [promise] or out of order)
    const locationElement = async (arr, index) => {
      // console.log(arr);
      const newArr = await arr;
      console.log(newArr);
      // Sets state with data in correct order
      setLocationElementState(newArr);
      return newArr;
    };
    //
  }, []);

  // const locationReturn = locationElement() ?? "";
  // console.log(locationReturn);

  // The List of search results on the left side of screen
  return (
    <div>
      {results !== undefined
        ? results.map((result, index) => (
            //
            //
            // *** set point-events to non in order to make this one cohesive clickable item
            // List items for results
            <ListGroup.Item
              id={result.id}
              key={result.id}
              type="button"
              onClick={(e) => onClickList(e)}
              action
              className="listItemStyle stretched-link"
            >
              <Container>
                {/* <Container className="listItemInfoContainer">
                <Row> */}
                {/* Image */}
                {/* <Col sm="2" md="2" lg="2" className="listImageCol"> */}
                {/* <div className="inlineListItem d-inline-flex"> */}
                <Row>
                  <Col sm="3" md="3" lg="3">
                    {" "}
                    <Image
                      className="listItemImg"
                      src={
                        result.images[0].url === ""
                          ? fern
                          : result.images[0].url
                      }
                      alt="No Image Available"
                    />
                  </Col>

                  {/* </Col> */}
                  {/* <Col className="listTextCol"> */}
                  {/* name of area */}
                  <Col sm="9" md="9" lg="9">
                    <div className="listItemTitleLoc">
                      <div className="listItemTitle ">{result.title}</div>

                      <div className="listItemLoc ">
                        {/* Locations */}
                        <LocationList
                          elementData={locationElementState}
                          index={index}
                          locationArray={locationArray}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>

              {/* </Col> */}
              {/* </Row> */}
              {/* </Container> */}
            </ListGroup.Item>
          ))
        : ""}
      {/* {hello()} */}
    </div>
  );
};

export default ResultList;
