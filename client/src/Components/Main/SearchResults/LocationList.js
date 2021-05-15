import React from "react";

const LocationParent = ({ data, index, locationArray }) => {
  console.log(index);
  if (data !== undefined) {
    // console.log(data);
    return <div>{data[index]}</div>;
  } else {
    return <div>loading...</div>;
  }
};

export default LocationParent;
