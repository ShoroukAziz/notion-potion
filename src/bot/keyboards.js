/**
 * This module exports functions used to generate keyboards like operation keyboard and data keyboards
 */

const messagesHistory = require('./messages-history');

/**
Returns the operations keyboard which includes buttons with their respective callback data.
The buttons on the keyboard include Rename, Move, Add, Unbox, Delete, and Done.
Additionally, if the last message in the message history is saved to a database that has a Topic or a Project,
then the keyboard will also include Add Topic or Add Project, respectively.
@returns {object} Returns an inline keyboard object.
*/
const getOperationsKeyboard = function () {
  const lastMessage = messagesHistory[messagesHistory.length - 1];

  const buttons = [
    [
      { text: '✏️ Rename', callback_data: 'operation#rename' },
      { text: '➡️ Move', callback_data: 'operation#move' },
      { text: '📝 Add', callback_data: 'operation#details' },
    ],
    [
      { text: '📤 Unbox', callback_data: 'operation#outbox' },
      { text: '🗑️ Delete', callback_data: 'operation#delete' },
      { text: '✅ Done', callback_data: 'operation#done' },
    ],
  ];

  if (lastMessage.database.hasTopic && lastMessage.database.hasProject) {
    buttons.push([
      { text: '🔵 Add Topic', callback_data: 'operation#addTopic' },
      {
        text: '💼 Add Project',
        callback_data: 'operation#addProject',
      },
    ]);
  } else if (lastMessage.database.hasTopic) {
    buttons.push([
      { text: '🔵 Add Topic', callback_data: 'operation#addTopic' },
    ]);
  } else if (lastMessage.database.hasProject) {
    buttons.push([
      {
        text: '💼 Add Project',
        callback_data: 'operation#addProject',
      },
    ]);
  }

  const replyMarkup = {
    inline_keyboard: buttons,
  };

  return replyMarkup;
};

/**

Returns an inline keyboard generated from a list
Used to display data like available database to move a page into or available topics to add to a page.
@param {array} list - An array of keys to be displayed on the keyboard.
@param {number} keysPerRow - The number of keys to be displayed per row on the keyboard.
@returns {object} Returns an inline keyboard object.
*/
const getKeyboardFromList = function (list, keysPerRow = 2) {
  const buttons = [];
  const totalKeys = list.length;
  const rowsCount = Math.ceil(totalKeys / keysPerRow);

  let addedRows = 0;
  let addedKeys = 0;

  while (addedRows < rowsCount) {
    const row = [];
    while (row.length < keysPerRow && addedKeys < totalKeys) {
      const key = list[addedKeys];

      row.push({
        text: key.name,
        callback_data: key.callbackData,
      });
      addedKeys++;
    }

    buttons.push(row);
    addedRows++;
  }
  buttons.push([{ text: '🔙 Back', callback_data: 'operation#back' }]);

  const replyMarkup = {
    inline_keyboard: buttons,
  };

  return replyMarkup;
};

module.exports = { getOperationsKeyboard, getKeyboardFromList };
