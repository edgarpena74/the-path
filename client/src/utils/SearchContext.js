import React from "react";

const SearchContext = React.createContext({
  searchInput: "",
  handleSearch: () => {},
  onChange: () => {},
});

export default SearchContext;
