/*
 * Module for general generation from reddit API
 */

module.exports = {
  init(command, message, arguments, reddit) {
    if(command == "pasta") {
      this.mapTypeOfReddit(arguments, message, questions);  
    }
  }
}