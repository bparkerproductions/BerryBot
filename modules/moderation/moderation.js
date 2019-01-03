module.exports = {
  init(command, message, arguments) {
    switch(command) {
      case "contain":
        this.contain(arguments, message);
        break;
    }
  },
  contain(arguments, message) {
    message.channel.send('contained called');
  }
}