require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//API Routing
app.use("/api", require("./routes/apiRoutes"));

// Optimize for Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//***************************************************** */
// MongoDB Cluster Issue
//
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/thePath",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("MongoDB connection established");
//   }
// );
//
//***************************************************** */

//Setting up port
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
