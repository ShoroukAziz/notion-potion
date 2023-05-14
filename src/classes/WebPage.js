/**
 * Represents a webpage.
 * @class
 */

const httpClient = require('axios');
const HTMLParser = require('node-html-parser');
const { logError } = require('../lib/logger');

const HTML_TITLE_TAG = 'title';
const HTML_HEADER_TAG = 'h1';
const FALLBACK_URL_TITLE = 'New URL';

module.exports = class Webpage {
  constructor(url, parsingRules) {
    this.url = url;
    this.parsingRules = parsingRules;
  }

  async _downloadPage(url) {
    try {
      const response = await httpClient.get(url);
      this.HTMLContent = response.data;
    } catch (error) {
      logError('Error occurred while downloading page');
      return error;
    }
  }

  _parseHTML(content) {
    return HTMLParser.parse(content);
  }

  _setTitle() {
    if (
      this.parsingRules &&
      this.parsingRules.titleHtmlTag &&
      this.html.querySelector(this.parsingRules.titleHtmlTag)
    ) {
      this.title = this.html.querySelector(this.parsingRules.titleHtmlTag).text;
    } else {
      const titleTag =
        this.html.querySelector(HTML_TITLE_TAG) &&
        this.html.querySelector(HTML_TITLE_TAG).text;
      const headerTag =
        this.html.querySelector(HTML_HEADER_TAG) &&
        this.html.querySelector(HTML_HEADER_TAG).text;
      this.title = titleTag || headerTag || FALLBACK_URL_TITLE;
    }

    if (this.parsingRules && this.parsingRules.titlePattern) {
      this.title = this.title.replace(this.parsingRules.titlePattern, '');
    }
    this.title = this.title.trim();
  }

  async process() {
    try {
      await this._downloadPage(this.url);
      this.html = this._parseHTML(this.HTMLContent, this.HTMLParser);
      this._setTitle();
    } catch (error) {
      logError('Error occurred while running');
      return error;
    }
  }
};
