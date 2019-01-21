const embed = require('discord-embed-maker');

const Helpers = require('../../helpers/helpers.js');
const reddits = require('./../../../data/redditsMap.json');
const reddit = require('./../../../reddit.js');
const filterHelpers = require('./filters.js');

module.exports = {
  mapTypeOfReddit(arguments, recieved, typeObj, type=false) {
    let subReddit = arguments[0];

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab post
        if(!type) {
          this.getTitle(arguments, recieved, item.subreddit);
        }
        if(type=="both") {
          this.getBody(arguments, recieved, item.subreddit)
        }
        if(type=="music") {
          this.getLink(arguments, recieved, item.subreddit, 'music');
        }
        if(type=="url") {
          this.getLink(arguments, recieved, item.subreddit);
        }
        if(type=="gif") {
          this.getLink(arguments, recieved, item.subreddit, 'gif', false)
        }
        if(type=="image") {
          this.getImage(arguments, recieved, item.subreddit);
        }
      }
    });
  },

  getTitle(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({limit: 50})
    .then( posts => {
      let postIndex = Helpers.generateRandom(50);
      let post = posts.toJSON()[postIndex]; //choose a post by index
      console.log(post);

      //send out response
      recieved.channel.send(post.title);
    });
  },

  getBody(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let postIndex = Helpers.generateRandom(100);
      let post = posts.toJSON()[postIndex]; //choose a post by index
      response = `${post.title} \n ${post.selftext}`;

      //send out response
      recieved.channel.send(response);
    });
  },

  //TODO: make this function for links and another for gifs
  getLink(arguments, recieved, subreddit, filter='url', title=true) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 75})
    .then( posts => {
      let postIndex = Helpers.generateRandom(75);
      let post = posts.toJSON()[postIndex]; //choose a post by index
      let filterRule = filterHelpers.selectFilter(filter, post);
      let postTitle = title == true ? post.title : "";

      //if filter passes, return
      if(filterRule) {
        response = `${postTitle} \n ${post.url}`;

        //send out response
        recieved.channel.send(response);
      }
      else {
        //try again with a post
        this.getLink(arguments, recieved, subreddit, filter, title);
      }
    });
  },

  embedDesc(post) {
    let redditBase = "http://www.reddit.com";
    let postLink = `${redditBase}${post.toJSON().permalink}`;
    let link = `[See Original](${postLink})`;
    let subName = post.toJSON().subreddit_name_prefixed;

    //return final string
    return `${link} from ${subName}`;
  },

  getImage(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getRandomSubmission()
    .then( post => {
      let imageURL = post.toJSON().url;

      //set up embed
      embed.setDescription(this.embedDesc(post));
      embed.setImage(imageURL);
      embed.setColor("#7aa6d3");

      //send embed to channel
      recieved.channel.send({embed: embed});
    });
  }
}