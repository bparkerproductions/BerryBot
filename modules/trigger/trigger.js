let helpers = require('./../helpers/helpers.js');
let music = require('./music.js');
let timers = require('./intervals.js');

module.exports = {
  init(command, message, arguments) {
    if(command === 'trigger' || command === 'interval') {
      this.activateTrigger(arguments, message);
    }
  },

  limit: 20,
  getLimitInSeconds(interval) {
    return interval * 1000;
  },
  activateTrigger(arguments, recieved) {
    let type = arguments[0];
    let intervalTime = parseInt(arguments[1]);

    if(type === 'music') this.musicTrigger(intervalTime, recieved);
    if(type === '-m') this.messageTrigger(intervalTime, recieved, arguments);
  },
  intervalSet(obj, func, recieved, interval) {
    clearInterval(timers.intervals[obj]);

    timers.intervals[obj] = setInterval( () => {
      console.log(`${obj} interval passed. Current timer: ${interval} seconds`);
      recieved.channel.send(func());
    }, this.getLimitInSeconds(interval));
  },
  messageTrigger(interval, recieved, arguments) {
    let message = arguments[1];
    let isNumber = typeof parseInt(interval) === 'number';
    let isMessage = message !== undefined && message.length;
    let sentMessage = () => {
      return helpers.getSentence(arguments, 2)
    };

    //first check if the interval should be stopped
    if(arguments[1] === 'stop' || interval === 'stop') {
      clearInterval(timers.intervals['message']);
      return;
    }

    if(isNumber && isMessage) {
      if(parseInt(interval) >= this.limit) {
        this.intervalSet('message', sentMessage, recieved, interval);
      }
      else {
        recieved.channel.send(`The current lowest allowed value is ${this.limit} seconds, please use a higher value.`);
        return;
      }
    }
    else {
      recieved.channel.send('Something is wrong with your command, please try again.');
    }
  },

  musicTrigger(interval, recieved) {
    // let sentMessage = () => {
    //   return `test. Current interval: ${interval}`;
    // }

    // this.intervalSet('music', sentMessage, recieved, interval);
  }
}
