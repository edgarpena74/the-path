import React, { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import fern from "./Assets/fern.jpg";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";
import { QueryContext } from "../../../utils/Contexts";

const jsxFunc = (listItemData) => {
  return (
    <div>
      {listItemData !== undefined
        ? listItemData.map((data) => (
            <div key={data.id}>
              <h1>{data.title}</h1>

              <Image
                src={data.images[0].url === "" ? fern : data.images[0].url}
                fluid
              />
              <div style={{ display: "none" }}>Hello World</div>
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

const InformationBlock = ({ results, listItemID }) => {
  console.log(results);
  if (listItemID === "") {
    console.log("no ID");
    const listItemData = [results[0]];
    return jsxFunc(listItemData);
  } else if (results !== undefined) {
    console.log("new ID");
    console.log(listItemID, "new ID");
    const listItemData = results.filter((data) => data.id === listItemID);
    console.log(listItemData);
    return jsxFunc(listItemData);
  }
};

export default InformationBlock;
