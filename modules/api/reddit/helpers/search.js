const reddit = require('./../../../../reddit.js');

module.exports = {
  media(command, subreddit) {
    return reddit.search({
      query: command,
      subreddit: subreddit,
      sort: 'relevance',
      syntax: 'lucene'
    });
  },

  fetchResult(command, subreddit) {
    return this.media(command, subreddit);
  }
}