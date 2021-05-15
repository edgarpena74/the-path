import React from "react";

const LocationParent = ({ data, index }) => {
  console.log(index);
  console.log(data);
  // const dataNew = await data.then((values) => {
  //   console.log(values);
  //   const test = values;
  //   return test;
  // });
  // console.log(dataNew);
  // const dataArr = [data];
  // Promise.all(d).then((values) => {
  //   console.log(values);
  // });
  // const newData = data.then((arr) => {
  //   return arr;
  // });
  // console.log(newData);
  if (data !== undefined) {
    console.log(data);
    return <div>{data[index]}</div>;
  } else if (data === []) {
    return <div>Loading...</div>;
  }
};

export default LocationParent;
