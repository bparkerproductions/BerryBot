const helpText = require("./../../data/text.json");
const config = require("./../../data/config.json");

module.exports = {
  help(arguments, receivedMessage) {
    let command = arguments[0]; //the command they need help with
    let notFound = `Sorry, the command \`${command}\` was not found`; //default
    let message;

    //command not entered
    if(command === undefined || command == "") {
      message = "list commands";
    }

    //command not found
    else if(helpText.help[command] == undefined) {
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