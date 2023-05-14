const data = require('../../databases/store');

const { logInput } = require('../../lib/logger');
const bot = require('../bot');
const { getKeyboardFromList } = require('../keyboards');
const messagesHistory = require('../messages-history');
let { STATE } = require('../state');
const operations = require('../bot-operation-messages');
const { handleError } = require('./error-handlers');
const { getLastMessage, handleOperationSuccess } = require('../utils');

/*****************************************************************************************************************
 *                                                                                                                *
 *  Operations handlers                                                                                           *
 *  These Handel clicking any of the 8 basic operations buttons like : rename, move, delete ..etc                 *                                                                                    *
 *                                                                                                                *
 *****************************************************************************************************************/
const handleOutbox = async function (chatId) {
  STATE.current = STATE.waiting;

  logInput(operations.outbox.logInputMessage);
  try {
    await getLastMessage().outbox();
    handleOperationSuccess(chatId, operations.outbox);
  } catch (error) {
    handleError(error, chatId);
  }
};

const handleDelete = async function (chatId) {
  STATE.current = STATE.waiting;
  const operation = operations.delete;
  STATE.current = STATE.waiting;
  logInput(operation.logInputMessage);
  try {
    await getLastMessage().delete();
    handleOperationSuccess(chatId, operation, false);
    messagesHistory.pop();
  } catch (error) {
    handleError(error, chatId);
  }
};

const handleDone = function () {
  STATE.current = STATE.waiting;
  logInput(operations.done.logInputMessage);
};

const handleBack = function (chatId) {
  handleOperationSuccess(chatId, operations.back);
};

// The following  handlers require changing the state
// because the user will be sending a follow up message

const handleRename = function (chatId) {
  STATE.current = STATE.rename;
  bot.sendMessage(chatId, operations.rename.onClickMessage);
};

const handleDetails = function (chatId) {
  STATE.current = STATE.details;
  bot.sendMessage(chatId, operations.details.onClickMessage);
};

/////////////

const handleMove = async function (chatId) {
  const { databases } = data;
  const list = Object.values(databases).map((notionDb) => {
    return {
      name: `${notionDb.icon}  ${notionDb.name}`,
      callbackData: `database#${notionDb.name}`,
    };
  });

  bot.sendMessage(chatId, operations.move.onClickMessage, {
    parse_mode: 'Markdown',
    reply_markup: getKeyboardFromList(list, 4),
  });
};

const handleAddTopic = async function (chatId) {
  const { databases } = data;
  const topicsList = await databases.Topics.query();
  const list = Object.values(topicsList.results).map((topic) => {
    return {
      name: topic.properties.Name.title[0].plain_text,
      callbackData: `topic#${topic.id}`,
    };
  });
  bot.sendMessage(chatId, operations.addTopic.onClickMessage, {
    parse_mode: 'Markdown',
    reply_markup: getKeyboardFromList(list, 4),
  });
};
const handleAddProject = async function (chatId) {
  const { databases } = data;
  const topicsList = await databases.Projects.query();
  const list = Object.values(topicsList.results).map((Project) => {
    return {
      name: Project.properties.Name.title[0].plain_text,
      callbackData: `project#${Project.id}`,
    };
  });
  bot.sendMessage(chatId, operations.addProject.onClickMessage, {
    parse_mode: 'Markdown',
    reply_markup: getKeyboardFromList(list, 1),
  });
};

/*****************************************************************************************************************
 *                                                                                                                *
 *  Data selectors Handlers:                                                                                      *
 *  These handles selecting a button after clicking an operation button to select some data like a new database   *
 *  a topic or a project                                                                                          *
 *                                                                                                                *
 *****************************************************************************************************************/

const handleSelectedNewDatabase = async function (chatId, newDatabaseName) {
  const { databases } = data;

  try {
    await getLastMessage().move(databases[newDatabaseName]);
    handleOperationSuccess(chatId, operations.move);
  } catch (error) {
    handleError(error, chatId);
  }
};

const handleSelectedTopic = async function (chatId, topicId) {
  try {
    await getLastMessage().addRelation('Topic', topicId);
    handleOperationSuccess(chatId, operations.addTopic);
  } catch (error) {
    handleError(error, chatId);
  }
};
const handleSelectedProject = async function (chatId, projectId) {
  try {
    await getLastMessage().addRelation('Project', projectId);
    handleOperationSuccess(chatId, operations.addProject);
  } catch (error) {
    handleError(error, chatId);
  }
};

module.exports = {
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
};
