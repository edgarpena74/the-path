const router = require("express").Router();
const axios = require("axios");

router.get("/test", (req, res) => {
  res.send({ msg: "success" });
});

router.get("/search/:activity", (req, res) => {
  //&query= on url
  const url = `https://ridb.recreation.gov/api/v1/activities?apikey=${process.env.API_KEY}`;
  axios
    .get(url)
    // credentials: "same-origin",
    // params: {
    // "Access-Control-Allow-Origin": "http://locahost:3000",
    // "Access-Control-Allow-Headers": "x-Apikey",
    // "Access-Control-Request-Headers": "x-Apikey",
    // "Content-Type": "application/json",
    //   "x-Apikey": process.env.API_KEY,
    // },
    // })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
});

module.exports = router;
