const reddit = require('./../../../../reddit.js');

module.exports = {
  gif(command, subreddit) {
    return reddit.search({
      query: command,
      subreddit: subreddit,
      sort: 'top'
    });
  }
}