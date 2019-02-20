const Perms = require("./../helpers/perms.js");

module.exports = {
  purgeLimit: 10,
  init(command, message, arguments) {
    if(command == "prune") {
      if(Perms.isStaff(message)) {
        this.pruneMessages(arguments, message);
      }
    }
  },

  pruneMessages(arguments, message) {
    let amount = parseInt(arguments[0])+1;
    let messages = message.channel.fetchMessages({limit: amount});

    //if it passes conditions, delete messages
    if(amount > 0 && amount <= this.purgeLimit+1) {
      messages.then( msg => {
        message.channel.bulkDelete(msg);
      })
    }
    else {
      let errorMsg = `Sorry, can't prune ${amount-1} messages. The current limit is ${this.purgeLimit} messages`;
      message.channel.send(errorMsg).then( msg => {
        msg.delete(2000);
      });
    }
  }
}