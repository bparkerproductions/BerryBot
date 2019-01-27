let helpers = require("./../helpers/helpers.js");
let music = require("./music.js");
let timers = require("./intervals.js");

module.exports = {
  init(command, message, arguments) {
    if(command == "trigger" || command == "trig") {
      this.activateTrigger(arguments, message);
    }
  },

  default: 5000,
  limit: 2000,

  activateTrigger(arguments, recieved) {
    let type = arguments[0];
    let interval = this.getInterval(arguments[1], recieved);

    if(type == "music") {
      this.musicTrigger(interval, recieved);
    }
    if(type == "-m") {
      this.messageTrigger(interval, recieved, arguments);
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
  },

  intervalSet(obj, func, recieved, interval) {
    clearInterval(timers.intervals[obj]);

    if(interval !== 'stop') {
      timers.intervals[obj] = setInterval( () => {
        recieved.channel.send(func());
      }, interval);
    }
  },

  messageTrigger(interval, recieved, arguments) {
    let message = arguments[2];
    let sentMessage = () => {
      return helpers.getSentence(arguments, 2)
    };

    this.intervalSet('message', sentMessage, recieved, interval);
  },

  musicTrigger(interval, recieved) {
    let sentMessage = () => {
      return `test. Current interval: ${interval}`;
    }
    
    this.intervalSet('music', sentMessage, recieved, interval);
  }
}
