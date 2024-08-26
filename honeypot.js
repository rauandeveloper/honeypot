const net = require('net');
const { logConnection } = require('./logger');
const { getIpInfo } = require('./ipinfo');
const { sendTelegramAlert } = require('./telegram');
const { detectAttack } = require('./attackDetection');
const config = require('./config.json');

// Function to handle incoming data and send a response
async function handleData(socket, data, port) {
    const message = data.toString().trim();
    console.log(`Received data from ${socket.remoteAddress}:${socket.remotePort} on port ${port}:\n${message}`);
    await logConnection(`Received data from ${socket.remoteAddress}:${socket.remotePort} on port ${port}:\n${message}`);

    // Respond to the client with a configurable message
    const response = config.RESPONSE_MESSAGE;
    socket.write(response);
    console.log(`Sent response to ${socket.remoteAddress}:${socket.remotePort} on port ${port}:\n${response}`);
    await logConnection(`Sent response to ${socket.remoteAddress}:${socket.remotePort} on port ${port}:\n${response}`);

    // Detect attack if enabled
    if (config.ATTACK_DETECTION_ENABLED) {
        const attackType = detectAttack(message);
        if (attackType !== 'Unknown') {
            console.log(`Detected ${attackType} from ${socket.remoteAddress}:${socket.remotePort} on port ${port}`);
            await logConnection(`Detected ${attackType} from ${socket.remoteAddress}:${socket.remotePort} on port ${port}`);
            if (config.TELEGRAM_ENABLED) {
                sendTelegramAlert(`Detected ${attackType} from ${socket.remoteAddress}:${socket.remotePort} on port ${port}`);
            }
        }
    }

    // Get IP info if enabled
    if (config.IPINFO_ENABLED) {
        const ipInfo = await getIpInfo(socket.remoteAddress);
        if (ipInfo) {
            await logConnection(`IP Info: ${JSON.stringify(ipInfo)}`);
        }
    }

    // Send alert to Telegram if enabled
    if (config.TELEGRAM_ENABLED) {
        sendTelegramAlert(`Received data from ${socket.remoteAddress}:${socket.remotePort} on port ${port}`);
    }
}

// Function to create a server for a given port
function createServer(port) {
    const server = net.createServer((socket) => {
        const remoteAddress = socket.remoteAddress;
        const remotePort = socket.remotePort;

        console.log(`New connection from ${remoteAddress}:${remotePort} on port ${port}`);
        logConnection(`New connection from ${remoteAddress}:${remotePort} on port ${port}`);

        // Handle incoming data
        socket.on('data', (data) => handleData(socket, data, port));

        // Handle connection end
        socket.on('end', () => {
            console.log(`Connection closed with ${remoteAddress}:${remotePort} on port ${port}`);
            logConnection(`Connection closed with ${remoteAddress}:${remotePort} on port ${port}`);
        });

        // Handle errors
        socket.on('error', (err) => {
            console.error(`Connection error with ${remoteAddress}:${remotePort} on port ${port}:`, err);
            logConnection(`Connection error with ${remoteAddress}:${socket.remotePort} on port ${port}: ${err}`);
        });
    });

    server.listen(port, () => {
        console.log(`Honeypot is running on port ${port}`);
    });
}

// Create servers for all ports specified in the configuration
config.PORTS.forEach(createServer);
