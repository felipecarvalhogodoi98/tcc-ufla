const axios = require("axios");

const GROUP_SERVICE_URL = process.env.GROUP_SERVICE_URL;

async function fetchGroupById(groupId) {
  try {
    const response = await axios.get(`${GROUP_SERVICE_URL}/${groupId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching group:", error.message);
    if (error.status == 404) return false;
    throw new Error("Unable to fetch group from Group Service.");
  }
}

module.exports = {
  fetchGroupById,
};
