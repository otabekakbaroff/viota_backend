const db = require('../db/dbconfig')


module.exports = {
  getAll,
	findUser,
  addUser,
  searchUser,
  update_user,
}


function getAll(){
	return  db('users')
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