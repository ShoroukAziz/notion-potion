const { logProgress } = require('../../lib/logger');
const { Client } = require('@notionhq/client');
const notionClient = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = class NotionDatabase {
  constructor(options) {
    this.setId(options.id);
    this.setName(options.name);
    this.setIcon(options.icon);
    this.setFilter(options.filter);
    this.setTag(options.tag);
    this.setHasTopic(options.hasTopic);
    this.setHasProject(options.hasProject);
    this.setPath(options.path);
    this.websites = [];
  }
  setName(name) {
    this.name = name;
  }
  setId(id) {
    this.id = id;
  }
  setIcon(icon) {
    this.icon = icon;
  }
  setFilter(filter) {
    if (!filter) {
      return;
    }
    const search = "'";
    const replaceWith = '"';
    filter = filter.split(search).join(replaceWith);
    this.filter = JSON.parse(filter);
  }
  setTag(tag) {
    this.tag = tag;
  }
  setHasTopic(hasTopic) {
    this.hasTopic = hasTopic;
  }
  setHasProject(hasProject) {
    this.hasProject = hasProject;
  }
  setPath(path) {
    this.path = path;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getIcon() {
    return this.icon;
  }
  getFilter() {
    return this.filter;
  }
  getTag() {
    return this.tag;
  }
  getHasTopic() {
    return this.hasTopic;
  }
  getHasProject() {
    return this.hasProject;
  }
  getPath() {
    return this.path;
  }

  addWebsite(website) {
    this.websites.push(website);
  }

  query = async () => {
    logProgress('querying a notion database');
    return notionClient.databases.query({
      database_id: this.id,
      filter: this.filter.filter,
    });
  };
};
