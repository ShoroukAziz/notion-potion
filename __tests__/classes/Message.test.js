const Message = require('../../src/classes/Message');

const databases = {
  stuff: {},
  notes: { tag: '@note' },
};
const processedMessage = {
  text: 'This is some text',
  database: databases.stuff,
};

describe('MessageProcessor', () => {
  it('Should get the text and database oyt of the processed message', () => {
    const message = new Message(processedMessage);
    expect(message.text).toEqual('This is some text');
    expect(message.database).toEqual(databases.stuff);
  });
});
