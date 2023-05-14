require('dotenv').config();
const NotionPageProperties = require('./NotionPageProperties');
const NotionPageChildren = require('./NotionPageChildren');
const { logProgress } = require('../../lib/logger');
const { Client } = require('@notionhq/client');
const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = class NotionPage {
  constructor(message) {
    this.database = message.database;
    this._setParent(message.database.id);
    this._setIcon(message);
    this._setProperties(message);
    if (message.title && message.text) {
      this._setChildren(message);
    }
  }

  _setParent = (id) => {
    this.parent = {
      type: 'database_id',
      database_id: id,
    };
  };

  _setIcon = (message) => {
    this.icon = message.website
      ? this._generateExternalIcon(message.website.notionRules.defaultIcon)
      : this._generateEmojiIcon(message.database.icon);
  };

  _generateEmojiIcon = (emoji) => {
    return {
      type: 'emoji',
      emoji,
    };
  };

  _generateExternalIcon = (url) => {
    return {
      type: 'external',
      external: {
        url,
      },
    };
  };

  _prepareOptions = (url, notionRules) => {
    const { mediaType, Tags } = notionRules
      ? notionRules
      : { undefined, undefined };
    return {
      url,
      mediaType,
      Tags,
    };
  };

  _setProperties = (message) => {
    const title = message.title || message.text;
    const notionRules =
      message.website && message.website.notionRules && message.useWebSite
        ? message.website.notionRules
        : null;
    const options = this._prepareOptions(message.url, notionRules);
    this.properties = new NotionPageProperties(title, options);
  };

  _setChildren = (message) => {
    //TODO:Handel details and embeds

    // If the message has text save it as a paragraph inside th created page
    this.children = new NotionPageChildren({ text: message.text }).children;
  };

  createNewPage = () => {
    logProgress('Creating a notion page');
    return notionClient.pages.create(this);
  };

  renamePage = async (newName) => {
    logProgress('Renaming a notion page');
    this.properties.Name.title[0].text.content = newName;
    return notionClient.pages.update({
      page_id: this.id,
      properties: this.properties.Name,
    });
  };

  outbox = () => {
    logProgress('outbox a notion page');
    this.properties.Inbox.checkbox = false;
    return notionClient.pages.update({
      page_id: this.id,
      properties: this.properties,
    });
  };

  move = async (newParent) => {
    //Deleting and re-creating cause changing the parent is not available in the Notion API
    // more at: https://developers.notion.com/reference/patch-page
    logProgress('moving a notion page');
    await this.delete();
    this._setParent(newParent.id);
    this.database = newParent;
    const notionResponse = await this.createNewPage(this);
    this.id = notionResponse.id;
    this.notionURL = notionResponse.url;
    return notionResponse;
  };

  addTextBlock = async (text) => {
    logProgress('Adding text block');
    //TODO: make sure the child is added to this object too
    return notionClient.blocks.children.append({
      block_id: this.id,
      children: new NotionPageChildren({ text }).children,
    });
  };

  addRelation = async (relationName, relatedId) => {
    logProgress('Adding ' + relationName);
    this.properties._addProperty(
      relationName,
      this.properties._createRelationProperty(relatedId)
    );
    return notionClient.pages.update({
      page_id: this.id,
      properties: this.properties,
    });
  };

  delete = () => {
    logProgress('Deleting a notion page');
    return notionClient.pages.update({
      page_id: this.id,
      archived: true,
    });
  };
};
