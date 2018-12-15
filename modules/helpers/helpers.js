module.exports = {
  getSentence(args, splitArg=1) {
    //take multiple args, and convert them into a single sentence
    return args.slice(splitArg, args.length).join(" ");
  },

  validateDigits(message) {
    return message.match(/^\d+$/) ? message : false;
  }
}