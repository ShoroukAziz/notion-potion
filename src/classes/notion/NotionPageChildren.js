module.exports = class NotionPageChildren {
  constructor(options) {
    this.children = [];
    options.text ? this._addParagraphChild(options.text) : null;
  }

  _addParagraphChild = (text) => {
    this.children.push({
      object: 'block',
      paragraph: {
        rich_text: [
          {
            text: {
              content: text,
            },
          },
        ],
        color: 'default',
      },
    });
  };
};
