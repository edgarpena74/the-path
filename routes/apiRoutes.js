const router = require("express").Router();
const axios = require("axios");
const db = require("../models");

router.get("/test", (req, res) => {
  res.send({ msg: "success" });
});

// Seeds
const { getSeeds } = require("../controllers/seeds");
router.get("/seeds", getSeeds);

//API
router.get("/places/:input", async (req, res) => {
  // const searchInput = await db.SearchInput.find({ input: req.body });
  // console.log("Line 40 // Back end SearchInput: ", searchInput);
  const url = `https://developer.nps.gov/api/v1/places?q=${req.params.input}&api_key=${process.env.API_KEY}&limit=1`;
  axios
    .get(url)
    .then((data) => {
      console.log(data.data, " BE// Line 58");
      res.json(data.data);
      const test = data.data.data[0].title;
      console.log(test, " This is the test value BE");
    })
    .catch((err) => console.log(err));
});

//For Seed data
router.get("/places", async (req, res) => {
  // const searchInput = await db.SearchInput.find({ input: req.body });
  // console.log("Line 40 // Back end SearchInput: ", searchInput);
  const url = `https://developer.nps.gov/api/v1/places?q=muir%20woods%20national%20monumentk&api_key=${process.env.API_KEY}&limit=1`;
  axios
    .get(url)
    .then((data) => {
      console.log(data.data, " BE// Line 58");
      res.json(data.data);
      const apiObject = {
        title: data.data.data[0].title,
        desc: data.data.data[0].title,
        img: data.data.data[0].images[0].url,
      };
      console.log("this is the object", apiObject);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
