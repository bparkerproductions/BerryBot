const reddit = require('./../../../reddit.js');
const helpers = require("./../../helpers/helpers");
const rhelpers = require("./helpers/helpers");
const search = require("./helpers/search");

module.exports = {
  ask(arguments, recieved) {
    this.getCommentPost(arguments, recieved, "AskReddit");
  },

  chat(arguments, recieved) {
    this.getCommentPost(arguments, recieved, 'CasualConversation');
  },

  getCommentPost(arguments, recieved, subreddit) {
    let query = helpers.getSentence(arguments, 0);
    let result = search.media(query, subreddit);

    result.then( res => {
      let post = rhelpers.grabPost(res);

      if(post == undefined) {
        recieved.channel.send("I dunno");
        return;
      }
      
      if(post.num_comments) {
        this.getComment(post.id, recieved);
      }
      else {
        //no comments, try another post
        console.log("no comments");
        this.getCommentPost(arguments, recieved, subreddit);
      }
    });
  },

  getComment(postID, recieved) {
    reddit.getSubmission(postID)
    .comments
    .then( results => {
      let comment = rhelpers.grabPost(results); //grabs random comment

      if(comment.body == "[removed]" || comment.body == "[deleted]") {
        //not a good response, call again
        console.log("Comment was removed... trying again");
        this.getComment(postID, recieved);
        return;
      }

      recieved.channel.send(comment.body);
    })
  }
}