const embed = require('discord-embed-maker');

const Helpers = require('../../helpers/helpers.js');
const reddits = require('./../../../data/redditsMap.json');
const reddit = require('./../../../reddit.js');
const filters = require('./filters.js');

module.exports = {
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
    .getHot({limit: 100})
    .then( posts => {
      this.mapPostGetter(type, posts, recieved);
    });
  },

  mapPostGetter(type, posts, recieved) {
    if(type=="title") {
      this.postWrap(this.getTitle, type, posts, recieved);
    }
    else if(type=="body") {
      this.postWrap(this.getBody, type, posts, recieved);
    }
    else if(type=="image") {
      this.postWrap(this.getImage, type, posts, recieved);
    }
    else if(type=="gif") {
      this.postWrap(this.getGif, type, posts, recieved);
    }
    else if(type=="url") {
      this.postWrap(this.getLinkBody, type, posts, recieved);
    }
    else if(type=="titlebody") {
      this.postWrap(this.getTitleBody, type, posts, recieved);
    }
    else if(type=="linkbody" || type=="music") {
      this.postWrap(this.getLinkBody, type, posts, recieved);
    }
  },

  postWrap(func, type, posts, recieved) {
    //call correct function with 'this' context
    let post = this.grabPost(posts);

    //run filter logic
    if(filters.selectFilter(type, post)) {
      func.call(this, post, recieved);
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

  getTitle(post, recieved) {
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
    embed.setTitle(post.title);
    embed.setDescription(post.selftext);

    recieved.channel.send({ embed:embed });
  },

  getLinkBody(post, recieved) {
    recieved.channel.send(`${post.title}\n${post.url}`);
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