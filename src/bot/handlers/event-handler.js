/**
 * This file exports a function that registers event handlers for the bot.
 * The handlers respond to messages, and more to come
 *
 */

const bot = require('../bot');
const {
  handleNewMessage,
  handleRenameMessage,
  handleDetailsMessage,
} = require('./message-handlers');

const {
  handleRename,
  handleMove,
  handleDetails,
  handleAddTopic,
  handleAddProject,
  handleOutbox,
  handleDelete,
  handleDone,
  handleSelectedNewDatabase,
  handleSelectedTopic,
  handleSelectedProject,
  handleBack,
} = require('./callback-query-handlers');
const { checkAuthorization } = require('../middleware');
const { STATE } = require('../state');

const clearUpOldKeyboard = async function (incomingTextMessage) {
  bot.editMessageReplyMarkup(null, {
    chat_id: incomingTextMessage.chat.id,
    message_id: STATE.lastKeyboardMessage.message_id,
  });

  STATE.current = STATE.waiting;
  handlers.messageHandlers.waiting(incomingTextMessage);
};

const handlers = {
  callbackQueryHandlers: {
    operation: {
      //Multiple Action buttons: Clicking these button require either clicking other buttons or typing more text to finish the action
      rename: handleRename,
      move: handleMove,
      details: handleDetails,
      addTopic: handleAddTopic,
      addProject: handleAddProject,
      //Single Action buttons: These actions are done once the button is clicked
      outbox: handleOutbox,
      delete: handleDelete,
      done: handleDone,
      back: handleBack,
    },
    dataSelection: {
      database: handleSelectedNewDatabase,
      topic: handleSelectedTopic,
      project: handleSelectedProject,
    },
  },
  messageHandlers: {
    waiting: handleNewMessage,
    rename: handleRenameMessage,
    details: handleDetailsMessage,
    selecting: clearUpOldKeyboard,
  },
};

const handleCallBackQuery = async function (callbackQuery) {
  const action = callbackQuery.data.split('#');
  const actionId = action[0];
  const actionData = action[1];
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  //Clear the previous keyboard
  bot.deleteMessage(chatId, messageId);
  if (actionId === 'operation') {
    handlers.callbackQueryHandlers.operation[actionData](chatId);
  } else {
    handlers.callbackQueryHandlers.dataSelection[actionId](chatId, actionData);
  }

  bot.answerCallbackQuery(callbackQuery.id).catch((err) => {
    logError(`Failed to answer callback query: ${err}`);
  });
};

const handleMessage = async function (incomingTextMessage) {
  handlers.messageHandlers[STATE.current](incomingTextMessage);
};

const authorizedHandelCallBackQuery = checkAuthorization(handleCallBackQuery);
const authorizedHandleMessage = checkAuthorization(handleMessage);

const registerBotEventHandlers = function () {
  //TODO
  bot.onText(/\/shopping/, (incomingTextMessage) => {
    // bot.sendMessage(msg.chat.id, 'Okay, Will keep that title');
  });

  // Respond to text messages
  bot.on('message', (incomingTextMessage) => {
    authorizedHandleMessage(incomingTextMessage);
  });
  bot.on('callback_query', (query) => {
    authorizedHandelCallBackQuery(query);
  });
};
module.exports = { registerBotEventHandlers };
