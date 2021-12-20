const SplunkLogger = require("splunk-logging/splunklogger");

var config = {
    token: "f844e0c1-0f13-4668-83c5-d7a362c6c7c9",
    url: "https://localhost:8088",
    batchInterval: 1000,
    maxBatchCount: 10,
    maxBatchSize: 1024 // 1kb
};

var Logger = new SplunkLogger(config)

module.exports = Logger