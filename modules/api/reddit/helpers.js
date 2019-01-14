const snoowrap = require("snoowrap");
const auth = require("./../../../auth.json");
const Helpers = require('../../helpers/helpers.js');
const reddits = require("./../../../data/redditsMap.json");

//init reddit instance
const reddit = new snoowrap({
  userAgent: "Berry bot with Node.js snoo wrapper by /u/fetal_sacrifice",
  clientSecret: auth.redditSecret,
  clientId: auth.redditId,
  username: auth.redditUser,
  password: auth.redditPass
});

module.exports = {
  mapTypeOfReddit(arguments, recieved, typeObj, type=false) {
    let subReddit = arguments[0];

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab question
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
          this.getLink(arguments, recieved, item.subreddit, false, false)
        }
      }
    });
  },

  getTitle(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index

      //send out response
      recieved.channel.send(question.title);
    });
  },

  getBody(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index

      response = `${question.title} \n ${question.selftext}`;

      //send out response
      recieved.channel.send(response);
    });
  },

  musicFilter(url) {
    //we don't want self reddit posts to be returned for music
    return url.includes('youtube.com') || 
           url.includes('spotify');
  },

  urlFilter(url) {
    return !url.includes('reddit') && !url.includes("redd.it");
  },

  selectFilter(filter, question) {
    if(filter == "music") {
      return this.musicFilter(question.url)
    }
    else {
      return this.urlFilter(question.url);
    }
  },

  getLink(arguments, recieved, subreddit, filter='url', title=true) {
    reddit.getSubreddit(subreddit)
    .getRandomSubmission()
    .then( posts => {
      let question = posts.toJSON(); //choose a question by index
      let filterRule = this.selectFilter(filter, question);
      let postTitle = title == true ? question.title : "";

      //if its not a reddit link, break loop
      if(filterRule) {
        response = `${postTitle} \n ${question.url}`;

        //send out response
        recieved.channel.send(response);
      }
      else {
        this.getLink(arguments, recieved, subreddit, filter, title);
      }
    });
  },

  redditHelp(arguments, recieved) {
    let helpCommand = arguments[0];
    let textPrompt = `Commands for: **${helpCommand}**\n`;
    let redditObj = reddits[helpCommand];

    redditObj.forEach((item) => {
      textPrompt+=`${item.arg}, `;
    });

    recieved.channel.send(textPrompt);
  }
}