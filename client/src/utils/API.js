const axios = require("axios");

//***************************************************** */
//
// Temporarily commenting out due to issue with having more than one cluster on mongoDB
//
// async function getSeeds() {
//   try {
//     const response = await axios.get("/api/seeds");
//     // console.log(response, " seeds from API.js");
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
//
//***************************************************** */

async function searchRes(userSearch) {
  try {
    const response = await axios.get(`/api/places/${userSearch}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getLocation(lon, lat) {
  try {
    const response = await axios.get(`/api/location/${lon}/${lat}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

//***************************************************** */
// Temp. commenting out // Cluster mongoDB issue
//
// export default { getSeeds, searchRes, getLocation };
//
//***************************************************** */

export default { searchRes, getLocation };
