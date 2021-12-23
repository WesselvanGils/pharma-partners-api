require('dotenv').config()

module.exports = {
    key: process.env.SPLUNK_KEY,
    url: process.env.SPLUNK_URL
};