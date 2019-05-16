const Purge = require('./purge');
const Rules = require('./rules');

module.exports = {
  purgeLimit: 50,
  init(command, message, arguments) {
    Purge.init(command, message, arguments);
    Rules.init(command, message, arguments);
  },
}