/* This module contains a set of messages and log messages used by the bot to interact with the user and the console.
 *  Each action key defines a set of messages used for a specific action
 *  such as saving, renaming, adding details, moving, adding topics, adding projects, outboxing, and deleting a page.
 *  Message types:
 *    logInputMessage: Message logged to console when the user click on the operation button.
 *    onClickMessage: Message sent to user when the user click on the operation button
 *    onCancelMessage: Message sent to user when the user cancels the operation by typing /cancel.
 *    successMessage: Message sent to user when the operation is successfully done
 *    logSuccessMessage :Message logged to console when the operation is successfully done
 */
module.exports = {
  save: {
    logInputMessage: 'Received a new message: %s',
    successMessage: 'created page [%s](%s)',
    logSuccessMessage: 'Created a Notion page "%s" at: %s.',
  },
  rename: {
    logInputMessage: 'Requested to rename the page to %s',
    onClickMessage: 'Enter a new title  or /cancel ',
    onCancelMessage: 'Okay, Will keep that title.',
    successMessage: 'The page is renamed to [%s](%s)',
    logSuccessMessage: 'Renamed a Notion page to %s at %s',
  },
  details: {
    logInputMessage: 'Requested to add details: %s',
    onClickMessage: 'Enter the details you want to add to the page  or /cancel',
    onCancelMessage: 'Anything else?',
    successMessage: 'added text block to [%s](%s)',
    logSuccessMessage: 'Added text block to a Notion page %s at: %s',
  },
  move: {
    logInputMessage: '',
    onClickMessage: `Where to?`,
    successMessage: '[%s](%s) moved',
    logSuccessMessage: 'Moved the page',
  },
  addTopic: {
    logInputMessage: '',
    onClickMessage: `Which Topic?`,
    successMessage: `Added topic`,
    logSuccessMessage: 'Added topic',
  },
  addProject: {
    logInputMessage: '',
    onClickMessage: `Which Project?`,
    successMessage: `Added project`,
    logSuccessMessage: 'Added project',
  },
  outbox: {
    logInputMessage: 'Requested to outbox a page.',
    successMessage: 'Page out of inbox!',
    logSuccessMessage: 'Page out of inbox',
  },
  delete: {
    logInputMessage: 'Requested to delete a page.',
    successMessage: 'Page Deleted!',
    logSuccessMessage: 'Page Deleted!',
  },
  done: {
    logInputMessage: 'Ended The conversation.',
  },
  back: { successMessage: 'Anything else?' },
};
