module.exports = class Website {

  constructor(options, databases) {

    this.setParentDB(options.parent, databases);
    this.setName(options.name);
    this.setDownloadHTMLRules(options.urlPattern,
      options.titleHtmlTag, options.titlePattern, options.selenium);

    this.setNotionRules(options.typeSelectOption, options.mediaType, options.Tags, options.defaultIcon, options.defaultTitle, options.embeddableContent, options.embeddableVideo);
  }

  setName(name) {
    this.name = name;
  }

  setParentDB(parent, databases) {
    this.parent = databases[parent];
    databases[parent].addWebsite(this);
  }

  setDownloadHTMLRules(urlPattern, titleHtmlTag, titlePattern, selenium) {
    this.downloadHTMLRules = {
      titleHtmlTag,
      titlePattern,
      selenium,
      urlPattern

    }
  }

  setNotionRules(typeSelectOption, mediaType, Tags, defaultIcon, defaultTitle, embeddableContent, embeddableVideo) {
    this.notionRules = {
      typeSelectOption,
      defaultIcon,
      defaultTitle,
      embeddableContent,
      embeddableVideo,
      mediaType,
      Tags
    }
  }

}
