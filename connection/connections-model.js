const db = require('../db/dbconfig')


module.exports = {
    friendsList,
    friendRequests,
    send_friendRequest,
    request_reply,
    checkFriendship,
    getAll
}


function getAll(){
    return db('connection')
}

function friendsList(user){
    return db('connection')
    .where('connection.to', user)
    .andWhere('connection.status', 2)
    .select('connection.from as username' )
}




function checkFriendship(userOne,userTwo){
    return db('connection')
    .where('connection.from', userOne)
    .andWhere('connection.to',userTwo)
    .andWhere('connection.status', 2)
}


function send_friendRequest(request){
    return db('connection')
    .insert(request)
    .then(id=>id);
}

function friendRequests(user){
    return db('connection')
    .where('connection.to',user)
    .andWhere('connection.status', 0)
}

function request_reply(id,reply) {
    return db("connection")
      .where({id})
      .update(reply)
      .then(result=>{    
          return result
    })
}
