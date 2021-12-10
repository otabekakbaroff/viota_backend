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
        Messages.myMessages(from,to).then(message=>{
                res.json(message)
        })
        .catch(error=>{
            res.status(404).json({error_message:'one or both users not found'})
            console.log(error)
        })
})



module.exports = router;