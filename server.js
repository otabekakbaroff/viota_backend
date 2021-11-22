const cors=require('cors');

const helmet=require('helmet');

const express = require('express');

const server = express();

const restrict = require('./middleware/restrict')

const users=require('./users/users_router');

const messages = require('./messages/messages_router')

const connections = require('./connection/connection-router')

server.use(express.json());

server.use(cors());

server.use(helmet());

server.use('/api/messages', /*restrict,*/ messages);

server.use('/api/users', users);

server.use('/api/connections', /*restrict,*/ connections);

server.use(express.static("public"));


server.get('/', (req,res)=>{
    res.json({ Message:`*** SERVER IS UP AND RUNNING ***` })
})



module.exports = server;
