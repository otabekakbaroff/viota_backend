const db = require('../db/dbconfig')


module.exports = {
    sendMessage,
    myMessages,
    getAll
}

function getAll(){
  return db('messages')
}

//privateMessage
function myMessages(sender,receiver){
  return  db('messages')
    .where("messages.from", sender)
    .andWhere("messages.to", receiver)
    .orWhere("messages.from",receiver)
    .andWhere("messages.to", sender)
    .orderBy("messages.date");
}


function sendMessage(message) {
    return db('messages')
      .insert(message)
      .then(id => id);
}
