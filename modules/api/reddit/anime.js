const reddit = require("./../../../reddit.js");
const Helpers = require('../../helpers/helpers.js');
const rhelpers = require('./helpers.js');
const filters = require("./filters.js");

module.exports = {
  init(command, message, arguments) {
    if(this.actionMaps[command] !== undefined) {
       this.searchGif(arguments, message, command, "awwnime");
    }
  },

  actionMaps: {
    "hug": {
      "verb": "hugged",
      "search": "hugging"
    },
    "cuddle": {
      "verb": "cuddled",
      "search": "cuddling"
    },
    "lick": {
      "verb": "licked",
      "search": "licking"
    },
    "kiss": {
      "verb": "kissed",
      "search": "kissing"
    },
    "pat": {
      "verb": "patted",
      "search": "headpat"
    },
  },

  searchGif(arguments, recieved, command, subreddit) {
    let user = arguments[0];
    let theQuery = this.actionMaps[command].search;

    reddit.search({
      query: theQuery,
      subreddit: subreddit,
      sort: 'top'
    }).then( result => {
       this.notifyUser(result, arguments, recieved, command);
    })
  },

  notifyUser(result, arguments, recieved, command) {
    //expect a user here
    let reciever = arguments[0] ? arguments[0] : "imaginary friend";
    //console.log(recieved.mentions.users.Collection);
    let giver = recieved.author.username;
    let verb = this.actionMaps[command].verb; // map command to verb
    let message = `${reciever} has been ${verb} by ${giver}`;

    //get random gif
    let index = Helpers.generateRandom(result.length);
    let media = result.toJSON()[index].url;

    //send message
    if(filters.animeFilter(media)) {
      recieved.channel.send(`${message}\n\n${media}`);
    }
    else {
      this.searchGif(arguments, recieved, command, "animeGifs");
    }
  }
}