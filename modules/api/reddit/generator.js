/*
 * Module for general generation from reddit API
 */
const rhelpers = require("./helpers.js");
const reddits = require("./../../../data/redditsMap.json");

module.exports = {
  init(command, message, arguments) {
    let copypasta = reddits.pasta;

    if(command == "pasta" || command == "p") {
      rhelpers.mapTypeOfReddit(arguments, message, copypasta, 'desc');  
    }
  },
}