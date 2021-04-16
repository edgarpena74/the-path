import React from "react";
import Image from "react-bootstrap/Image";
import "./Cards.css";
const Cards = ({ result }) => {
  // const { userSearch, setUserSearch } = useContext(QueryContext);

  // console.log(userSearch, " value of userSearch inside of SearchResults.js");

  // const [initSearch, setInitSearch] = useState([]);

  // function onPageLoad() {
  //   API.initSearch(userSearch).then((res) => {
  //     setInitSearch(res.data);
  //   });
  // }

  // useEffect(() => {
  //   onPageLoad();
  // }, []);

  // console.log(initSearch, " initSearch Data");
  return (
    <div className="cardStyle">
      <Image className="img d-inline" src={result.images[0].url} />
      <div className="title d-inline">{result.title}</div>
    </div>
  );
};

export default Cards;
