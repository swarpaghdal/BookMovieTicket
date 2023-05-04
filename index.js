const express = require('express');

const port = 4001

const server = express();

const db =  require('./config/mongoose');

server.set('view engine','ejs')

server.use(express.static('assets'))

server.use(express.urlencoded())
const passport = require('passport')
const passportadmin = require('./config/passport-admin-local')
const passportuser = require('./config/passport-user-local')
const session = require('express-session');

server.use(new session({
    name:'coocki',
    secret:'abab',
    saveUninitialized: false,
    resave: true,
    cookie:{
        maxAge:60*100*1000000
    }
}))
server.use(passport.initialize())
server.use(passport.session())

server.use('/img', express.static('img'))

server.use('/',require('./routs/index'))

server.listen(port,(err)=>{
    if (err) {
       console.log('server is not running'+err) 
       return false
    }
    console.log('server is running on port'+port)
})