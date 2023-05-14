const MessageProcessor = require('../../src/classes/MessageProcessor');

const databases = {
  stuff: {},
  notes: { tag: '@note' },
};

describe('MessageProcessor', () => {
  it('Should processes message with database tag at the beginning of message', () => {
    const incomingMessage = '@note This is some other text';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('This is some other text');
    expect(processedMessage.database).toEqual(databases.notes);
    expect(processedMessage.url).toBeNull();
  });

  it('Should processes message with database tag at the end of message', () => {
    const incomingMessage = 'This is some other text @note';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('This is some other text');
    expect(processedMessage.database).toEqual(databases.notes);
    expect(processedMessage.url).toBeNull();
  });

  it('Should processes message with URL', () => {
    const incomingMessage = 'http://example.com This is some other text';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('This is some other text');
    expect(processedMessage.database).toEqual(databases.stuff);
    expect(processedMessage.url).toEqual('http://example.com');
  });

  it('Should processes message with database and URL', () => {
    const incomingMessage = '@note This is some text http://example.com';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('This is some text');
    expect(processedMessage.database).toEqual(databases.notes);
    expect(processedMessage.url).toEqual('http://example.com');
  });

  it('Should processes message with database and URL in any order', () => {
    const incomingMessage = '@note http://example.com This is some text';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('This is some text');
    expect(processedMessage.database).toEqual(databases.notes);
    expect(processedMessage.url).toEqual('http://example.com');
  });

  it('processes message with no database and no URL', () => {
    const incomingMessage = 'This is some more text';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('This is some more text');
    expect(processedMessage.database).toEqual(databases.stuff);
    expect(processedMessage.url).toBeNull();
  });

  it('processes message with URL only', () => {
    const incomingMessage = 'http://example.com';
    const processedMessage = new MessageProcessor(incomingMessage, databases);

    expect(processedMessage.text).toEqual('');
    expect(processedMessage.database).toEqual(databases.stuff);
    expect(processedMessage.url).toEqual('http://example.com');
  });
});
