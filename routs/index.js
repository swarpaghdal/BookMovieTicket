const express = require('express')

const usercontroler = require('../controler/usercontroler');
const { use } = require('passport');
const passport = require('passport');

const routs = express.Router();

routs.get('/',passport.checkAuth,usercontroler.findex)

routs.get('/moviedatail/:id',passport.checkAuth,usercontroler.moviedatail)

routs.get('/moviebook/:id',passport.checkAuth,usercontroler.moviebook)

routs.use('/admin',require('./admin'))

routs.get('/login',usercontroler.login)
routs.get('/register',usercontroler.register);

routs.get('/ticketBook/:id',passport.checkAuth,usercontroler.ticketBook);

routs.post('/seatBooking',passport.checkAuth,usercontroler.seatBooking)

routs.post('/userregister',passport.checkAuth,usercontroler.userregister)

routs.post('/userlogin', passport.authenticate('user-rule', {failureRedirect:'/login'}) ,usercontroler.userlogin)

routs.get('/userLogout', usercontroler.userLogout)



module.exports = routs