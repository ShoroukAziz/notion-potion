/* This module defines event handlers for handling errors that can occur
 * while the Telegram bot is running.
 */
const { logError } = require('../../lib/logger');
const bot = require('../bot');

const handleError = function (error, chatId) {
  logError(error);
  bot.sendMessage(chatId, error.toString());
};

const registerBotErrorHandlers = function () {
  // Handle polling errors
  bot.on('polling_error', (error) => {
    console.log(error);
  }); // => 'EFATAL'

  //Handle webhook errors
  bot.on('webhook_error', (error) => {
    console.log(error);
  }); // => 'EPARSE'
};
module.exports = { registerBotErrorHandlers, handleError };
