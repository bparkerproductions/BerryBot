const Helpers = require('./../helpers/helpers.js');

module.exports = {
  spell(arguments, received) {
    let input = Helpers.getSentence(arguments, 0);
    let words = input.split(" ");
    let finalOutput = this.generateRegional(words);

    if(finalOutput.length > 2000) {
      received.channel.send(finalOutput.substring(1,2000));
    }
    else {
      received.channel.send(finalOutput);
    }
  },
  generateRegional(words) {
    let finalOutput = "";

    words.forEach( word => {
      finalOutput+="   ";
      word.split('').forEach( letter => {
        if(letter.match(/[a-z]/i)) {
          let regional = `:regional_indicator_${letter}:`;
          finalOutput+=regional.toLowerCase();
        }
      });
    });

    return finalOutput;
  },
  expand(arguments, received) {
    let finalOutput = "";
    let amount = parseInt(arguments[0]);
    let text = Helpers.getSentence(arguments, 1);
    console.log(text);

    finalOutput+=`${text} `.repeat(amount);
    
    if(finalOutput.length > 2000 ) {
      received.channel.send(finalOutput.substring(1,2000));
    }
    else {
      received.channel.send(finalOutput);
    }
  }
}