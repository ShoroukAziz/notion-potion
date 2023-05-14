module.exports = class NotionPageProperties {
  constructor(title, options) {
    this._addProperty('Name', this._createTitleProperty(title));
    this._addProperty('Inbox', this._createCheckboxProperty(true));
    this._buildOptionalProperties(options);
  }

  _addProperty = (propName, prop) => {
    this[propName] = prop;
  };

  _createTitleProperty = (title) => {
    return {
      title: [
        {
          text: {
            content: title,
          },
        },
      ],
    };
  };

  _createCheckboxProperty = (checkbox) => {
    return {
      type: 'checkbox',
      checkbox,
    };
  };

  _createSelectProperty = (selectedOption) => {
    return {
      select: {
        name: selectedOption,
      },
    };
  };

  _createMultiSelectProperty = (Tags) => {
    //TODO: make it accept multiple tags
    return {
      multi_select: [
        {
          name: Tags,
        },
      ],
    };
  };

  _createURLProperty = (url) => {
    return {
      url,
    };
  };

  _createTextProperty = (text) => {
    return {
      rich_text: [
        {
          text: {
            content: text,
          },
        },
      ],
    };
  };

  _createRelationProperty = (id) => {
    return {
      relation: [{ id }],
    };
  };

  _buildOptionalProperties(options) {
    if (options.url) {
      this._addProperty('URL', this._createURLProperty(options.url));
    }
    if (options.Tags) {
      this._addProperty('Tags', this._createMultiSelectProperty(options.Tags));
    }
    if (options.mediaType) {
      this._addProperty(
        'Media Type',
        this._createSelectProperty(options.mediaType)
      );
    }
  }
};
