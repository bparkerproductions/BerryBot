const Discord = require('discord.js');
const client = new Discord.Client();
const secretToken = require('./auth.js').token;
const config = require('./data/config.json');

//Every bot module
const Text = require('./modules/text/text.js');
const Channel = require('./modules/data/channels.js');
const API = require('./modules/api/api.js');
const Automod = require('./modules/automod/automod.js');
const BotConfig = require('./modules/config/config.js');
const Help = require('./modules/help/help.js');
const Moderation = require('./modules/moderation/moderation.js');
const Trigger = require('./modules/trigger/trigger.js');
const Utility = require('./modules/utility/utility.js');
const UserJoin = require('./modules/user/join.js');

//set global root path
global.__base = __dirname;

client.on('ready', () => {
  //let botChannel = client.channels.get(channels['bot-test']);
});

client.on('guildMemberAdd', member => {
  UserJoin.welcome(member);
})

client.on('message', receivedMessage => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) return;

    Automod.init(receivedMessage);

    if (receivedMessage.content.startsWith(config.prefix)) {
      processCommand(receivedMessage);
    }
})

function processCommand(receivedMessage) {
    let prefixLen = config.prefix.length;

    let fullCommand = receivedMessage.content.substr(prefixLen) // remove prefix
    let splitCommand = fullCommand.split(' ') // split args
    let primaryCommand = splitCommand[0] // first word is main command
    let arguments = splitCommand.slice(1) // other params

    console.log('Command received: ' + primaryCommand)

    if(arguments) {
      console.log('Arguments: ' + arguments);
    }

    mapCommands(primaryCommand, receivedMessage, arguments);
}

function mapCommands(command, message, arguments) {
  Text.init(command, message, arguments);
  API.init(command, message, arguments);
  Channel.init(command, message, arguments, client);
  BotConfig.init(command, message, arguments);
  Help.init(command, message, arguments);
  Moderation.init(command, message, arguments);
  Utility.init(command, message, arguments);
  Trigger.init(command, message, arguments);
}

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> 'Click to Reveal Token'

client.login(secretToken);