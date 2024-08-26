const fs = require('fs');
const config = require('./config.json');

function generateReport() {
    if (!config.REPORT_ENABLED) return; 
    fs.readFile(config.LOG_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading logs for report:', err);
            return;
        }
        fs.writeFile(config.REPORT_FILE, data, (err) => {
            if (err) {
                console.error('Error writing report:', err);
            } else {
                console.log('Report generated successfully');
            }
        });
    });
}

setInterval(generateReport, 24 * 60 * 60 * 1000);

module.exports = { generateReport };
