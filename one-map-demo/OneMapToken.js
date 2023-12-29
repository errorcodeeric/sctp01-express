const axios = require('axios');
const ONE_MAP_AUTH_URL="https://www.onemap.gov.sg/api/auth/post/getToken"
async function getOneMapToken() {
    const data = {
        email: process.env.ONE_MAP_EMAIL,
        password: process.env.ONE_MAP_PASSWORD
    }
    const response = await axios.post(ONE_MAP_AUTH_URL, data);
    return response.data;
}


module.exports = { getOneMapToken};