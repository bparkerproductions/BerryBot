const snoowrap = require("snoowrap");
const auth = require("./../../../auth.json");
const Helpers = require('../../helpers/helpers.js');
const reddits = require("./../../../data/redditsMap.json");

//init reddit instance
const reddit = new snoowrap({
  userAgent: "Berry bot with Node.js snoo wrapper by /u/fetal_sacrifice",
  clientSecret: auth.redditSecret,
  clientId: auth.redditId,
  username: auth.redditUser,
  password: auth.redditPass
});

module.exports = {
  mapTypeOfReddit(arguments, recieved, typeObj, type=false) {
    let subReddit = arguments[0];

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab question
        if(!type) {
          this.getTitle(arguments, recieved, item.subreddit);
        }
        if(type=="both") {
          this.getBody(arguments, recieved, item.subreddit)
        }
        if(type=="url") {
          this.getURL(arguments, recieved, item.subreddit);
        }
      }
    });
  },

  getTitle(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index

      //send out response
      recieved.channel.send(question.title);
    });
  },

  getBody(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index

      response = `${question.title} \n ${question.selftext}`;

      //send out response
      recieved.channel.send(response);
    });
  },

  getURL(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index

      console.log(question.url == false);
      response = `${question.title} \n ${question.url}`;

      //send out response
      recieved.channel.send(response);
    });
  },

  redditHelp(arguments, recieved) {
    let helpCommand = arguments[0];
    let textPrompt = `Commands for: **${helpCommand}**\n`;
    let redditObj = reddits[helpCommand];

    redditObj.forEach((item) => {
      textPrompt+=`${item.arg}, `;
    });

    recieved.channel.send(textPrompt);
  }
}