module.exports = class Util {
  static cleanUpTheMessage = (additionalInfo, text) => {
    return text.replace(additionalInfo, '').trim();
  };

  static parse(str, ...args) {
    let i = 0;
    return str.replace(/%s/g, () => args[i++]);
  }
};
