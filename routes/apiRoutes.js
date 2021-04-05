const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send({ msg: "success" });
});

module.exports = router;
