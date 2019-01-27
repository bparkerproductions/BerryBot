let music = require("./music.js");

module.exports = {
  init(command, message, arguments) {
    if(command == "trigger") {
      this.activateTrigger(arguments, message);
    }
  },

  default: 5000,
  limit: 2000,

  activateTrigger(arguments, recieved) {
    let type = arguments[0];
    let interval = this.getInterval(arguments[1], recieved);

    if(type == "music") {
      music.musicTrigger(interval, recieved);
    }
  },

  getInterval(arg, recieved) {
    //if arg is under limit, return default
    if(arg < this.limit) {
      recieved.channel.send(`Can't send a value that is less than ${this.limit} seconds. Using default`);
      return this.default;
    }
    //if arg passed, return arg, else return default
    return arg ? arg : this.default;
  }
}
