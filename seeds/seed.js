let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/trails", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let favoriteSeed = [
  {
    title: "Point Reyes Lighthouse",
    img:
      "https://www.nps.gov/common/uploads/cropped_image/DFB0CAAA-EE69-F1BA-5D4C31A2CB62CB66.jpg",
  },
  {
    title: "Baker Beach",
    img:
      "https://www.nps.gov/common/uploads/cropped_image/CCF42D59-ABD7-9F3D-9C16257CC86F35F4.jpg",
  },
  {
    title: "Drakes Beach",
    img:
      "https://www.nps.gov/common/uploads/cropped_image/CCF42D59-ABD7-9F3D-9C16257CC86F35F4.jpg",
  },
  {
    title: "Muir Woods Main Trail",
    img:
      "https://www.nps.gov/common/uploads/cropped_image/9E712753-F6AF-2D80-C94B18B1FF92B427.jpg",
  },
];

db.Favorites.deleteMany({})
  .then(() => db.Favorites.collection.insertMany(favoriteSeed))
  .then((data) => {
    console.log(data.result.n + " events inserted into MongoDatabase!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
