module.exports = {
  userMessageCount(arguments, recieved, client) {
    let id = recieved.author.id;
    console.log(client.users.get(id))
  }
}