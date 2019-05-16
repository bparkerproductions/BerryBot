module.exports = {
  init(command, message, arguments) {
    if(command == 'rule' || command == 'r') {
      message.channel.send('rules init');
    }
  }
}