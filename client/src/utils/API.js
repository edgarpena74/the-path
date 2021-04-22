const axios = require("axios");

async function getSeeds() {
  try {
    const response = await axios.get("http://localhost:5000/api/seeds");
    console.log(response, " seeds from API.js");
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function searchRes(userSearch) {
  try {
    const userQuery = encodeURIComponent(userSearch);
    console.log(userQuery, "userQuery");
    const response = await axios.get(
      `http://localhost:5000/api/places/${userQuery}`
    );
    // console.log(response, "response from API.js");

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getLocation(lon, lat) {
  try {
    const response = axios.get(
      `http://localhost:5000/api/location/${lon}/${lat}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default { getSeeds, searchRes, getLocation };
