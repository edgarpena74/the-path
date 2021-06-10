import React from "react";

const LocationParent = ({ elementData, index }) => {
  // console.log(index);
  if (elementData !== undefined) {
    // console.log(data);
    return <div>{elementData[index]}</div>;
  } else {
    return <div>loading...</div>;
  }
};

export default LocationParent;
