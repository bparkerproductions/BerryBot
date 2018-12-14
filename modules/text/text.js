//MODULE for doing basic text manipulations
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./../../data/config.json");
const helpText = require("./../../data/text.json");
const Helpers = require("./../helpers/helpers.js");

//functions
const Help = require("./help.js");

module.exports = {
  init(command, message, arguments) {

    switch(command) {
      case "yell":
        this.yell(arguments, message);
        console.log('called in here');
        break;

      case "help":
        this.help(arguments, message);
        break;

      case "whisper":
        this.whisper(arguments, message);
        break;

      case "chain":
        this.chain(arguments, message);
        break;
    }
  },

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
    let amount = arguments[0]; //amount to repeat
    let message = Helpers.getSentence(arguments); // convert rest of args into a sentence
    let chainLimit = config.chain.limit;

    if(receivedMessage.channel.name !== "❥bot-test") {
      receivedMessage.channel.send(`The chain command is not allowed in this channel`);
      return;
    }

    if(amount > chainLimit ) {
      receivedMessage.channel.send(`chaining is limited to ${chainLimit} uses for this channel`);
      return;
    }

    for(let i=0; i<amount; i++) {
      setTimeout(() => {
        receivedMessage.channel.send(message);
      }, 500);
    }
  },

  help(arguments, receivedMessage) {
    let command = arguments[0]; //the command they need help with
    let notFound = `Sorry, the command \`${command}\` was not found`; //default
    let message;

    //no command found
    if(helpText.help[command] == undefined) {
      message = notFound;
    }

    //find appropriate command from text config file
    else {
      let commandText = helpText.help[command].command;
      let description = helpText.help[command].description;

      message =  `**${description}:** \`\`\`${config.prefix}${commandText}\`\`\``;
    }

    //send message to channel
    receivedMessage.channel.send(message);
  }
}