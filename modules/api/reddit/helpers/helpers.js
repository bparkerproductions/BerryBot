const embed = require('discord-embed-maker');

const Helpers = require('../../../helpers/helpers.js');
const search = require("./search.js");
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
    "body": "getBodyOnly",
    "linkbody": "getLinkBody",
    "music": "getLinkBody",
    "question": "getTitle"
  },

  postLimit: 200,
  filterCount: 0,
  filterLimit: 20,

  mapTypeOfReddit(arguments, recieved, typeObj, type) {
    let subReddit = arguments[0];
    this.filterCount = 0;

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab post
        this.chooseFetchType(arguments, recieved, item.subreddit, type);
      }
    });
  },

  chooseFetchType(arguments, recieved, subreddit, type) {
    if(arguments[1] !== undefined) {
      this.getResult(arguments, recieved, subreddit, type);
    }
    else if(type=='music') {
      this.getHot(arguments, recieved, subreddit, type);
    }
    else {
      this.getTop(arguments, recieved, subreddit, type);
    }
  },

  selectTime() {
    let times = ['week','month','year','all'];
    let selected = times[Helpers.generateRandom(times.length)];
    console.log(`Time selected: ${selected}`);
    return selected;
  },

  getTop(arguments, recieved, subreddit, type) {
    reddit.getSubreddit(subreddit)
    .getTop({
      limit: this.postLimit,
      time: this.selectTime()
    })
    .then( posts => {
      this.mapPostGetter(type, posts, recieved);
    });
  },

  getHot(arguments, recieved, subreddit, type) {
    reddit.getSubreddit(subreddit)
    .getHot({
      limit: this.postLimit,
      time: this.selectTime()
    })
    .then( posts => {
      this.mapPostGetter(type, posts, recieved);
    });
  },

  getResult(arguments, recieved, subreddit, type) {
    let query = Helpers.getSentence(arguments, 1).replace(/\"/g, "");
    let searchResult = search.media(arguments[1], subreddit);

    searchResult.then( result => {
      if(!result.length) {
        recieved.channel.send(`Sorry, ${query} didn't bring up any results`);
      }
      this.mapPostGetter(type, result, recieved);
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
      this.filterCount++;

      if(this.filterCount < this.filterLimit) {
        this.postWrap(func, type, posts, recieved);
      }
      else {
        recieved.channel.send('Filters were not passed.. no result sorry');
      }
    }
  },

  grabPost(posts) {
    let postIndex = Helpers.generateRandom(posts.length);
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

  getBodyOnly(post, recieved) {
    recieved.channel.send(`${post.selftext}`);
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