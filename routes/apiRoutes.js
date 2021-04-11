const router = require("express").Router();
const axios = require("axios");
const db = require("../models");

router.get("/test", (req, res) => {
  res.send({ msg: "success" });
});

// Input Routes
const {
  newInput,
  getInputdb,
  deleteInput,
} = require("../controllers/inputController");
const { SearchInput } = require("../models");

router.post("/search-input", newInput);

router.get("/search-input", getInputdb);

router.delete("/search-input", deleteInput);
//

// router.get("/activities/:input", async (req, res) => {
//   // const searchInput = await db.SearchInput.find({ input: req.body });
//   // console.log("Line 40 // Back end SearchInput: ", searchInput);
//   const url = `https://ridb.recreation.gov/api/v1/activities?apikey=${process.env.API_KEY}&query=${req.params.input}`;
//   axios
//     .get(url)
//     .then((data) => {
//       res.json(data.data);
//       console.log(data.data, " BE// Line 28");
//     })
//     .catch((err) => console.log(err));
// });

// router.get("/rec-areas", async (req, res) => {
//   // const searchInput = await db.SearchInput.find({ input: req.body });
//   // console.log("Line 40 // Back end SearchInput: ", searchInput);
//   const url = `https://ridb.recreation.gov/api/v1/recareas?apikey=${process.env.API_KEY}&query=camp&full=true&state=CA&activity=Camping`;
//   axios
//     .get(url)
//     .then((data) => {
//       res.json(data.data);
//       console.log(data.data, " BE// Line 41");
//     })
//     .catch((err) => console.log(err));
// });

router.get("/places", async (req, res) => {
  // const searchInput = await db.SearchInput.find({ input: req.body });
  // console.log("Line 40 // Back end SearchInput: ", searchInput);
  const url = `https://developer.nps.gov/api/v1/places?q=point%20reyes&api_key=tEgUGWuSzzWprEXfOcsbhg5fDi4eM5OkCNXcQq0e`;
  axios
    .get(url)
    .then((data) => {
      res.json(data.data);
      console.log(data.data, " BE// Line 58");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
