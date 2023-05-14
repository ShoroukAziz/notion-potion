const URLMessage = require('../../src/classes/URLMessage');
const axios = require('axios');
const HTMLParser = require('node-html-parser');

// Example databases
const databases = {
  stuff: { name: 'stuff' },
  notes: { name: 'notes', tag: '@note' },
  bookmarks: {},
};

// Example websites
const websites = {
  youtube: {
    parent: databases.bookmarks,
    name: 'youtube',
    downloadHTMLRules: {
      urlPattern: '.*youtube.com.*',
      titlePattern: ' - YouTube',
    },
  },
};

describe("URLMessage with a Url that doesn't match any website", () => {
  let processedMessage, urlMessage;
  beforeEach(() => {
    processedMessage = {
      text: 'some text',
      database: databases.stuff,
      url: 'https://www.example.com/',
    };
    urlMessage = new URLMessage(processedMessage, websites, axios, HTMLParser);
  });
  it('Should have the url, text and db from the processed message', async () => {
    await urlMessage.run();
    expect(urlMessage.url).toEqual(processedMessage.url);
    expect(urlMessage.text).toEqual(processedMessage.text);
    expect(urlMessage.database).toEqual(processedMessage.database);
  });

  it('Should have the url title', async () => {
    await urlMessage.run();
    expect(urlMessage.title).toEqual('Example Domain');
  });

  it('Should not have a website', async () => {
    await urlMessage.run();
    expect(urlMessage.website).toBeNull();
  });
});

describe('URLMessage with a Url that matches a website', () => {
  beforeEach(() => {
    processedMessage = {
      text: 'This is some text',
      database: databases.stuff,
      url: 'https://www.youtube.com/watch?v=XEt09iK8IXs',
    };
    urlMessage = new URLMessage(processedMessage, websites, axios, HTMLParser);
  });

  it('Should have the url and text from the processed message', async () => {
    await urlMessage.run();
    expect(urlMessage.url).toEqual(processedMessage.url);
    expect(urlMessage.text).toEqual(processedMessage.text);
  });

  it('Should recognize the website', async () => {
    await urlMessage.run();
    expect(urlMessage.website).toEqual(websites.youtube);
  });

  it('Should save the title of the url', async () => {
    await urlMessage.run();
    expect(urlMessage.title).toEqual('Coding Interview with Dan Abramov');
  });

  it('Should have the database of the website', async () => {
    await urlMessage.run();
    expect(urlMessage.database).toEqual(databases.bookmarks);
  });
});
