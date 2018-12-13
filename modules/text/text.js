//MODULE for doing basic text manipulations
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./../../data/config.json");


module.exports = {
  yell(arguments, receivedMessage) {
    let message = arguments.join(" ");

    if(arguments == "") {
      receivedMessage.channel.send(`**HWAT?!**`);
    }
    else {
      receivedMessage.channel.send(`**${message.toUpperCase()}!!**`);
    }
  },

  whisper(arguments, receivedMessage) {
    let message = arguments.join(" ");
    console.log(arguments);
    if(arguments == "") {
      //
    }
    else {
      let messageText = `*${message.toLowerCase()}* ( ͡° ͜ʖ ͡°)`;
      receivedMessage.channel.send(messageText);
    }
  },

  chain(arguments, receivedMessage) {
    let amount = arguments[0]; //first arg
    let message = arguments[1]; // second arg
    let chainLimit = config.chain.limit;

    if(amount > chainLimit) {
      receivedMessage.channel.send(`chaining is limited to ${chainLimit} uses for this channel`);
      return;
    }

    for(let i=0; i<amount; i++) {
      setTimeout(() => {
        receivedMessage.channel.send(message);
      }, 500);
    }
  }
}