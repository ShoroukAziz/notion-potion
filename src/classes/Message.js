// Basic message has a text
// and optional database

module.exports = class Message {
  constructor({ text, database }) {
    this.text = text;
    this.database = database;
  }

  process() {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }
};
