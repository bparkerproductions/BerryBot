const dotenv = require('dotenv');
dotenv.config();

module.exports = {
   "token": process.env.token,
   "redditSecret": process.env.redditSecret,
   "redditId": process.env.redditId,
   "redditUser": process.env.redditUser,
   "redditPass": process.env.redditPass
}