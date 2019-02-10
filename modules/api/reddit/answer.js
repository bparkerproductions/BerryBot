const reddit = require('./../../../reddit.js');
const helpers = require("./../../helpers/helpers");
const rhelpers = require("./helpers/helpers");
const search = require("./helpers/search");

module.exports = {
  ask(arguments, recieved) {
    let query = helpers.getSentence(arguments, 0);
    let result = search.media(query, 'AskReddit');
    
    result.then( res => {
      let post = rhelpers.grabPost(res);
      
      if(post.num_comments) {
        this.getComment(post.id, recieved);
      }
      else {
        console.log("no comments");
      }
    });
  },

  getComment(postID, recieved) {
    reddit.getSubmission(postID)
    .comments
    .then( results => {
      let comment = rhelpers.grabPost(results); //grabs random comment

      let parentID = comment.parent_id;

      reddit.getComment(parentID).fetch().then(comment => {
        console.log(comment.body);
      });

      //send off body
      recieved.channel.send(comment.body);
    })
  }
}