const embed = require('discord-embed-maker');

const Helpers = require('../../../helpers/helpers.js');
const reddits = require('./../../../../data/redditsMap.json');
const reddit = require('./../../../../reddit.js');
const filters = require('./../filters.js');

module.exports = {
  postMaps: {
    "body": "getBody",
    "title": "getTitle",
    "image": "getImage",
    "gif": "getGif",
    "url": "getLinkBody",
    "titlebody": "getTitleBody",
    "linkbody": "getLinkBody",
    "music": "getLinkBody",
    "question": "getTitle"
  },

  mapTypeOfReddit(arguments, recieved, typeObj, type) {
    let subReddit = arguments[0];

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab post
        this.getHot(arguments, recieved, item.subreddit, type);
      }
    });
  },

  getHot(arguments, recieved, subreddit, type) {
    reddit.getSubreddit(subreddit)
    .getHot({limit: 250})
    .then( posts => {
      this.mapPostGetter(type, posts, recieved);
    });
  },

  mapPostGetter(type, posts, recieved) {
    let postObj = this.postMaps[type];

    if(postObj !== undefined) {
      this.postWrap(this[postObj], type, posts, recieved);
    }
    else {
      return;
    }
  },

  postWrap(func, type, posts, recieved) {
    //call correct function with 'this' context
    let post = this.grabPost(posts);

    //run filter logic
    if(filters.selectFilter(type, post)) {
      func.call(this, post, recieved, type);
    }
    else {
      console.log("Didn\'t pass filter.. trying again...");
      this.postWrap(func, type, posts, recieved);
    }
  },

  grabPost(posts) {
    let postIndex = Helpers.generateRandom(100);
    return posts.toJSON()[postIndex]; //choose a post by index
  },

  getTitle(post, recieved, type) {
    recieved.channel.send(post.title);
  },

  getImage(post, recieved) {
    //set up embed
    embed.setDescription(this.embedDesc(post));
    embed.setImage(post.url);
    embed.setColor("#7aa6d3");

    //send embed to channel
    recieved.channel.send({embed: embed});
  },

  getGif(post, recieved) {
    recieved.channel.send(post.url);
    return post.url;
  },

  getBody(posts, recieved) {
    let post = this.grabPost(posts);
    embed.setTitle(post.title);
    embed.setDescription(post.selftext);

    recieved.channel.send({embed: embed});
  },

  getTitleBody(post, recieved) {
    recieved.channel.send(`**${post.title}**\n\n${post.selftext}`);
  },

  getLinkBody(post, recieved) {
    recieved.channel.send(`**${post.title}**\n\n${post.url}`);
  },

  embedDesc(post) {
    let redditBase = "http://www.reddit.com";
    let postLink = `${redditBase}${post.permalink}`;
    let link = `[See Original](${postLink})`;
    let subName = post.subreddit_name_prefixed;

    //return final string
    return `${link} from ${subName}`;
  }
}