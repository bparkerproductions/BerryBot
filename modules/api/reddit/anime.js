const embed = require('discord-embed-maker');
const fs = require('fs');

const recent = require('./data/recent.json');
const reddit = require('./../../../reddit.js');
const Helpers = require('../../helpers/helpers.js');
const rhelpers = require('./helpers/helpers.js');
const search = require('./helpers/search.js');
const filters = require('./filters.js');

module.exports = {
  init(command, message, arguments) {
    if(command == "!exclude" || command == "!e") {
      this.excludeMedia(message);
    }
    else if(command == "!") {
      //make search with predefined action map
       this.searchGif(arguments, message, arguments[0], "awwnime");
    }
  },

  searchGif(arguments, recieved, command, subreddit) {
    search.media(command, subreddit).then( result => {
      let index = Helpers.generateRandom(result.length);
      let media = result.toJSON()[index].url;
      this.notifyUser(result, arguments, recieved, command, media);
    })
  },

  generateMessage(arguments, recieved, command) {
    let user = arguments[1], query = arguments[0];
    let reciever = user ? user : "imaginary friend";
    //console.log(recieved.mentions.users.Collection);
    let giver = recieved.author.username;
    return `${reciever} has been given a ${command} by ${giver}`;
  },

  excludeMedia(recieved) {
    recieved.channel.send(`This image will now be excluded from search results`);
  },

  notifyUser(result, arguments, recieved, command, media) {
    if(!result.length) {
      recieved.channel.send(`Sorry, ${command} doesn't exist!`);
      return;
    }

    let message = this.generateMessage(arguments, recieved, command);

    embed.setDescription(message);
    embed.setColor("#ffcdc1");
    embed.setImage("");

    //send message, then send media
    if(filters.animeFilter(media)) {
      recieved.channel.send({embed: embed}).then(() => {
        recieved.channel.send(media);
      });
    }
    else {
      this.searchGif(arguments, recieved, command, "animeGifs");
    }
  },

  storeRecent(media) {
    recent.anime = media;
    let file = JSON.stringify(recent, null, '\t');

    fs.writeFileSync('modules/api/reddit/data/recent.json', file);
  }
}