/*
 * Module for question functionality from reddit
 */
const Helpers = require('../../helpers/helpers.js');
const rhelpers = require("./helpers.js");
const reddits = require("./../../../data/redditsMap.json");
const snoowrap = require("snoowrap");
const auth = require("./../../../auth.json");

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
    let questions = reddits.question;

    if(command == "question" || command == "q") {
      this.mapQuestion(arguments, message, questions);  
    }
  },

  mapQuestion(arguments, recieved, typeObj) {
    let subReddit = arguments[0];

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab post
        this.getQuestion(arguments, recieved, item.subreddit);
      }
    });
  },

  getQuestion(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getRandomSubmission()
    .then( posts => {
      let post = posts.toJSON(); //choose a post by index

      //send out response
      recieved.channel.send(post.title);
    });
  },

  storeQuestion(question) {   
      //set it in the file
      reddits.recentQuestion.question = question;

      //write it to the file
      fs.writeFile(
        'data/redditsMap.json', 
        JSON.stringify(reddits, null, 2), 
        (err) => {
          if(err) return console.log(err);
        }
      );
  },

  questionRepeat(arguments, recieved) {
    recieved.channel.send(reddits.recentQuestion.question);
  }
}