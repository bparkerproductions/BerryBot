const axios = require("axios");

module.exports = {
  getQuote(arguments, recieved) {
    axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json")
    .then( res => {
      let author = res.data.quoteAuthor;
      let text = res.data.quoteText;

      recieved.channel.send(`"${text}" **- ${author}**`);
    })
  }
}