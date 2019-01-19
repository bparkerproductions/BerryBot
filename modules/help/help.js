const helpText = require("./../../data/help.json");
const config = require("./../../data/config.json");
const reddits = require("./../../data/redditsMap.json");

module.exports = {
  init(command, message, arguments) {
    if(command == "help" || command == "h") {
      this.help(arguments, message);
    }
    else if(command == "rhelp" || command == "rh") {
      this.redditHelp(arguments, message);
    }
  },

  help(arguments, received) {
    let command = arguments[0]; //the command they need help with

    //list all commands on base command
    if(command === "" || command == undefined) {
      this.listCommands(arguments, received);
    }

    helpText.help.forEach( elem => {
      this.promptUser(elem, command, received);
    });

    //received.channel.send(`Sorry, the command \`${command}\` was not found`);
  },

  promptUser(elem, command, received) {
    if(elem.name == command) {
      let textPrompt = "";
      textPrompt+=`To use ${elem.name} type: \`b!${elem.command}\``;

      //if there is a list of commands, append them
      if(elem.commands) {
        let commandsText = `\n\nAvailable ${elem.verb} are:\n`;
        elem.commands.list.forEach( command => {
          commandsText+=`${command}, `;
        });

        textPrompt+=commandsText;
      }

      received.channel.send(textPrompt);
      return;
    }
  },

  listCommands(arguments, received) {
    let helpStr = "Use `b!help <arg>` for more details\n\n";

    let list = helpText.help.forEach( elem => {
      helpStr +=  `**${elem.name}** - ${elem.description}\n\n`;
    });

    received.channel.send(helpStr);
  },

  listHelp(obj, name) {
    let textPrompt = `Use \`b!${name} <arg>\`\n Args are: `;

    obj.forEach( item => {
      textPrompt+=`${item.arg}, `;
    });

    return textPrompt.trim();
  },

  redditHelp(arguments, recieved) {
    let helpCommand = arguments[0];
    let redditObj = reddits[helpCommand];

    if(helpCommand == "all" || helpCommand == undefined) {
      this.rhelpAll(arguments, recieved);
      return;
    }

    let list = this.listHelp(redditObj, helpCommand);
    recieved.channel.send(list);
  },

  rhelpAll(arguments, recieved) {
    let textPrompt = "**Listing all rhelp commands:** \n\n";

    Object.entries(reddits).forEach( item => {
      let name = item[0];
      let items = item[1];
      let list = this.listHelp(items, name);
      textPrompt+=`${list}\n\n `;
    });

    recieved.channel.send(textPrompt);
  }
}