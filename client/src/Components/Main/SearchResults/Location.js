import React from "react";

const Location = async ({ data }) => {
  console.log(data);
  const dataNew = await data.then((values) => {
    console.log(values);
    const test = values;
    return test;
  });
  console.log(dataNew);
  // const dataArr = [data];
  // Promise.all(d).then((values) => {
  //   console.log(values);
  // });
  // const newData = data.then((arr) => {
  //   return arr;
  // });
  // console.log(newData);
  return <div>hello</div>;
};

export default Location;
