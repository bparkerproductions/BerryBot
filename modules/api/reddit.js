const auth = require("./../../auth.json");
const Helpers = require('../helpers/helpers.js');
const snoowrap = require("snoowrap");
const fs = require("fs");
const reddits = require("./../../data/redditsMap.json");

//modules
const rhelpers = require("./reddit/helpers.js");
const Generator = require("./reddit/generator.js");

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
    //init other modules
    Generator.init(command, message, arguments, reddit);

    let questions = reddits.question;
    let ideas = reddits.idea;
    let jokes = reddits.jokes;
    let misc = reddits.misc;
    let music = reddits.music;

    if(command == "question" || command == "q") {
      rhelpers.mapTypeOfReddit(arguments, message, questions);  
    }
    else if(command == "idea" || command == "i") {
      rhelpers.mapTypeOfReddit(arguments, message, ideas);
    }
    else if(command == "joke" || command == "j") {
      rhelpers.mapTypeOfReddit(arguments, message, jokes, 'both');
    }
    else if(command == "misc") {
      rhelpers.mapTypeOfReddit(arguments, message, misc, 'url');
    }
    else if(command == "music" || command == "mu") {
      rhelpers.mapTypeOfReddit(arguments, message, music, 'url');
    }
    else if(command == "rhelp" || command == "rh") {
      rhelpers.redditHelp(arguments, message);
    }
    else if(command == "questionRepeat" || command == "qr") {
      this.questionRepeat(arguments, message);
    }
  },

  questionFilter(question) {
    return !question.title.toLowerCase().includes("reddit");
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