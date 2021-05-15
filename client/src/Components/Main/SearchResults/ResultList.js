import React, { useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";
import { QueryContext } from "../../../utils/Contexts";
import LocationList from "./LocationList";

//try moving the jsx as a separate function

const ResultList = ({ onClickItem, results, locationArray }) => {
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

  // const locationReturn = locationElement() ?? "";
  // console.log(locationReturn);

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
              onClick={(e) => onClickItem(e)}
              type="button"
              action
              className="listItemStyle"
            >
              <Image
                className="listItemImg d-inline"
                src={result.images[0].url === "" ? fern : result.images[0].url}
                alt="No Image Available"
              />
              <div className="listItemTitle d-inline">{result.title}</div>
              <LocationList
                data={locationElementState}
                index={index}
                locationArray={locationArray}
              />
            </ListGroup.Item>
          ))
        : ""}
      {/* {hello()} */}
    </div>
  );
};

export default ResultList;
