# 🧪 Notion-Potion

## Effortlessly brew new Notion pages with Notion-Potion Telegram Bot!

Notion-Potion is a Telegram bot that lets you quickly and easily save new notes, tasks, events etc... to your [Notion](https://notion.so) workspace.

<p align='center'>
<a href='https://nodejs.org/en/'> <img src='https://img.shields.io/badge/Made%20with-Node.js%20-success'> </a>
<a href='https://developers.notion.com/docs/getting-started'> <img src='https://img.shields.io/badge/Made%20with-Notion%20API%20-black'> </a>
<a href='https://github.com/yagop/node-telegram-bot-apid'> <img src='https://img.shields.io/badge/Made%20with-Telegram%20Bot%20API%20-blue'> </a>
</p>

## 🪄 Inspiration

The idea behind this bot is heavily inspired by [David Allen's book Getting Things Done](https://www.amazon.ca/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563/). And, is the upgrade to the method used in this previous blog post: [Implementing a GTD inbox in Notion](https://blog.shorouk.dev/2021/10/gtd-inbox-in-notion/)

## 🔮How it Works

https://github.com/ShoroukAziz/notion-potion/assets/27028706/8d2933bd-9206-4f2c-9e3f-438ec0d29ace



### 💬 Sending text messages

- You send a message to your bot. It get's automatically saved to your Notion Inbox database

  - You then can then do any of the following
    - Rename the page
    - Move the page to another database ex: tasks, notes, etc...
    - Link the page to a specific project
    - link the page to a specific Topic
    - Delete the page

- Or, you can tell the bot directly where to save the page
  - for example to save a page to your notes you append or prepend your message with `@note `

### 🔗 Sending URLs

- Links that matches a specific website you have set up before will get saved directly to the specified database
  - Ex: a URL of Youtube video gets added to the Bookmarks database while a URL of an Amazon product gets saved in the Shopping database
- Text you send with the URL gets saved inside the page as a text block.

---

## 📃 Documentation

🚧 Coming soon

## ⚠️ Prerequisites

- You have a telegram bot
  - Use [BotFather](https://telegram.me/BotFather) to create one and obtain your token
- Yon know your telegram user id
  - use [jsondumpbot](https://telegram.me/jsondumpbot) to get it.
- You have a [Notion API Token](https://www.notion.so/my-integrations)
- You have your Notion workspace setup [🚧 tutorial coming soon]

## 🚀 Getting Started

- Fork this repository and clone it to your local machine.
- Copy <code>.env.example </code> and rename it <code>.env</code> and fill in your tokens and telegram user id
  ```YAML
  TELEGRAM_BOT_TOKEN=Your telegram bot token
  MY_USER_ID=your telegram user id
  NOTION_TOKEN=your Notion token
  ```
- copy <code>notion.example.sqlite </code> and rename it to <code>notion.sqlite </code>
  - Replace the example databases with your databases [🚧 tutorial coming soon]
- Install all the dependencies ` npm install`
- Run the bot 🥳 ` npm run`

## 🧱 File Structure

```sh
├── docs                                       # screenshots for readme
├── src
│  ├── bot                                     # All the bot code like the event handlers, keyboards, state, etc...
│  ├── classes                                 # All the Classes used by the bot
│  ├── databases                               # Connection to the database and all the data retrieval
│  ├── lib                                     # Helper classes like Logger and Util
├─── __test__                                  # Testing code.
├─── .env.example                              # example env file.
├─── notion.sqlite.example                     # example database file.
├─── app.js                                    # Entry point for the bot.
├─── package-lock.json
├─── package.json
└─── README.md
```

## 📦 Dependencies

- 🔳 [@notionhq/client](<[express.js](https://developers.notion.com/docs/getting-started)>)
- 🤖 [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- 📰 [axios](https://axios-http.com)
- 🎨 [chalk](https://github.com/chalk/chalk#readme)
- 🔐 [dotenv](https://github.com/motdotla/dotenv#readme)
- 📝 [node-html-parser](https://github.com/taoqf/node-fast-html-parser)
- 😈 [nodemon](https://nodemon.io)
- 📑 [sqlite3](https://github.com/TryGhost/node-sqlite3)

### 🧰 Development Dependencies

- 👢 [jest](https://jestjs.io/)
