const config = require("./../../data/config.json");
const configFileName = "data/config.json";
const fs = require("fs");
const Helpers = require("./../helpers/helpers.js");

module.exports = {
  init(command, message, arguments) {
    switch(command) {
      case "config":
        this.config(arguments, message);
        break;
    }
  },

  config(arguments, recieved) {
    let configOption = arguments[0]; 
    let setting = Helpers.validateDigits(arguments[1]);

    //check if the options are valid
    if(config.automod[configOption] && setting) {
      recieved.channel.send(`${configOption} is now set to ${setting}`);
      
      //set it in the file
      config.automod[configOption] = setting;

      //write it to the file
      fs.writeFile(configFileName, JSON.stringify(config, null, 2), (err) => {
        if(err) return console.log(err);
      });

      return;
    }

    recieved.channel.send(`There was a problem trying to set this config option`);
  }
}