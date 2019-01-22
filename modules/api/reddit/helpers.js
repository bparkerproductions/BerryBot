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
          this.getHot(arguments, recieved, item.subreddit, 'title');
        }
        if(type=="both") {
          this.getHot(arguments, recieved, item.subreddit, 'body')
        }
        if(type=="music") {
          this.getHot(arguments, recieved, item.subreddit, 'linkbody');
        }
        if(type=="url") {
          this.getHot(arguments, recieved, item.subreddit, 'linkbody');
        }
        if(type=="gif") {
          this.getHot(arguments, recieved, item.subreddit, 'gif');
        }
        if(type=="image") {
          this.getHot(arguments, recieved, item.subreddit, 'image');
        }
      }
    });
  },


  getHot(arguments, recieved, subreddit, type) {
    reddit.getSubreddit(subreddit)
    .getHot({limit: 50})
    .then( posts => {
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
        this.getGif(posts, recieved);
      }
      else if(type=="linkbody") {
        this.getLinkBody(posts, recieved);
      }
    });
  },

  grabPost(posts) {
    let postIndex = Helpers.generateRandom(50);
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

  getGif(posts, recieved) {
    let post = this.grabPost(posts);
    recieved.channel.send(post.url);
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