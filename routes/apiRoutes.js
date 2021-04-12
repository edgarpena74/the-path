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
