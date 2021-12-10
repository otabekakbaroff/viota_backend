require('dotenv').config();
const server = require('./server.js')
const http = require('http');
const port = process.env.PORT;
const app = http.createServer(server);
const io = require('socket.io')(app,{
    cors:{
        origin:'https://viota.netlify.app',
        methods: ["GET", "POST", "PUT"]
    }
})
const Messages = require('./messages/message_model')
const Users = require('./users/users_model')





let userHash_socketId = {}


io.on("connection", function(socket){
    console.log(`connected id: ${socket.id}`)
    // Getting user's username and combining it into username:socket.id object
    socket.on('user-info', data=>{// data -> username
        userHash_socketId = {...userHash_socketId, [data]:socket.id}
        io.to(socket.id).emit('confirm', 'successful connection...')
    })

    //Disconnect
    socket.on('disconnect', () => {
        console.log(`disconnected id: ${socket.id}`)
    });


    // user search
    socket.on('user-search',(data) =>{//data -> {username: username, receiver: receiverUsername}
            if(data.username && data.receiver){//username needed to explude itself from the search
                Users.searchUser(data).then(users =>{
                    io.to(socket.id).emit('user-search', users)
                })
                .catch(error=>{
                    console.log(error)
                    io.to(socket.id).emit('user-search','error')
                })
            }
            else{
                io.to(socket.id).emit('user-search','error')
            }
    })

    //Send message
    socket.on('private-message', data=>{ // {"message": "some message here", "from": "user_one","to": "user_two", "date": 1234567}
        console.log(data)
        if(data.message && data.from && data.to && data.date ){//checking if all the information required are passed by the client-side
                    Messages.sendMessage({from:data.from,to:data.to,message:data.message, date:data.date}).then(messages=>{
                        console.log(messages)
                    })
                    .catch(error=>{
                            console.log(error)
                    })
                    io.to(userHash_socketId[data.to]).emit('private-message', {from:data.from,to:data.to,message:data.message, date:data.date})
        }else{
            io.to(socket.id).emit('error','failed to send message')
    }
  })
})

app.listen(port, () => console.log(`Server running on port ${port}`))





