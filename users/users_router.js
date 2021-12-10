const router = require('express').Router();
const Users = require('./users_model')
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');


function generateToken(user){
	const payload = {
		username:user,
	}
	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn:'8h'
	}
	return jwt.sign(payload,secret,options);
}


router.post('/register', (req, res) => {
    const usersInfo = req.body;
    if(usersInfo.username.length < 5 || usersInfo.password.length < 5){
        res.json({error_message:'username, password minimum of 6 characters'})
    }else{
        const hash=bcrypt.hashSync(usersInfo.password, 12);
        usersInfo.password=hash;
        Users.addUser(usersInfo).then(user=>{
            const token=generateToken(user);
            res.status(201).json({ 
                username:user.username,
                token
            });
        }).catch(err=>{
            console.log(err);
            res.status(500).json({error_message:'Post Failed'})
        })  
    }
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    Users.findUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password,user.password)){
        const token=generateToken(user);
        console.log(user)
          res.status(200).json({
              username:user.username,
              token
          });
        }
        else{
            res.status(401).json({error_message: 'Invalid Credentials'})
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error_message:'Invalid Credentials'});
      });
});


router.get("/all", (req, res) => {
    Users.getAll()
      .then(user => {
        res.json(user)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error_message:'Invalid Credentials'});
      });
});


router.post("/search-user", (req, res) => {
  let body = req.body
  Users.searchUser(body)
    .then(user => {
      res.json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error_message:'Invalid Credentials'});
    });
});



router.put("/last-convo",(req,res)=>{
    let { username, chatted_last } = req.body;
    console.log(username,chatted_last)
    Users.update_user(username, chatted_last)
    .then(user=>{
        res.json({success:'pass'})
    }).catch(error=>{
        console.log(error)
        res.json({error:'failed'})
    })
})
  
module.exports = router;
