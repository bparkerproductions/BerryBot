const auth = require("./../../auth.json");
const Helpers = require('../helpers/helpers.js');
const snoowrap = require("snoowrap");
const reddits = require("./../../data/redditsMap.json");
const fs = require("fs");

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
    Generator.init(arguments, message, arguments, reddit);

    let questions = reddits.questionReddits;
    let ideas = reddits.ideaReddits;

    if(command == "question" || command == "q") {
      rhelpers.mapTypeOfReddit(arguments, message, questions);  
    }
    else if(command == "questionHelp" || command == "qh") {
      rhelpers.redditHelp(arguments, message, questions, "question");
    }
    else if(command == "idea" || command == "i") {
      rhelpers.mapTypeOfReddit(arguments, message, ideas);
    }
    else if(command == "ideaHelp" || command == "ih") {
      rhelpers.redditHelp(arguments, message, ideas, "idea");
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