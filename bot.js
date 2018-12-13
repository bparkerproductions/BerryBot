const Discord = require('discord.js');
const client = new Discord.Client();
const secretToken = require("./auth.json").token;
const channels = require("./data/channels");
const config = require("./data/config.json");

const Text = require("./modules/text/text.js");
const Channel = require("./modules/data/channels.js");

client.on('ready', () => {
  //let botChannel = client.channels.get(channels["bot-test"]);

  //botChannel.send("hello berries");
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
      return
    }
    
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
  switch(command) {

    case "yell":
      Text.yell(arguments, message);
      break;

    case "whisper":
      Text.whisper(arguments, message);
      break;

    case "channelcount":
      Channel.amountChannels(arguments, message, client);
      break;

    case "chain":
      Text.chain(arguments, message);
      break;

    default:
      message.channel.send("I don't understand the command. Try `!help` or `!multiply`");
      break;
  }
}


// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(secretToken);