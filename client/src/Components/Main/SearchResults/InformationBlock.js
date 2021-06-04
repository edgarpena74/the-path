import React, { useContext, useEffect, useState } from "react";

import fern from "./Assets/fern.jpg";

import Image from "react-bootstrap/Image";

const jsxFunc = (listItemData, locationElementIndex, locationElementState) => {
  // console.log(locationElementIndex);

  // console.log(locationElementState);
  const stateIndex = locationElementIndex;

  //  location Function
  // Add class here for CSS
  const locationInfo = () => {
    if (locationElementState === []) {
      return <div>Loading...</div>;
    } else {
      return <div>{locationElementState[stateIndex]}</div>;
    }
  };

  // List Items
  return (
    <div>
      {listItemData !== undefined
        ? listItemData.map((data, index) => (
            <div key={data.id} className="infoMapDiv">
              {/* Title */}
              <h1 className="infoTitle">{data.title}</h1>
              {/* Image */}
              <Image
                className="infoBlockImg"
                src={data.images[0].url === "" ? fern : data.images[0].url}
                fluid
              />
              <div style={{ display: "none" }}>Hello World</div>

              {/* Description */}
              <p>{data.audioDescription}</p>
              {"\n"}
              {/* Open to public */}
              <p>
                {data.isOpenToPublic === "1"
                  ? "Open to public"
                  : "Not open to public"}
              </p>
              {/* Link to site */}
              <div>
                <a href={data.url}>See More Information</a>
              </div>
              {/* Location on the list item */}
              <div>{locationInfo()}</div>
            </div>
          ))
        : ""}
    </div>
  );
};

const InformationBlock = ({ results, listItemID, locationArray, idTarget }) => {
  const [locationElementState, setLocationElementState] = useState([]);
  // console.log(idTarget);

  useEffect(() => {
    const locationPromise =
      locationArray !== undefined
        ? Promise.all(locationArray).then((data) => {
            // console.log(data);

            const dataMap = data.map((res) => {
              if (res === undefined) {
                const noLocation = "No Location Found";
                return noLocation;
              } else {
                const mapRes = res.data?.features[0]?.properties?.label;
                // const mapRes = res.data?.features[0]?.properties;
                return mapRes;
              }
            });

            return locationRefine(dataMap);
            //pass the data as a parameter to a function
          })
        : undefined;
    // console.log(locationPromise, "hello");

    const locationRefine = (dataMap, index) => {
      //Changing name for the data that was mapped
      const promiseData = dataMap;
      //Array for getting location information
      //  /////Pre Refinement
      const arr = promiseData.map((el) => {
        if (el === undefined) {
          return "No Location Found";
        } else {
          return el;
        }
      });
      //passing this data as a param to the next function
      return locationElement(arr);
    };
    //Async func to get array data.
    const locationElement = async (arr, index) => {
      // console.log(arr);
      //Array for the location information
      const newArr = await arr;
      // Sets location element state with fulfilled array data
      setLocationElementState(newArr);
      return newArr;
    };
    //
  }, []);

  // Conditional for what gets rendered in the information block
  if (listItemID === "") {
    // console.log("no ID");
    // console.log(locationElementState);
    const locationElementIndex = 0;
    const listItemData = [results[0]];
    // const index = 0;
    return jsxFunc(listItemData, locationElementIndex, locationElementState);
  } else if (results !== undefined) {
    // console.log(locationElementState);
    // console.log("new ID");
    // console.log(listItemID, "new ID");
    // console.log(results);
    const listItemData = results.filter((data) => data.id === listItemID);
    // console.log(listItemData);
    // console.log(locationElementState);
    // const filteredItemID = listItemData[0].id;
    // console.log(filteredItemID);
    // const indexOfID = locationElementState.indexOf(listItemData);
    // console.log(indexOfID);
    const locationElementIndex = 0;
    return jsxFunc(listItemData, locationElementIndex, locationElementState);
  }
};

export default InformationBlock;
