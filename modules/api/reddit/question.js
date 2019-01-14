/*
 * Module for question functionality from reddit
 */
const Helpers = require('../../helpers/helpers.js');
const rhelpers = require("./helpers.js");
const reddits = require("./../../../data/redditsMap.json");
const fs = require("fs");

const reddit = require("./../../../reddit.js");

module.exports = {
  init(command, message, arguments) {
    let questions = reddits.question;

    if(command == "question" || command == "q") {
      this.mapQuestion(arguments, message, questions);  
    }

    else if(command == "qrepeat" || command == "qr") {
      this.questionRepeat(arguments, message);
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

  questionFilter(post) {
    //if the post doesn't include reddit and has a question mark
    return !post.title.includes('reddit') && post.title.includes('?');
  },

  getQuestion(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getRandomSubmission()
    .then( posts => {
      let post = posts.toJSON(); //choose a post by index

      //send out response
      if(this.questionFilter(post)) {
        recieved.channel.send(post.title).then( res => {
          this.storeQuestion(res.content);
        })
      }
      else {
        this.getQuestion(arguments, recieved, subreddit);
      }
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