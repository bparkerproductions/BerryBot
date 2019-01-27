const Helpers = require('../helpers/helpers.js');
const reddits = require('./../../data/redditsMap.json');
const reddit = require('./../../reddit.js');

//modules
const rhelpers = require("./reddit/helpers/helpers.js");
const Generator = require("./reddit/generator.js");
const Gifs = require("./reddit/gif.js");
const Anime = require("./reddit/anime.js");


module.exports = {
  init(command, message, arguments) {
    //init other modules
    Generator.init(command, message, arguments);
    Gifs.init(command, message, arguments);
    Anime.init(command, message, arguments);

    let { idea, jokes, misc, music, image, video, question } = reddits;

    if(command == "idea" || command == "i") {
      rhelpers.mapTypeOfReddit(arguments, message, idea, 'title');
    }
    else if(command == "joke" || command == "j") {
      rhelpers.mapTypeOfReddit(arguments, message, jokes, 'titlebody');
    }
    else if(command == "misc") {
      rhelpers.mapTypeOfReddit(arguments, message, misc, 'url');
    }
    else if(command == "music" || command == "mu") {
      rhelpers.mapTypeOfReddit(arguments, message, music, 'music');
    }
    else if(command == "image" || command == "img" || command == "pic") {
      rhelpers.mapTypeOfReddit(arguments, message, image, 'image');
    }
    else if(command == "video" || command == "vid") {
      rhelpers.mapTypeOfReddit(arguments, message, video, 'url');
    }
    else if(command == "question" || command == "q") {
      rhelpers.mapTypeOfReddit(arguments, message, question, 'question');
    }
  }
}