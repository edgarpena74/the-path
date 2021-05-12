import React, { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";
import { QueryContext } from "../../../utils/Contexts";
import Location from "./Location";

const ResultList = ({ onClickItem, results, locationArray }) => {
  // console.log("hello");
  // const { userSearch, setUserSearch } = useContext(QueryContext);
  // const queryClient = useQueryClient();
  // // const searchData = useMutation((data) =>
  // //   API.searchRes(userSearch.input, data)
  // // );
  // console.log(userSearch);
  // const searchData = useQuery(userSearch.input, () =>
  //   API.searchRes(userSearch.input)
  // );

  // const results= searchData?.data?.data?.data;
  // console.log(searchResponse);
  // console.log(locationArray);

  const locationPromise =
    locationArray !== undefined
      ? Promise.all(locationArray).then((data) => {
          console.log(data);
          const dataMap = data.map((res) => {
            const mapRes = res.data?.features[0]?.properties?.label;
            return mapRes;
          });
          console.log(dataMap);
          return locationElement(dataMap);
          //pass the data as a parameter to a function
          // return data;
        })
      : undefined;

  const locationElement = (dataMap, index) => {
    console.log(dataMap);
    const arr = [];
    if (dataMap !== undefined) {
      dataMap.map((el) => {
        if (el === undefined) {
          const noneFound = "No Location Found";
          return arr.push(noneFound);
        } else {
          const element = el;
          return arr.push(element);
        }
      });
      // console.log(newArr);
      // return newArr[index];
    }
    console.log(arr);
    return arr[index];
  };

  // const locationElement = (index) => {
  //   if (locationRefining !== undefined) {
  //     return locationRefining(index);
  //   }
  // };
  console.log(locationElement());

  //do a remap of the data to set "no location if undefined"
  console.log(locationPromise);
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
              {locationElement() === undefined ? (
                <div>Loading...</div>
              ) : locationElement() !== undefined ? (
                <div>{locationElement(index)}</div>
              ) : (
                <div>{locationElement(index)}</div>
              )}
              {/* <div>{locationElement()}</div> */}
            </ListGroup.Item>
          ))
        : ""}
      {/* {hello()} */}
    </div>
  );
};

export default ResultList;
