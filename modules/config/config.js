let config = require("./../../data/config.json");

module.exports = {
  config(arguments, recieved) {
    let configOption = arguments[0]; 
    let setting = arguments[1];
    let val = config.automod;

    if(val[configOption] && setting) {
      val[configOption] = setting;

      recieved.channel.send(`${configOption} is now set to ${setting}`);
      return;
    }

    recieved.channel.send(`There was a problem trying to set this config option`);
  }
}