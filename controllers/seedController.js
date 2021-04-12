const Favorites = require("../models/favorites");

module.exports = {
  getSeeds: async (req, res) => {
    try {
      res.json(await Favorites.find());
    } catch (error) {
      res.send(error);
    }
  },
};
