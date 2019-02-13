//MODULE for doing basic text manipulations
const Helpers = require('./../helpers/helpers.js');
const chain = require("./chain.js");

module.exports = {
  init(command, message, arguments) {
    if(command == "yell") {
      this.yell(arguments, message);
    }
    else if(command == "whisper") {
      this.whisper(arguments, message);
    }
    else if(command == "chain") {
      chain.activate(arguments, message);
    }
    else if(command == "spell") {
      this.spell(arguments, message);
    }
  },

  yell(arguments, received) {
    let message = arguments.join(" ");

    if(arguments == "") {
      received.channel.send(`**HWAT?!**`);
    }
    else {
      received.channel.send(`**${message.toUpperCase()}!!**`);
    }
  },

  whisper(arguments, received) {
    let message = arguments.join(" ");
    console.log(arguments);
    if(arguments == "") {
      //
    }
    else {
      let messageText = `*${message.toLowerCase()}* ( ͡° ͜ʖ ͡°)`;
      received.channel.send(messageText);
    }
  },

  spell(arguments, received) {

  }
}