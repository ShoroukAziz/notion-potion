/* This module provides a middleware function for checking whether
* the incoming message comes from an authorized user.
*/

const MY_USER_ID = Number(process.env.MY_USER_ID);

/**
 * verifies the message comes from my chat id only
 * @param  {Object<Message>} message    The incoming message from the chat to the bot.
 * @param  {Number}          userId     The user id allowed to access the bot
 * @return {boolean}                    true if the message have the same user id and false otherwise
 */
function isAuthorized(message, userId) {
  return message.from.id === userId;
}

/**

Checks if the message is authorized to be handled by the bot
@param {Function} handler The function that handles the incoming message
@return {Function} The authorized function that handles the incoming message
*/
function checkAuthorization(handler) {
  return function (msg) {
    if (!isAuthorized(msg, MY_USER_ID)) {
      return;
    }
    handler.apply(this, arguments);
  }
}

module.exports = { checkAuthorization };