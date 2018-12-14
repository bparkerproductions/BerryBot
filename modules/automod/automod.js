const Config = require("./../../data/config.json");

module.exports = {
  init(message) {
    if(message.channel.name == "❥bot-test") {
      this.filterLetters(message);
    }
  },

  filterLetters(message) {
    let limit = Config.automod.charlimit;
    let regex = new RegExp(`(.)\\1{${limit},}`, "g");
    if(message.content.match(regex)) {
      message.delete(50);
    }
  }
}