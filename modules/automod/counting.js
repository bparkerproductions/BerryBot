module.exports = {
  checkMatch(recentNum, num) {
    //first check if recent num has been set
    if(recentNum !== undefined) {
      return num+1 == recentNum ? true : false;
    }
  },

  deleteRecent(messages, message) {
    let id = messages.first();
    message.channel.fetchMessage(id).then( mess => {
      mess.delete();
    })
  },

  countingMod(message) {
    let test = message.channel.fetchMessages({limit: 3});

    test.then( messages => {
      let recentNum, userLimit;
      let userBy = [];

      messages.forEach( elem => {
        let content = parseInt(elem.content.replace(" ",""));
        let matched = this.checkMatch(recentNum, content);

        userBy.push(elem.author.username); //push recent users

        if(matched !== undefined) {
          matched ? "" : this.deleteRecent(messages, message);
        }

        recentNum = content;
      });

      //enforce 3 consecutive rule
      if(userBy.every( (val, i, arr) => val === arr[0] )) {
        this.deleteRecent(messages, message);
      }
    })
  }
}
