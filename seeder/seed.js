//***************************************************** */
// Temp. Commenting Out // Cluster mongoDB issue
//
// let mongoose = require("mongoose");
// let db = require("../models");

// mongoose.connect("mongodb://localhost/thePath", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// let favoriteSeeds = [
//   {
//     id: "1",
//     title: "Point Reyes Lighthouse",
//     imageURL:
//       "https://www.nps.gov/common/uploads/cropped_image/DFB0CAAA-EE69-F1BA-5D4C31A2CB62CB66.jpg",
//   },
//   {
//     id: "2",
//     title: "Baker Beach",
//     imageURL:
//       "https://www.nps.gov/common/uploads/cropped_image/CCF42D59-ABD7-9F3D-9C16257CC86F35F4.jpg",
//   },
//   {
//     id: "4",
//     title: "Drakes Beach",
//     imageURL:
//       "https://www.nps.gov/common/uploads/cropped_image/primary/820D2985-9030-A353-D0DB1EEF0A9BFDBC.jpg",
//   },
//   {
//     id: "5",
//     title: "Muir Woods Main Trail",
//     imageURL: "http://www.redwoodhikes.com/Muir/Main1.jpg",
//   },
// ];

// db.FavoritePlaces.deleteMany({})
//   .then(() => db.FavoritePlaces.collection.insertMany(favoriteSeeds))
//   .then((data) => {
//     console.log(data.result.n + " events inserted into MongoDatabase!");
//     console.log(data);
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
//
//***************************************************** */
