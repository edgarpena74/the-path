import React, { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";
import { QueryContext } from "../../../utils/Contexts";

const ResultList = ({ onClickItem, results }) => {
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
            </ListGroup.Item>
          ))
        : ""}
    </div>
  );
};

export default ResultList;
