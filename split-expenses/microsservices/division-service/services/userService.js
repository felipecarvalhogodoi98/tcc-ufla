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

async function fetchUserById(userId) {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);

    if (error.status == 404) return false;
    throw new Error("Unable to fetch user from User Service.");
  }
}

module.exports = {
  fetchUsersByIds,
  fetchUserById,
};
