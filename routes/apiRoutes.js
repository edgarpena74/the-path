const router = require("express").Router();
// const axios = require("axios");
// const db = require("../models");

// router.get("/test", (req, res) => {
//   res.send({ msg: "success" });
// });

// router.delete("/searchinput", (req, res) => {
//   db.SearchInput.deleteMany({})
//     .then((data) => {
//       console.log(res.json(data));
//       res.json(data);
//     })
//     .catch((err) => console.log(err));
// });

// router.post("/searchinput", (req, res) => {
//   console.log(req.body);
//   db.SearchInput.create(req.body)
//     .then((dbSearchInput) => {
//       res.json(dbSearchInput);
//       console.log("Line 20 // Back End Search Input: ", dbSearchInput);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });
const {
  newInput,
  getInput,
  deleteInput,
} = require("../controllers/inputController");

router.post("/search-input", newInput);

router.get("/search-input", getInput);

router.delete("/search-input", deleteInput);

// router.get("/searchinput", (req, res) => {
//   db.SearchInput.find({})
//     .then((data) => {
//       console.log(res.json(data));
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/search", async (req, res) => {
//   const searchInput = await db.SearchInput.find({ input: "" });
//   console.log("Line 40 // Back end SearchInput: ", searchInput);
//   const url = `https://ridb.recreation.gov/api/v1/activities?apikey=${process.env.API_KEY}&query=${searchInput}`;
//   axios
//     .get(url)
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
// });

module.exports = router;
