//HELPERS for channel and role perms

module.exports = {
  //production ready channels
  prod: [
    "main", "general", "vent", "music", "counting", 
    "media", "art", "voice", "animals", "gaming",
    "selfies"],

  //test channels only
  staging: ["berry-bot"],

  isStaff(message) {
    //let isMod = message.member.roles.find("name", "Mod");
    let isOwner = message.member.roles.find("name", "Server Loli");
    let isAdmin = message.member.roles.find("name", "Admin");

    if(isOwner || isAdmin) {
      return true;
    }
    else {
      let errMsg = "You must have staff privileges to use this command";
      message.channel.send(errMsg).then( msg => {
        msg.delete(2000);
      });
      return false;
    }
  },
  getProdChannels(channel) {
    return this.checkChannels(this.prod, channel);
  },
  getTestChannels(channel) {
    return this.checkChannels(this.staging, channel);
  },
  checkChannels(arr, channel) {
    for(let l=0; l<arr.length; l++) {
      if(channel.includes(arr[l])) {
        return true; //we want the automod to be applied
      }
    }

    return false; //no matches, don't run
  },
}