let triggers = require("./trigger.js");

module.exports = {
  currentInterval: '',

  musicTrigger(interval, recieved) {
    clearInterval(this.currentInterval);

    this.currentInterval = setInterval( () => {
      recieved.channel.send(`test. Current interval: ${interval}`);
    }, interval);
  }
}