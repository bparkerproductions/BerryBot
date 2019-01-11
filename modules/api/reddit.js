const auth = require("./../../auth.json");
const Helpers = require('../helpers/helpers.js');
const snoowrap = require("snoowrap");
const reddits = require("./../../data/redditsMap.json");
const fs = require("fs");

//init reddit instance
const reddit = new snoowrap({
  userAgent: "Berry bot with Node.js snoo wrapper by /u/fetal_sacrifice",
  clientSecret: auth.redditSecret,
  clientId: auth.redditId,
  username: auth.redditUser,
  password: auth.redditPass
});

module.exports = {
  init(command, message, arguments) {
    let questions = reddits.questionReddits;
    let ideas = reddits.ideaReddits;

    if(command == "question" || command == "q") {
      this.mapTypeOfReddit(arguments, message, questions);  
    }
    else if(command == "questionHelp" || command == "qh") {
      this.questionHelp(arguments, message, questions, "question");
    }
    else if(command == "idea" || command == "i") {
      this.mapTypeOfReddit(arguments, message, ideas);
    }
    else if(command == "ideaHelp" || command == "ih") {
      this.questionHelp(arguments, message, ideas, "idea");
    }
    else if(command == "questionRepeat" || command == "qr") {
      this.questionRepeat(arguments, message);
    }
  },
    

  mapTypeOfReddit(arguments, recieved, typeObj) {
    let subReddit = arguments[0];

    typeObj.forEach((item) => {
      if(item.arg == subReddit) {
        //if the arg matches a config option, grab question
        this.askQuestion(arguments, recieved, item.subreddit);
      }
    });
  },

  questionFilter(question) {
    return !question.title.toLowerCase().includes("reddit");
  },

  storeQuestion(question) {   
      //set it in the file
      reddits.recentQuestion.question = question;

      //write it to the file
      fs.writeFile('data/redditsMap.json', JSON.stringify(reddits, null, 2), (err) => {
        if(err) return console.log(err);
      });
  },

  askQuestion(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( (posts, resolve) => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index

      recieved.channel.send(question.title).then(question => {
        this.storeQuestion(question.content); //write it to file
      })
    });
  },

  questionRepeat(arguments, recieved) {
    recieved.channel.send(reddits.recentQuestion.question);
  },

  questionHelp(arguments, recieved, subreddit, title) {
    let textPrompt = `\`b!${title} <type> \`\n **Types:   **`;

    subreddit.forEach((item) => {
      textPrompt+=`${item.arg}, `;
    });

    recieved.channel.send(textPrompt);
  }
}