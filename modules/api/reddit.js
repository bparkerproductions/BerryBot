const auth = require("./../../auth.json");
const Helpers = require('../helpers/helpers.js');
const snoowrap = require("snoowrap");
const reddits = require("./../../data/redditsMap.json");

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
    else if(command == "ideaHelp" || "ih") {
      this.questionHelp(arguments, message, ideas, "idea");
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

  askQuestion(arguments, recieved, subreddit) {
    reddit.getSubreddit(subreddit)
    .getHot({'limit': 100})
    .then( posts => {
      let questionIndex = Helpers.generateRandom(100);
      let question = posts.toJSON()[questionIndex]; //choose a question by index
      recieved.channel.send(question.title);
    });
  },

  questionHelp(arguments, recieved, subreddit, title) {
    let textPrompt = `\`b!${title} <type> \`\n **Types:   **`;

    subreddit.forEach((item) => {
      textPrompt+=`${item.arg}, `;
    });

    recieved.channel.send(textPrompt);
  }
}