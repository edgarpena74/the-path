const axios = require("axios");

async function getSeeds() {
  try {
    const response = await axios.get("http://localhost:5000/api/seeds");
    // console.log(response, " seeds from API.js");
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function searchRes(userSearch) {
  try {
    const userQuery = encodeURIComponent(userSearch.input);
    const response = await axios.get(
      `http://localhost:5000/api/places/${userQuery}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getLocation(lon, lat) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/location/${lon}/${lat}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default { getSeeds, searchRes, getLocation };
