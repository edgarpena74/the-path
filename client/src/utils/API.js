const axios = require("axios");

export async function searchAPI() {
  try {
    // const response = await axios.get("http://localhost:5000/api/search");
    const response = await axios.get("/api/search");
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

// export async function saveSearchInput() {
//   try {
//     axios.post("/api/searchinput");
//   } catch (error) {}
// }

// export default { searchAPI };
