const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  title: {
    type: String,
  },
  imageURL: {
    type: String,
  },
});

//preparing module for export and setting the name that will be shown in database
const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
