import React, { useEffect } from "react";
import TopMain from "./TopMain";
import BottomMain from "./BottomMain";

const Test = ({ searchFunction, onChangeFunction }) => {
  return (
    <div>
      <TopMain search={searchFunction} OnChange={onChangeFunction} />
      <BottomMain />
    </div>
  );
};

export default Test;
