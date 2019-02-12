const reddit = require('./../../../reddit.js');
const helpers = require("./../../helpers/helpers");
const rhelpers = require("./helpers/helpers");
const search = require("./helpers/search");
const filters = require("./filters");

module.exports = {
  filterLimit: 10,
  currentTries: 0,

  ask(arguments, recieved) {
    this.getCommentPost(arguments, recieved, "AskReddit");
  },

  chat(arguments, recieved) {
    this.getCommentPost(arguments, recieved, 'CasualConversation');
  },

  getCommentPost(arguments, recieved, subreddit) {
    let query = helpers.getSentence(arguments, 0);
    let result = search.media(query, subreddit);
    this.currentTries = 0;

    result.then( res => {
      let post = rhelpers.grabPost(res);

      if(post == undefined) {
        recieved.channel.send("I dunno");
        return;
      }
      
      if(post.num_comments) {
        this.getComment(post.id, recieved, arguments, subreddit);
      }
      else {
        //no comments, try another post
        console.log("no comments");
        this.getCommentPost(arguments, recieved, subreddit);
      }
    });
  },

  sanatizeComment(comment) {
    let stripped = comment.trim().replace(/\s\s+/g, ' ');

    return stripped.split(" ").filter( word => {
      return !word.includes("&#");
    }).join(" ");
  },

  getComment(postID, recieved, arguments, subreddit) {
    reddit.getSubmission(postID)
    .comments
    .then( results => {
      let comment = rhelpers.grabPost(results); //grabs random comment
      let commentFilt = filters.commentFilter(comment.body);
      let commentLen = comment.body.length > 200 && comment.body.length < 10;

      if(this.currentTries > this.filters) {
        console.log('comment filterings not passed... trying different post');
        this.getCommentPost(arguments, recieved, subreddit);
      }

      if(!commentFilt || commentLen) {
        //not a good response, call again
        this.currentTries++;
        console.log("Comment was removed... trying again");
        this.getComment(postID, recieved);
        return;
      }

      //santize then send
      let response = this.sanatizeComment(comment.body);
      recieved.channel.send(response);
    })
  }
}