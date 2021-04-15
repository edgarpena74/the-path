import React from "react";

const SearchContext = React.createContext({
  userSearch: { searchInput: "" },
  setUserSearch: () => {},
  handleSearch: () => {},
  onChange: () => {},
});

export default SearchContext;
