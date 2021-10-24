require('dotenv').config();
const server = require('./server.js')
const http = require('http');
const port = process.env.PORT;
const app = http.createServer(server);
const io = require('socket.io')(app)
const Messages = require('./messages/message_model')
const Users = require('./users/users_model')
const Connections = require('./connection/connections-model');
// const crypto = require('crypto');




let activeConnections = new Set()

let userHash_socketId = {}


io.on("connection", function(socket){
    console.log(`connected id: ${socket.id}`)
    //Login
    socket.on('user-info', function(data){
        console.log(data)
        // let hash = crypto.createHash('md5').update(data).digest("hex")
        activeConnections.add(socket.id)
        userHash_socketId = {...userHash_socketId, [data]:socket.id}
        io.to(socket.id).emit('confirm', 'successful connection...')
    })


    //Disconnect
    socket.on('disconnect', () => {
        console.log(`disconnected id: ${socket.id}`)
        activeConnections.delete(socket.id)
    });

    socket.on('user-search',(data) =>{
            Users.searchUser(data).then(users =>{
                io.to(socket.id).emit('user-search', users)
            })
            .catch(error=>{
                console.log(error)
                io.to(socket.id).emit('user-search','error')
            })
    })

    //Send message
    socket.on('private', function(data){
        console.log(data)
        if(data.message && data.username && data.receiver_username && data.date ){
            console.log({userOne:data.username,userTwo:data.receiver_username})
            Connections.checkFriendship(data.username,data.receiver_username).then(user=>{
                if(user.length !==0){
                    Messages.sendMessage({from:data.username,to:data.receiver_username,message:data.message, date:data.date}).then(messages=>{
                        console.log(messages)
                    })
                    .catch(error=>{
                            console.log(error)
                    })
                    io.to(userHash_socketId[data.receiver_username]).emit('private', {username:data.username, message:data.message})
                }
            })
        }else{
            io.to(socket.id).emit('error','failed to send message')
    }
  })
})

app.listen(port, () => console.log(`Server running on port ${port}`))





