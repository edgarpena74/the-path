import React, { useEffect } from "react";
import TopIntro from "./TopIntro";
import BottomIntro from "./BottomIntro";

const IntroMain = ({ searchFunction, onChangeFunction }) => {
  return (
    <div>
      <TopIntro search={searchFunction} OnChange={onChangeFunction} />
      <BottomIntro />
    </div>
  );
};

export default IntroMain;
