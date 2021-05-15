import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";
import { QueryContext } from "../../../utils/Contexts";
import LocationList from "./LocationList";

const jsxFunc = (listItemData, LocationElementIndex, locationElementState) => {
  console.log(LocationElementIndex);

  console.log(locationElementState);
  const stateIndex = LocationElementIndex;
  const hello = () => {
    if (locationElementState === []) {
      return <div>Loading...</div>;
    } else {
      return <div>{locationElementState[stateIndex]}</div>;
    }
  };
  console.log(hello());
  return (
    <div>
      {listItemData !== undefined
        ? listItemData.map((data, index) => (
            <div key={data.id}>
              <h1>{data.title}</h1>

              <Image
                src={data.images[0].url === "" ? fern : data.images[0].url}
                fluid
              />
              <div style={{ display: "none" }}>Hello World</div>
              {/* <LocationParent /> */}
              <p>{data.audioDescription}</p>
              {"\n"}
              <p>
                {data.isOpenToPublic === "1"
                  ? "Open to public"
                  : "Not open to public"}
              </p>
              <div>
                <a href={data.url}>See More Information</a>
              </div>
              {/* <div>{data.bodyText}</div> */}
            </div>
          ))
        : ""}
    </div>
  );
};

const InformationBlock = ({ results, listItemID, locationArray }) => {
  const [locationElementState, setLocationElementState] = useState([]);

  useEffect(() => {
    const locationPromise =
      locationArray !== undefined
        ? Promise.all(locationArray).then((data) => {
            // console.log(data);

            const dataMap = data.map((res) => {
              const mapRes = res.data?.features[0]?.properties?.label;
              return mapRes;
            });

            return locationRefine(dataMap);
            //pass the data as a parameter to a function
            // return data;
          })
        : undefined;
    // console.log(locationPromise, "hello");

    const locationRefine = (dataMap, index) => {
      // console.log(dataMap);
      const promiseData = dataMap;
      // console.log(promiseData);
      const arr = promiseData.map((el) => {
        if (el === undefined) {
          return "No Location Found";
        } else {
          return el;
        }
      });
      return locationElement(arr);
    };
    const locationElement = async (arr, index) => {
      // console.log(arr);
      const newArr = await arr;
      console.log(newArr);
      setLocationElementState(newArr);
      return newArr;
    };
    //
  }, []);

  if (listItemID === "") {
    console.log("no ID");
    console.log(locationElementState);
    const LocationElementIndex = 0;
    const listItemData = [results[0]];
    // const index = 0;
    return jsxFunc(listItemData, LocationElementIndex, locationElementState);
  } else if (results !== undefined) {
    console.log(locationElementState);
    console.log("new ID");
    console.log(listItemID, "new ID");
    const listItemData = results.filter((data) => data.id === listItemID);
    console.log(listItemData);
    return jsxFunc(listItemData);
  }
};

export default InformationBlock;
