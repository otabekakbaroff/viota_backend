const db = require('../db/dbconfig')


module.exports = {
    friendsList,
    friendRequests,
    send_friendRequest,
    request_reply,
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


function send_friendRequest(request){
    return db('connection')
    .insert(request)
    .then(id=>id);
}



function request_reply(reply) {
    if(reply.status===2){
        send_friendRequest({to:reply.to, from:reply.from, status:reply.status})
    }
    return db("connection")
        .where('connection.from',reply.to)
        .andWhere('connection.to',reply.from)
        .update({from:reply.to,to:reply.from,status:reply.status})
        .then(result=>{    
          return result
    })
}



function friendRequests(user){
    return db('connection')
    .where('connection.to',user)
    .andWhere('connection.status', 0)
}
