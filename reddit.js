const snoowrap = require('snoowrap');
const auth = require('./auth.js');

//init reddit instance
const reddit = new snoowrap({
  userAgent: 'Berry bot with Node.js snoo wrapper by /u/solar_attack',
  clientSecret: auth.redditSecret,
  clientId: auth.redditId,
  username: auth.redditUser,
  password: auth.redditPass
});

module.exports = reddit;