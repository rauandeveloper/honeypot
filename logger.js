const fs = require('fs');
const util = require('util');
const { getTimestamp } = require('./utils');
const config = require('./config.json');

const appendFile = util.promisify(fs.appendFile);

async function logConnection(info) {
    if (!config.LOG_FILE) return;
    try {
        await appendFile(config.LOG_FILE, `${getTimestamp()} - ${info}\n`);
    } catch (err) {
        console.error('Error writing to log:', err);
    }
}

module.exports = { logConnection };
