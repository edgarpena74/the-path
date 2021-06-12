import React from "react";
import Loader from "../../Loader/Loader";

const LocationParent = ({ elementData, index }) => {
  // console.log(index);
  if (elementData !== undefined) {
    // console.log(data);
    return <div>{elementData[index]}</div>;
  } else {
    return (
      <div>
        <Loader />
      </div>
    );
  }
};

export default LocationParent;
