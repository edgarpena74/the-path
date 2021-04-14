import React, { useEffect } from "react";
import TopIntro from "./TopIntro";
import BottomIntro from "./BottomIntro";

const IntroMain = ({
  searchFunction,
  onChangeFunction,
  userSearchState,
  setUserSearchState,
}) => {
  return (
    <div>
      <TopIntro
        search={searchFunction}
        OnChange={onChangeFunction}
        userSearch={userSearchState}
        setUserSearch={setUserSearchState}
      />
      <BottomIntro />
    </div>
  );
};

export default IntroMain;
