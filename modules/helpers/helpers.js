module.exports = {
  getSentence(args, splitArg=1) {
    //take multiple args, and convert them into a single sentence
    return args.slice(splitArg, args.length).join(" ");
  },

  validateDigits(message) {
    //validate that a string is digits
    return message.match(/^\d+$/) ? message : false;
  },

  generateRandom(num) {
    //return a random number from 0 to num
    return Math.floor(Math.random()*num); randomNumber;
  },

  truncate(str, wordAmount) {
    return str.split(" ").splice(0, wordAmount).join(" ");
  },
}