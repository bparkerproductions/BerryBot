const Helpers = require('./../helpers/helpers.js');
const config = require('./../../data/config.json');

module.exports = {
  activate(arguments, received) {
    console.log('activate')
    let amount = arguments[0]; //amount to repeat
    let message = Helpers.getSentence(arguments); // convert rest of args into a sentence
    let chainLimit = config.chain.limit;
    let passed = this.checkChain(amount, chainLimit, received);

    //if its allowed, start chain
    if(passed) {
      this.sendChain(received, message, amount);
    }
  },

  checkChain(amount, chainLimit, received) {
    if(received.channel.name !== "❥berry-bot") {
      received.channel.send(`The chain command is not allowed in this channel`);
      return false;
    }

    if(amount > chainLimit ) {
      received.channel.send(`chaining is limited to ${chainLimit} uses for this channel`);
      return false;
    }

    return true; // return true only if tests pass
  },

  sendChain(received, message, amount) {
    for(let i=0; i<amount; i++) {
      setTimeout(() => {
        received.channel.send(message);
      }, 500);
    }
  }
}