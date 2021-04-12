const axios = require("axios");

async function getSeeds() {
  try {
    const response = await axios.get("http://localhost:5000/api/seeds");
    console.log(response, "from API.js");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default { getSeeds };
