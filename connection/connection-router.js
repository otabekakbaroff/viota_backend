const router = require('express').Router();
const Connections = require('./connections-model');
const Users = require('../users/users_model')



router.post('/check-friendship', (req,res)=>{
    const {userOne,userTwo} = req.body
    console.log(userOne,userTwo)
    Connections.checkFriendship(userOne,userTwo).then(user=>{
        if(user.length !==0){
            res.json({Confirm: true})
        }else{
            res.json({Reject: false})
        }
    })
    .catch(error=>{
        console.log(error)
    })
})



// get all friends 
router.get('/:username/friends-list', (req,res)=>{
    const {username} = req.params
    Connections.friendsList(username).then(friends=>{
        res.json(friends)
    })
    .catch(error=>{
        console.log(error)
    })
})


router.post('/userExistsCheck',(req,res)=>{
    const {from , to} = req.body
    Users.usersExist(from ,to).then(user=>{
        res.json(user)
    }).catch(error=>{
        res.json(error)
    })
})


// send friend requests
router.post('/send-friend-request', (req,res)=>{
    const {from , to} = req.body
    Users.usersExist({username:[from]} ,{username:[to]})
    .then(user=>{
        if(user.length === 2){
            Connections.send_friendRequest({from:[from],to:[to]}).then(user=>{
                res.json(user)
            })
            .catch(error=>{
                res.json({error_message:"friend-request was already sent"})
                console.log(error)
            })
        }else{
            console.log(user)
            res.json({error_message:'one or both users not found'})
        }
    }).catch(error=>{
        console.log(error)
    })
})

// find friend requests 
router.post('/friend-requests', (req,res)=>{
    const {username} = req.body
    Connections.friendRequests(username).then(user=>{
        res.json(user)
    })
    .catch(error=>{
        console.log(error)
    })
})

// accept or deny requests ( can be also used to unfriend people)
router.put('/request-reply', (req,res)=>{
    // from you to the user you accepted the request from
    const  {id,from,to,status} = req.body
    if(status>2 || status<0){
        res.json({error:'status 2 for accepted or 1 for denial'})
    }else if(status === 2){
        if(from && to){
            Connections.send_friendRequest({from:[from],to:[to],status:[status]})
            .catch(error=>{
                res.json({response:'already accepted'})
                console.log(error)
            })
            Connections.request_reply(id, {status:[status]}).then(user=>{
                res.json(user)
            })
            .catch(error=>{
                console.log(error)
            })
        }else{
            res.json({error_message:'who are you and who are you adding? {from:you, to:someone, status: 2}'})
        }
    }else{
        Connections.request_reply(id, {status:[status]}).then(user=>{
            res.json(user)
        })
        .catch(error=>{
            console.log(error)
        })
    }
})



module.exports = router