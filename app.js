/*
 * Entry point for the bot.
 * Retrieves data, then registers event and error handlers for the bot.
 */
const { logSuccess } = require('./src/lib/logger');
const {
  registerBotEventHandlers,
} = require('./src/bot/handlers/event-handler');
const {
  registerBotErrorHandlers,
} = require('./src/bot/handlers/error-handlers');
const retrieveData = require('./src/databases/data-retriever');

const init = async function () {
  await retrieveData();
  logSuccess('🚀 Starting bot (polling) ...');
  registerBotEventHandlers();
  registerBotErrorHandlers();
};

init();
