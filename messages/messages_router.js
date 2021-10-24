const router = require('express').Router();
const Messages = require('./message_model')
const Users = require('../users/users_model')


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
            res.json({error_message:'one or both users not found'})
        }
    }).catch(error=>{
        console.log(error)
        res.json({error:'error'})
    })
})



module.exports = router;