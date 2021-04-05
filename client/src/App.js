import "./App.css";

function App() {
  // let userQuery = "camp";
  // const url = `https://ridb.recreation.gov/api/v1/activities?query=${userQuery}&offset=0`;
  const url = `https://ridb.recreation.gov/api/v1/activities?query=$camp&offset=0`;
  console.log(url);
  fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      // "Content-Type": "application/json",
      // "x-api-key": process.env.API_KEY,
      Accept: "application/json",
      Apikey: process.env.API_KEY,
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default App;
