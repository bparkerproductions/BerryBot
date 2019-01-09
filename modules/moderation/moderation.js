module.exports = {
  init(command, message, arguments) {
    switch(command) {
      case "lock":
        this.lock(arguments, message);
        break;

      case "contain":
        this.contain(arguments, message);
        break;
    }
  },
  lock(arguments, message) {
    let user = arguments[0];

    let lockedRole = message.guild.roles.find(role => role.name === "Locked");
    console.log(lockedRole);
  },

  contain(arguments, message) {
    message.channel.send('contain called');
  }
}