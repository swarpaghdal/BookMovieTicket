const express = require('express')

const passport = require('passport')

const moviemodel = require('../model/moviemodel')

const adminmodel = require('../model/adminmodel')

const routs = express.Router();

const admincontroler = require('../controler/admincontroler')



routs.get('/',passport.checkAuthentication,admincontroler.index)

routs.get('/addadmin',passport.checkAuthentication,admincontroler.addadmin)
routs.get('/viewadmin',passport.checkAuthentication,admincontroler.viewadmin)

routs.get('/adminlogin',admincontroler.adminlogin)
routs.get('/adminregister',admincontroler.adminregister) 

routs.get('/logout', admincontroler.logout)

routs.get('/addmovie',passport.checkAuthentication,admincontroler.addmovie)
routs.post('/addmoviee',passport.checkAuthentication,moviemodel.uplodemultiimage,admincontroler.addmoviee)
routs.get('/viewmovie',passport.checkAuthentication,admincontroler.viewmovie)



routs.post('/insertadmin',passport.checkAuthentication,adminmodel.uplodephoto,admincontroler.insertadmin)

routs.post('/adminloginpage',passport.authenticate('admin',{failureRedirect:'/admin/adminlogin'}),admincontroler.adminloginpage)
routs.post('/register',admincontroler.register);

routs.get('/addMall',passport.checkAuthentication, admincontroler.addMall);

routs.post('/addMallinsert',passport.checkAuthentication, admincontroler.addMallinsert);

routs.get('/addMovieinmall',passport.checkAuthentication, admincontroler.addMovieinmall);

routs.post('/addMovieinMallinsert',passport.checkAuthentication, admincontroler.addMovieinMallinsert);

routs.get('/addShow',passport.checkAuthentication,admincontroler.addShow);

routs.post('/moviedetailonshow',passport.checkAuthentication,admincontroler.moviedetailonshow);

routs.post('/addMovieShowinsert',passport.checkAuthentication,admincontroler.addMovieShowinsert);

module.exports = routs

