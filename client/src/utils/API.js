const axios = require("axios");

async function getSeeds() {
  try {
    const response = await axios.get("http://locahost:5000/api/seeds");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default { getSeeds };
