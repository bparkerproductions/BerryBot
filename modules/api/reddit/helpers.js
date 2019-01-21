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

  getBody(posts, recieved) {
    let post = this.grabPost(posts);
    let response = `${post.title} \n ${post.selftext}`;

    recieved.channel.send(response);
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