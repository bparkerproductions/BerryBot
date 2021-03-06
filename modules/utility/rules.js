const rules = require('./../../data/rules.json');

module.exports = {
  init(command, message, arguments) {
    if(command == 'rules' || command == 'rule') {
      if(arguments[0] == 'list') this.listAll(message);
      else if(arguments[0] == 'options') this.listOptions(message);
      else this.showRule(message, arguments);
    }
  },
  listAll(message) {
    let listAll = rules.map(rule => {
      return this.format(rule);
    }).join('');

    message.channel.send(listAll);
  },
  searchRule(term) {
    for(let i=0; i<rules.length; i++) {
      if(rules[i].rule == term) return rules[i];
    }

    return false;
  },
  showRule(message, arguments) {
    let rule;

    //get the rule by string search or index
    let isTerm = isNaN(parseInt(arguments[0]))
    if(isTerm) rule = this.searchRule(arguments[0]);
    else rule = rules[arguments[0]-1];

    //get correct formatting then send
    if(rule !== undefined && rule !== false) {
      message.channel.send(this.format(rule));
    }
    else {
      let warning = `rule ${arguments[0]} doesn\'t exist.\n`;
      message.channel.send(warning).then(msg => msg.delete(2000));
      this.listOptions(message);
    }
  },
  format(rule) {
    return `**${rule.title}**\`\`\`${rule.description}\`\`\`\n`;
  },
  listOptions(message) {
    let tags = rules.map(e => e.rule ).join(', ');

    message.channel.send(`You can search through ${rules.length} rules.\n` +
    `You can also search by: ${tags}`).then(msg => {
      msg.delete(20000);
    });
  }
}