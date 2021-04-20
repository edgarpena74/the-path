import React, { useEffect } from "react";
import TopIntro from "./TopIntro";
import BottomIntro from "./BottomIntro";
import Container from "react-bootstrap/Container";

const IntroMain = () => {
  return (
    <div>
      <TopIntro />
      <BottomIntro />
    </div>
  );
};

export default IntroMain;
