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
      this.getTitle(posts, recieved);
    }
    else if(type=="body") {
      this.getBody(posts, recieved);
    }
    else if(type=="image") {
      this.getImage(posts, recieved);
    }
    else if(type=="gif") {
      this.processFilter(this.getGif, type, posts, recieved);
    }
    else if(type=="linkbody" || type=="music") {
      this.getLinkBody(posts, recieved);
    }
  },

  processFilter(func, type, posts, recieved) {
    //call correct function with 'this' context
    let post = this.grabPost(posts);

    //run filter logic
    if(filters.selectFilter(type, post)) {
      func.call(this, post, recieved);
    }
    else {
      console.log("Didn\'t pass filter.. trying again");
      this.processFilter(func, type, posts, recieved);
    }
  },

  grabPost(posts) {
    let postIndex = Helpers.generateRandom(100);
    return posts.toJSON()[postIndex]; //choose a post by index
  },

  getTitle(posts, recieved) {
    let title = this.grabPost(posts).title;
    recieved.channel.send(title);
  },

  getImage(posts, recieved) {
    let post = this.grabPost(posts);

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

  //TODO: make this function for links and another for gifs
  getLinkBody(posts, recieved) {
    let post = this.grabPost(posts);
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