/**
 * This module exports a TelegramBot instance initialized with the
 * TELEGRAM_BOT_TOKEN environment variable value and configured to use
 * long polling to receive updates from Telegram servers.
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
module.exports = bot;
