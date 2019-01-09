const axios = require("axios");
const snoowrap = require("snoowrap");
const auth = require("./../../auth.json");
const reddit = new snoowrap({
  userAgent: "Berry bot with Node.js snoo wrapper by /u/fetal_sacrifice",
  clientSecret: auth.redditSecret,
  clientId: auth.redditId,
  username: auth.redditUser,
  password: auth.redditPass
});
const Helpers = require('../helpers/helpers.js');

module.exports = {
  init(command, message, arguments) {
    switch(command) {
      case "quote":
        this.getQuote(arguments, message);
        break;

      case "question":
        this.askReddit(arguments, message);
        break;
    }
  },

  getQuote(arguments, recieved) {
    let quoteEndpoint = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    axios.get(quoteEndpoint)
    .then( res => {
      let author = res.data.quoteAuthor;
      let text = res.data.quoteText;

      //send it
      recieved.channel.send(`"${text}" **- ${author}**`);
    })
  },

  askReddit(arguments, recieved) {
    //reddit.getSubreddit('AskReddit').getWikiPage('bestof').content_md.then(console.log);
  }
}