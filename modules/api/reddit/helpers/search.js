const reddit = require('./../../../../reddit.js');

module.exports = {
  searchGif(arguments, recieved, command, subreddit) {
    reddit.search({
      query: command,
      subreddit: subreddit,
      sort: 'top'
    })
  }
}