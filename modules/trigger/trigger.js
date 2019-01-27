let music = require("./music.js");

module.exports = {
  init(command, message, arguments) {
    if(command == "trigger") {
      this.activateTrigger(arguments, message);
    }
  },

  activateTrigger(arguments, recieved) {
    let type = arguments[0];
    let interval = arguments[1] ? arguments[1] : 1000;

    if(type == "music") {
      music.musicTrigger(interval, recieved);
    }
  }
}
