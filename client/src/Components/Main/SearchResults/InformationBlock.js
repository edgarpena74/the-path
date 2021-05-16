import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";
import { QueryContext } from "../../../utils/Contexts";
import LocationList from "./LocationList";

const jsxFunc = (listItemData, locationElementIndex, locationElementState) => {
  console.log(locationElementIndex);

  console.log(locationElementState);
  const stateIndex = locationElementIndex;
  const locationInfo = () => {
    if (locationElementState === []) {
      return <div>Loading...</div>;
    } else {
      return <div>{locationElementState[stateIndex]}</div>;
    }
  };
  console.log(locationInfo());
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
              <div>{locationInfo()}</div>

              {/* <div>{data.bodyText}</div> */}
            </div>
          ))
        : ""}
    </div>
  );
};

const InformationBlock = ({ results, listItemID, locationArray, idTarget }) => {
  const [locationElementState, setLocationElementState] = useState([]);
  console.log(idTarget);

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
    const locationElementIndex = 0;
    const listItemData = [results[0]];
    // const index = 0;
    return jsxFunc(listItemData, locationElementIndex, locationElementState);
  } else if (results !== undefined) {
    console.log(locationElementState);
    console.log("new ID");
    console.log(listItemID, "new ID");
    console.log(results);
    const listItemData = results.filter((data) => data.id === listItemID);
    console.log(listItemData);
    console.log(locationElementState);
    const filteredItemID = listItemData[0].id;
    console.log(filteredItemID);
    const indexOfID = locationElementState.indexOf(listItemData);
    console.log(indexOfID);
    const locationElementIndex = 0;
    return jsxFunc(listItemData, locationElementIndex, locationElementState);
  }
};

export default InformationBlock;
