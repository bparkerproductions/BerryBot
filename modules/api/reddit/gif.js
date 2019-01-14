/*
 * Module for general generation from reddit API
 */
const rhelpers = require("./helpers.js");
const reddits = require("./../../../data/redditsMap.json");

module.exports = {
  init(command, message, arguments, reddit) {
    let gif = reddits.gif;

    if(command == "gif") {
      rhelpers.mapTypeOfReddit(arguments, message, gif, 'gif');  
    }
  },
}