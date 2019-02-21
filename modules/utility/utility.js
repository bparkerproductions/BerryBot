const Perms = require("./../helpers/perms");
const Helpers = require("./../helpers/helpers");

module.exports = {
  purgeLimit: 100,
  init(command, message, arguments) {
    if(command == "prune" && Perms.isStaff(message)) {
      this.pruneMessages(arguments, message);
    }
  },

  pruneMessages(arguments, message) {
    let amount = parseInt(arguments[0])+1;
    let messages = message.channel.fetchMessages({limit: amount});
    let bulkDelete = arguments[1] !== undefined ? false : true;

    //if it passes conditions, delete messages
    if(amount > 0 && amount <= this.purgeLimit+1) {
      messages.then( msg => {
        bulkDelete ? 
        message.channel.bulkDelete(msg) : //if bulk delete on, delete all
        this.bulkInstance(msg, arguments); //else run an instance search
      })
    }
    else {
      let errorMsg = `Sorry, can't prune ${amount-1} messages. The current limit is ${this.purgeLimit} messages`;
      message.channel.send(errorMsg).then( msg => {
        msg.delete(2000);
      });
    }
  },
  bulkInstance(message, arguments) {
    let phrase = Helpers.getSentence(arguments, 1).toLowerCase();

    message.forEach( msg => {
      let content = msg.content.toLowerCase()
      if(content.includes(phrase)) {
        msg.delete();
      }
    })
  }
}