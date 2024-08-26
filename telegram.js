const Telegraf = require('telegraf');
const config = require('./config.json');

let bot;

if (config.TELEGRAM_ENABLED) {
    bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);
    bot.launch();
}

function sendTelegramAlert(message) {
    if (!config.TELEGRAM_ENABLED || !bot) return;
    bot.telegram.sendMessage(config.TELEGRAM_CHAT_ID, message)
        .then(() => console.log('Alert sent to Telegram'))
        .catch(err => console.error('Error sending Telegram alert:', err));
}

module.exports = { sendTelegramAlert };
