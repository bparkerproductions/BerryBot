const Discord = require('discord.js');
const client = new Discord.Client();
const secretToken = require("./auth.json").token;
const channels = require("./data/channels");
const config = require("./data/config.json");

const Text = require("./modules/text/text.js");
const Channel = require("./modules/data/channels.js");
const API = require("./modules/api/api.js");
const Automod = require("./modules/automod/automod.js");
const BotConfig = require("./modules/config/config.js");
const User = require("./modules/user/user.js");

client.on('ready', () => {
  //let botChannel = client.channels.get(channels["bot-test"]);
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
      return
    }

    Automod.init(receivedMessage);
    
    if (receivedMessage.content.startsWith(config.prefix)) {
      processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let prefixLen = config.prefix.length;

    let fullCommand = receivedMessage.content.substr(prefixLen) // remove prefix
    let splitCommand = fullCommand.split(" ") // split args
    let primaryCommand = splitCommand[0] // first word is main command
    let arguments = splitCommand.slice(1) // other params

    console.log("Command received: " + primaryCommand)

    if(arguments) {
      console.log("Arguments: " + arguments);
    }

    mapCommands(primaryCommand, receivedMessage, arguments);
}

function mapCommands(command, message, arguments) {
  Text.init(command, message, arguments);

  switch(command) {
    case "quote":
      API.getQuote(arguments, message);
      break;

    case "messagecount":
      User.userMessageCount(arguments, message, client);
      break;

    case "config":
      BotConfig.config(arguments, message);
      break;

    case "channelcount":
      Channel.amountChannels(arguments, message, client);
      break;
  }
}



// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(secretToken);