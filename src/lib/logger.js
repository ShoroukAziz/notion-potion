const chalk = require('chalk');
const parse = require('./Util').parse;

module.exports = class Logger {
  static logSuccess = (message, ...args) => {
    console.log(chalk.green.italic(`✅ ${parse(message, ...args)}`));
  };
  static logInput = (message, ...args) => {
    console.log(chalk.cyan.underline(`📩 ${parse(message, args)}`));
  };
  static logError = (message) => {
    console.error(chalk.red(message));
  };

  static logProgress = (message, ...args) => {
    console.error(chalk.yellow(`🚧 ${parse(message, args)}...`));
  };

  static logDebug = (message) => {
    console.error(
      chalk.bgMagenta('**************************************************')
    );
    console.log(message);
    console.error(
      chalk.bgMagenta('**************************************************')
    );
  };
};
