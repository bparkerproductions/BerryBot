const channels = require('./../../data/channels.json');

module.exports = {
  welcome(incoming) {
    let { username } = incoming.user;

    incoming.guild.channels.get(channels.main).send(
      `:crescent_moon: :crescent_moon:   Hello and welcome **${username}**!   :crescent_moon: :crescent_moon: \n\n**Welcome to the cosmos!** \n :waning_crescent_moon:  To get a role, you can head over to the <#${channels.roles}> channel.\n :waning_crescent_moon:  Partering info and rules can be found at <#${channels.rulesInfo}>.\n We look forward to having you!`
    );
  }
}