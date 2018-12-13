let {channelName} = require("./../../data/config.json");

module.exports = {
  amountChannels(arguments, receivedMessage, client) {    
    let totalChannels = 0, voiceChannels = 0, textChannels = 0;

    // List all channels
    client.channels.forEach((channel) => {
        channel.type != "category" ? totalChannels++ : 0;
        channel.type == "voice" ? voiceChannels++ : 0;
        channel.type == "text" ? textChannels++ : 0;
      }
    );

    let text = `${channelName} has **${totalChannels}** total channels.\n**${voiceChannels}** are voice channels and **${textChannels}** are text.`;
    receivedMessage.channel.send(text);
  }
}