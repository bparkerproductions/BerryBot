const embed = require('discord-embed-maker');

const reddit = require('./../../../reddit.js');
const Helpers = require('../../helpers/helpers.js');
const rhelpers = require('./helpers/helpers.js');
const filters = require('./filters.js');
const animeMaps = require("./data/animeMaps.json");

module.exports = {
  init(command, message, arguments) {
    if(command == "!") {
      if(this.actionMaps[arguments[0]] !== undefined) {
         this.searchGif(arguments, message, command, "awwnime");
      }
    }
  },

  actionMaps: animeMaps,

  searchGif(arguments, recieved, command, subreddit) {
    reddit.search({
      query: arguments[0],
      subreddit: subreddit,
      sort: 'top'
    }).then( result => {
       this.notifyUser(result, arguments, recieved, command);
    })
  },

  generateMessage(arguments, recieved, command) {
    let user = arguments[1], query = arguments[0];
    let reciever = user ? user : "imaginary friend";
    //console.log(recieved.mentions.users.Collection);
    let giver = recieved.author.username;
    let verb = this.actionMaps[query].verb; // map command to verb
    return `${reciever} has been ${verb} by *${giver}*`;
  },

  notifyUser(result, arguments, recieved, command) {
    let message = this.generateMessage(arguments, recieved, command);

    //get random gif
    let index = Helpers.generateRandom(result.length);
    let media = result.toJSON()[index].url;

    embed.setDescription(message);
    embed.setColor("#ffcdc1");
    embed.setURL(media);

    //send message, then send media
    if(filters.animeFilter(media)) {
      recieved.channel.send({embed: embed}).then(() => {
        recieved.channel.send(media);
      });
    }
    else {
      this.searchGif(arguments, recieved, command, "animeGifs");
    }
  }
}