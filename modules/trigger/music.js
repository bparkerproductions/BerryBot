let timers = require("./intervals.js");

module.exports = {
  musicTrigger(interval, recieved) {
    clearInterval(timers.intervals.music);

    if(interval !== 'stop') {
      timers.intervals.music = setInterval( () => {
        recieved.channel.send(`test. Current interval: ${interval}`);
      }, interval);
    }
  }
}