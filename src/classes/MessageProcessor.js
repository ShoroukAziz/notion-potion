// takes a bot message and cuts into tag(db), text, url
const Util = require('../lib/Util');
const data = require('../databases/store');

module.exports = class MessageProcessor {
  constructor(incomingMessage) {
    this.text = incomingMessage;
    this._process(incomingMessage);
  }

  _process(incomingMessage) {
    const { databases } = data;
    this.database =
      this._findMatchingDatabase(incomingMessage, databases) || databases.stuff;
    this.text = Util.cleanUpTheMessage(this.database.tag, this.text);

    this.url = this._extractUrlFromText(this.text);
    if (this.url) {
      this.text = Util.cleanUpTheMessage(this.url, this.text);
    }
  }

  // Identify the database based on the tag in the message.
  _findMatchingDatabase = (message, databases) => {
    const matchingDatabase = Object.keys(databases).find(
      (databaseName) =>
        message.includes(databases[databaseName].tag) &&
        databases[databaseName].tag !== ''
    );
    return databases[matchingDatabase];
  };

  // Detach the URL from the message text.
  _extractUrlFromText = (message) => {
    const urlRegex = /(https?:\/\/[^ ]*)/;
    const matchingResults = message.match(urlRegex);
    return matchingResults ? matchingResults[0] : null;
  };
};
