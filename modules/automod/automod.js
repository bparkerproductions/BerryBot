const Config = require('./../../data/config.json');

module.exports = {
  //production ready channels
  prod: [
    "main", "general", "vent", "music", "counting", 
    "media", "art", "voice", "animals", "gaming",
    "selfies"],

  //test channels only
  staging: ["berry-bot"],

  init(message) {
    let channel = message.channel.name;
    console.log(`message recieved in ${channel}`);

    //define channel groups
    let prodReady = this.checkChannels(this.prod, channel);
    let testChannels = this.checkChannels(this.staging, channel);

    if(prodReady || testChannels) {
      this.filterLetters(message);
    }
  },

  checkChannels(arr, channel) {
    for(let l=0; l<arr.length; l++) {
      if(channel.includes(arr[l])) {
        return true; //we want the automod to be applied
      }
    }

    return false; //no matches, don't run
  },

  filterLetters(message) {
    let limit = Config.automod.charlimit;

    //this regex selects if a certain character is repeated
    //a certain amount of times
    let regex = new RegExp(`(.)\\1{${limit},}`, "g");
    if(message.content.match(regex)) {
      console.log('Multiple character spam detected..deleting');
      message.delete(50);
    }
  }
}