const { logSuccess } = require('../lib/logger');
const NotionDatabase = require('../classes/notion/NotionDatabase');
const Website = require('../classes/notion/Website');
const store = require('./store');
const db = require('./db');

/**
 * Retrieves "Notion databases" data from the database
 * @returns {Promise<object>} - Resolves with an object of database objects.
 */
const getDatabase = function () {
  return new Promise(function (resolve, reject) {
    const DATABASES = {};
    const query = `SELECT * FROM bases`;
    db.each(
      query,

      (err, row) => {
        if (err) {
          reject(err);
        } else {
          DATABASES[row.name] = new NotionDatabase(row);
        }
      },
      (err, n) => {
        if (err) {
          reject(err);
        } else {
          resolve(DATABASES);
        }
      }
    );
  });
};

/**
 * Retrieves Websites data from the database.
 * @param {Object} databases - Object containing all databases.b
 * @returns {Promise<Object>} Promise that resolves to an object containing all the websites.
 */
const getWebsites = function (databases) {
  return new Promise(function (resolve, reject) {
    const websites = {};
    const query = `SELECT * FROM websites `;

    db.each(
      query,

      (err, row) => {
        if (err) {
          reject(err);
        } else {
          websites[row.name] = new Website(row, databases);
        }
      },
      (err, n) => {
        if (err) {
          reject(err);
        } else {
          db.close();
          resolve(websites);
        }
      }
    );
  });
};

module.exports = async function () {
  const databases = await getDatabase();
  store.databases = databases;
  logSuccess('Loaded databases!');
  const websites = await getWebsites(databases);
  store.websites = websites;
  logSuccess('Loaded websites!');
};
