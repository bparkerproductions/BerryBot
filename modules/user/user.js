module.exports = {
  init(command, message, arguments, client) {
    switch(command) {
      case "messagecount":
        this.userMessageCount(arguments, message, client);
        break;
    }
  },

  userMessageCount(arguments, recieved, client) {
    let id = recieved.author.id;
    console.log(client.users.get(id))
  }
}