const Reddit = require('./reddit.js');

module.exports = {
  init(command, message, arguments) {
    //specific API modules
    Reddit.init(command, message, arguments);
  }
}