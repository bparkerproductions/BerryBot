const auth = require("./../../auth.json");
const Helpers = require('../helpers/helpers.js');
const snoowrap = require("snoowrap");
const fs = require("fs");
const reddits = require("./../../data/redditsMap.json");

//modules
const rhelpers = require("./reddit/helpers.js");
const Generator = require("./reddit/generator.js");
const Gifs = require("./reddit/gif.js");
const Questions = require("./reddit/question.js");

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
    Gifs.init(command, message, arguments, reddit);
    Questions.init(command, message, arguments, reddit);

    let ideas = reddits.idea;
    let jokes = reddits.jokes;
    let misc = reddits.misc;
    let music = reddits.music;

    if(command == "idea" || command == "i") {
      rhelpers.mapTypeOfReddit(arguments, message, ideas);
    }
    else if(command == "joke" || command == "j") {
      rhelpers.mapTypeOfReddit(arguments, message, jokes, 'both');
    }
    else if(command == "misc") {
      rhelpers.mapTypeOfReddit(arguments, message, misc, 'url');
    }
    else if(command == "music" || command == "mu") {
      rhelpers.mapTypeOfReddit(arguments, message, music, 'music');
    }
    else if(command == "rhelp" || command == "rh") {
      rhelpers.redditHelp(arguments, message);
    }
    else if(command == "questionRepeat" || command == "qr") {
      this.questionRepeat(arguments, message);
    }
  }
}