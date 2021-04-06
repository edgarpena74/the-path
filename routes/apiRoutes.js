const router = require("express").Router();
const axios = require("axios");

router.get("/test", (req, res) => {
  res.send({ msg: "success" });
});

router.get("/search", (req, res) => {
  const url = `https://ridb.recreation.gov/api/v1/activities?apikey=${process.env.API_KEY}&query=camping`;
  axios
    .get(url)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
});

module.exports = router;
