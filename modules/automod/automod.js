const Config = require('./../../data/config.json');
const Counting = require('./counting.js');
const Perms = require('./../helpers/perms.js');

module.exports = {
  init(message) {
    let channel = message.channel.name;
    console.log(`message recieved in ${channel}`);

    //define channel groups
    let prodReady = Perms.getProdChannels(channel);
    let testChannels = Perms.getTestChannels(channel);

    if(testChannels || prodReady) {
      this.filterLetters(message);
    }

    if(channel.includes("counting")) {
      Counting.countingMod(message);
    }
  },

  filterLetters(message) {
    let limit = Config.automod.charlimit;

    //this regex selects if a certain character is repeated
    //a certain amount of times
    let regex = new RegExp(`(.)\\1{${limit},}`, 'g');
    if(message.content.match(regex)) {
      console.log('Multiple character spam detected..deleting');
      message.delete(50);
    }
  }
}