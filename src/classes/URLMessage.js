const Message = require('./Message');
const Webpage = require('./WebPage');
const data = require('../databases/store');

module.exports = class URLMessage extends Message {
  constructor(processedMessage) {
    super(processedMessage);

    this.url = processedMessage.url;
    this.title = null;
    this.useWebSite = false;
    this._process();
  }

  _process = () => {
    const { databases, websites } = data;
    this.website = this._findMatchingWebsite(websites) || null;
    //Only change the database if no one was assigned via tags
    if (this.website && this.database === databases.stuff) {
      this.database = this.website.parent;
      this.useWebSite = true;
    }
    this.webpage = this._generateWebPage();
  };

  //match url with a website
  _findMatchingWebsite = (websites) => {
    const matchedWebsite = Object.keys(websites).filter((websiteName) =>
      this.url.match(websites[websiteName].downloadHTMLRules.urlPattern)
    );
    return websites[matchedWebsite];
  };

  _generateWebPage = () => {
    const parsingRules = this.website ? this.website.downloadHTMLRules : null;
    return new Webpage(this.url, parsingRules);
  };

  process = async () => {
    await this.webpage.process();
    this.title = this.webpage.title;
  };
};
