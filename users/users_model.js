const db = require('../db/dbconfig')


module.exports = {
  getAll,
	findUser,
  addUser,
  searchUser,
  update_user,
  searchNoneFriends
}


function getAll(){
	return  db('users')
}


function searchNoneFriends(){
  return db('users')
    .fullOuterJoin('connection', 'connection.from','users.username')
    .where('connection.from', '<>', 'Otabek')
    .andWhere('connection.to', '<>', 'Otabek')
    .orWhere('connection.from', null)
    .orWhere('connection.to', null)
    .select('users.username','connection.from','connection.to')
    // .distinct('users.username','connection.from','connection.to')
    // .distinct('users.username')
}


function findUser(filter){
	return  db('users').where(filter);
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