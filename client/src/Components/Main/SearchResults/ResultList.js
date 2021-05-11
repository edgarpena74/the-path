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
  console.log(locationArray);

  const locationPromise =
    locationArray !== undefined
      ? Promise.all(locationArray).then((data) => {
          console.log(data);
          const hello = data.map((res) => {
            const helloTwo = res.data?.features[0]?.properties?.label;
            console.log(helloTwo);
            return helloTwo;
          });
          console.log(hello);
          //pass the data as a parameter to a function
          // return data;
        })
      : undefined;

  const numArr = ["1", "2", "3"];

  //do a remap of the data to set "no location if undefined"
  console.log(locationPromise);
  return (
    <div>
      {results !== undefined
        ? results.map((result) => (
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
              {numArr.map((data) => {
                return <div>{data}</div>;
              })}
            </ListGroup.Item>
          ))
        : ""}
      {/* {hello()} */}
    </div>
  );
};

export default ResultList;
