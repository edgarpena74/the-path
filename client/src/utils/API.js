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
    const response = await axios.get(
      `http://localhost:5000/api/places/${userSearch}`
    );
    console.log(response, "response from API.js");
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function deleteInitSearch(userSearch) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/places/${userSearch}`,
      { data: [] }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
export default { getSeeds, searchRes, deleteInitSearch };
