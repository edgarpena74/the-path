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
    imageURL:
      "https://www.nps.gov/common/uploads/cropped_image/DFB0CAAA-EE69-F1BA-5D4C31A2CB62CB66.jpg",
  },
  {
    title: "Baker Beach",
    imageURL:
      "https://www.nps.gov/common/uploads/cropped_image/CCF42D59-ABD7-9F3D-9C16257CC86F35F4.jpg",
  },
  {
    title: "Drakes Beach",
    imageURL:
      "https://www.nps.gov/common/uploads/cropped_image/primary/820D2985-9030-A353-D0DB1EEF0A9BFDBC.jpg",
  },
  {
    title: "Muir Woods Main Trail",
    imageURL: "http://www.redwoodhikes.com/Muir/Main1.jpg",
  },
];

db.Favorites.deleteMany({})
  .then(() => db.Favorites.collection.insertMany(favoriteSeed))
  .then((data) => {
    console.log(data.result.n + " events inserted into MongoDatabase!");
    console.log(data);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// db.Favorites.collection
//   .insertMany(favoriteSeed)
//   .then((data) => {
//     console.log(data.result.n + " events inserted into MongoDatabase!");
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
