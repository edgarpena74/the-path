import { useState, useContext } from "react";
import { QueryContext } from "./QueryContext";
import API from "./API";

const useCustom = () => {
  const { userSearch, setUserSearch } = useContext(QueryContext);
  const [searchData, setSearchData] = useState([]);
  API.searchRes(userSearch.input).then((res) => {
    console.log(res.data.data);
    setSearchData(res.data.data);
    console.log(searchData, "searchData inside of useEffect");
    // setListItemData([res.data.data[0]]);
  });
};

export default useCustom;
