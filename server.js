require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/apiRoutes"));
// const url = `https://ridb.recreation.gov/api/v1/activities?query=$camp&offset=0`;
// console.log(url);

//Setting up port
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
