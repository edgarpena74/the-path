const FavoritePlaces = require("../models/Favorites");

module.exports = {
  getSeeds: async (req, res) => {
    try {
      res.json(await FavoritePlaces.find());
    } catch (error) {
      res.send(error);
    }
  },
};
