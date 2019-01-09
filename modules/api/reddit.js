const auth = require("./../../auth.json");
const Helpers = require('../helpers/helpers.js');
const snoowrap = require("snoowrap");

//init reddit instance
const reddit = new snoowrap({
  userAgent: "Berry bot with Node.js snoo wrapper by /u/fetal_sacrifice",
  clientSecret: auth.redditSecret,
  clientId: auth.redditId,
  username: auth.redditUser,
  password: auth.redditPass
});

module.exports = {
  init(command, message, arguments) {
    switch(command) {
      case "question":
        this.askReddit(arguments, message);
        break;
    }
  },

  askReddit(arguments, recieved) {
    reddit.getSubreddit('AskReddit')
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index
      recieved.channel.send(question.title);
    });
  }
}