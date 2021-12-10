const db = require('../db/dbconfig')


module.exports = {
  getAllUsers,
	findUser,
  addUser,
  searchUser,
  usersExist,
  update_user,
  searchNoneFriends
}


function getAllUsers(){
	return  db('users')
}


function searchNoneFriends(){
  return db('users')
    .fullOuterJoin('connection', 'connection.from','users.username')
    .where('connection.from', '<>', 'Otabek')
    .andWhere('connection.to', '<>', 'Otabek')
    .orWhere('connection.from', null)
    .distinct('users.username','connection.from','connection.to')
    // .distinct('users.username')
}


function findUser(filter){
	return  db('users').where(filter);
}

function usersExist(from,to){
  return db('users')
  .where(from)
  .orWhere(to)
  
}


function searchUser(filter){
  return  db('users')
  .where('users.username', "<>", `${filter.username}`)
  .andWhere('users.username',"like", `${filter.receiver}%`)
  .select('users.username')
}



function addUser(user) {
    return db('users')
      .insert(user)
      .then(id =>{
         return {username:user.username}
    });
}


function update_user(username,chatted_last) {
  return db("users")
    .where({username})
    .update({chatted_last})
    .then(result=>{
        return {success:'pass'}
  })
}