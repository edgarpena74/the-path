const router = require("express").Router();
const axios = require("axios");
const db = require("../models");

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

router.get("/search/:input", async (req, res) => {
  // const searchInput = await db.SearchInput.find({ input: req.body });
  // console.log("Line 40 // Back end SearchInput: ", searchInput);
  const url = `https://ridb.recreation.gov/api/v1/activities?apikey=${process.env.API_KEY}&query=${req.params.input}`;
  axios
    .get(url)
    .then((data) => {
      res.json(data.data);
      console.log(data.data, " BE// Line 28");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
