const router = require('express').Router();
const Messages = require('./message_model')
const Users = require('../users/users_model')



router.get("/all", (req, res) => {
    Messages.getAll()
      .then(user => {
        res.json(user)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error_message:'Invalid Credentials'});
      });
});



router.post("/my-messages",(req,res)=>{
    const {from, to} = req.body
    Users.usersExist({username:[from]} ,{username:[to]}).then(user=>{
        if(user.length === 2){
            Messages.myMessages(from,to).then(message=>{
                res.json(message)
            })
            .catch(error=>{
                console.log(error)
            })
           
        }else{
            res.status(404).json({error_message:'one or both users not found'})
        }
    }).catch(error=>{
        console.log(error)
        res.status(404).json({error:'user doesn\'nt exist'})
    })
})



module.exports = router;