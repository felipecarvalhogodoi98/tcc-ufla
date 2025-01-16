const axios = require("axios");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

async function fetchUsersByIds(userIds) {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/getByIds`, {
      userIds,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    if (error.status == 404) return false;
    throw new Error("Unable to fetch users from User Service.");
  }
}

module.exports = {
  fetchUsersByIds,
};
