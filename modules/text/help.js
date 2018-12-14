module.exports = {
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