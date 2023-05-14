const Webpage = require('../../src/classes/WebPage');

describe('Webpage', () => {
  describe('_downloadPage', () => {
    const url = 'http://example.com';
    const mockResponse = {
      data: '<html><head><title>Example</title></head><body><h1>Hello, world!</h1></body></html>',
    };
    const httpClient = { get: jest.fn(() => Promise.resolve(mockResponse)) };

    it('should return the HTML content of the webpage', () => {
      const webpage = new Webpage(url, httpClient, null, null);
      return webpage._downloadPage(url, httpClient).then((htmlContent) => {
        expect(htmlContent).toEqual(mockResponse.data);
      });
    });

    it('should set the HTML content as a class property', () => {
      const webpage = new Webpage(url, httpClient, null, null);
      return webpage._downloadPage(url, httpClient).then(() => {
        expect(webpage.HTMLContent).toEqual(mockResponse.data);
      });
    });

    //TODO: review error handling testing
    it('should throw an error if the HTTP request fails', () => {
      const error = new Error('HTTP request failed');
      httpClient.get.mockImplementationOnce(() => Promise.reject(error));
      const webpage = new Webpage(url, httpClient, null, null);
      return webpage._downloadPage(url, httpClient).catch((err) => {
        expect(err).toEqual(error);
      });
    });
  });

  describe('_parseHTML', () => {
    test('Should return the parsed HTML content', () => {
      const HTMLContent =
        '<html><head><title>My title</title></head><body><p>Some content</p></body></html>';
      const parserMock = {
        parse: jest
          .fn()
          .mockReturnValue({ title: 'My title', content: 'Some content' }),
      };
      const webpage = new Webpage('http://example.com', null, parserMock, null);

      const parsedHTML = webpage._parseHTML(HTMLContent, parserMock);

      expect(parsedHTML).toEqual({
        title: 'My title',
        content: 'Some content',
      });
      expect(parserMock.parse).toHaveBeenCalledWith(HTMLContent);
    });
  });

  describe('_setTitle', () => {
    let webpage;

    beforeEach(() => {
      const html = `
      <html>
        <head>
          <title>Test Title --removeMe</title>
        </head>
        <body>
          <h1>Test Header</h1>
        </body>
      </html>
    `;
      const htmlParser = {
        parse: jest.fn(() => ({
          querySelector: jest.fn((selector) => {
            if (selector === 'title') {
              return { text: 'Test Title' };
            } else if (selector === 'h1') {
              return { text: 'Test Header' };
            }
          }),
        })),
      };
      webpage = new Webpage('http://example.com', {}, htmlParser, {});
      webpage.html = htmlParser.parse(html);
    });

    it('should set title based on parsing rules', () => {
      webpage.parsingRules = { titleHtmlTag: 'h1', titlePattern: 'Test' };
      webpage._setTitle();
      expect(webpage.title).toBe('Header');
    });

    it('should set title to title tag content if parsing rules not provided', () => {
      webpage._setTitle();
      expect(webpage.title).toBe('Test Title');
    });

    it('should set title to header tag content if title tag not found', () => {
      webpage.html.querySelector = jest.fn((selector) => {
        if (selector === 'title') {
          return null;
        } else if (selector === 'h1') {
          return { text: 'Test Header' };
        }
      });
      webpage._setTitle();
      expect(webpage.title).toBe('Test Header');
    });

    it('should set title to fallback value if neither title nor header tag found', () => {
      webpage.html.querySelector = jest.fn(() => null);
      webpage._setTitle();
      expect(webpage.title).toBe('New URL');
    });

    it('should replace title pattern with empty string if pattern provided', () => {
      webpage.parsingRules = {
        titleHtmlTag: 'title',
        titlePattern: ' --removeMe',
      };
      webpage._setTitle();
      expect(webpage.title).toBe('Test Title');
    });
  });
});
