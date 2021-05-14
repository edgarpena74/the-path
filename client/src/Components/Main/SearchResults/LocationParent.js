import React, { useState } from "react";

const LocationParent = ({ data }) => {
  const [dataState, setDataState] = useState([]);
  if (data !== undefined) {
    const arr = [data];
    console.log(arr);
    Promise.all(arr).then((res) => {
      return setDataState(res);
    });
    console.log(dataState);
    return <div>hello</div>;
  }
};

export default LocationParent;
