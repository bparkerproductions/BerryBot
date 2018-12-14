const axios = require("axios");

module.exports = {
  getQuote(arguments, recieved) {
    let quoteEndpoint = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    axios.get(quoteEndpoint)
    .then( res => {
      let author = res.data.quoteAuthor;
      let text = res.data.quoteText;

      //send it
      recieved.channel.send(`"${text}" **- ${author}**`);
    })
  }
}