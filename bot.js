const Discord = require('discord.js');
const client = new Discord.Client();
const secretToken = require("./auth.json").token;
const channels = require("./data/channels");
const config = require("./data/config.json");

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
    case "help":
      helpCommand(arguments, message);
      break;

    case "multiply":
      multiplyCommand(arguments, message);
      break;

    case "yell":
      yell(arguments, message);
      break;

    case "whisper":
      whisper(arguments, message);
      break;

    default:
      message.channel.send("I don't understand the command. Try `!help` or `!multiply`");
      break;
  }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

function yell(arguments, receivedMessage) {
  let message = arguments.join(" ");

  if(arguments == "") {
    receivedMessage.channel.send(`**HWAT?!**`);
  }
  else {
    receivedMessage.channel.send(`**${message.toUpperCase()}!!**`);
  }
}

function whisper(arguments, receivedMessage) {
  let message = arguments.join(" ");

  receivedMessage.channel.send(`*${message.toLowerCase()}* ( ͡° ͜ʖ ͡°)`);
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(secretToken);