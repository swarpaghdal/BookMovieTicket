const express = require('express')

const admindb = require('../model/adminmodel')
const admindata = require('../model/adminmodel')
const moviedata = require('../model/moviemodel')
const Mall = require('../model/mall');
const movieinmall = require('../model/movieinmall');
const Show = require('../model/show');

module.exports.index = (req, res)=>{
    return res.render('admin')
}

module.exports.adminlogin = (req, res) =>{
    return res.render('adminlogin')
}

module.exports.adminregister = (req, res) =>{
    return res.render('adminregister')
}

module.exports.addadmin = (req, res)=>{
    return res.render('addadmin')
}
module.exports.viewadmin =async (req, res)=>{
    // return res.render('viewadmin')
    let admindata = await admindb.find({})
    return res.render('viewadmin',{
        data:admindata
    })
}


module.exports.addmovie = (req, res)=>{
    return res.render('addmovie')
}
module.exports.addmoviee =async (req, res)=>{
  req.body.banner =moviedata.imagepath +'/'+ req.files.banner[0].filename
  req.body.poster = moviedata.imagepath + '/' +req.files.poster[0].filename

  let data = await moviedata.create(req.body)
  return res.redirect('back')
}
module.exports.viewmovie =async (req, res)=>{
    // return res.render('viewadmin')
    let data = await moviedata.find({})
    return res.render('viewmovie',{
        data:data
    })
}





module.exports.insertadmin = async (req,res) =>{
    // console.log(req.file)
    if(req.file)
    {
        req.body.avatar = admindb.imgpath + '/' + req.file.filename
    }
    let data = await admindb.create(req.body)
    return res.redirect('back')
}

module.exports.adminloginpage = (req, res) =>{
    return res.redirect('/admin')
}

module.exports.register = async (req, res) =>{
    let addadmin = await admindb.create(req.body)
    if (addadmin) {
        return res.redirect('back') 
    }
    else{
        console.log('cannot add admin')
        return res.redirect('back')
    }
}

module.exports.addMall= async(req,res)=>{
    return res.render('addmall')
}

module.exports.addMallinsert = async(req,res)=>{
    let addMall = await Mall.create(req.body);

    if (addMall) {
        return res.redirect('back');
    }
    console.log('Can not add Mall');
    return res.redirect('back');
}

module.exports.addMovieinmall = async(req,res)=>{
    let getMovie = await moviedata.find({});
    let getMall = await Mall.find({});
    return res.render('movieinmall',{
        movie: getMovie,
        mall: getMall
    })
}

module.exports.addMovieinMallinsert = async(req,res)=>{
    let addMovieonMall = await movieinmall.create(req.body);

    if (addMovieonMall) {
        return res.redirect('back');
    }
    console.log('Can not add Movie on Mall');
    return res.redirect('back');
}

module.exports.addShow = async(req,res)=>{
    let moviie = await moviedata.find({});
    return res.render('addShow', {
        data: moviie
    })
}

module.exports.moviedetailonshow = async(req,res)=>{


        let findMall = await movieinmall.find({
            movieid : req.body.movieId
        }).populate('mallid').exec()
    return res.render('malloption', {
        mall: findMall
    });
}

module.exports.addMovieShowinsert = async(req,res)=>{
    let findShow = await Show.find({
        $and: [
            { movieID: req.body.movieID },
            { mallID: req.body.mallID }
        ]
    });

    if (findShow?.length) {
        let addShow = await Show.findByIdAndUpdate(findShow[0].id, {
            $push: {
                time: req.body.time
            }
        });

        if (addShow) {
            return res.redirect('back');
        }
        console.log('Can not add time');
        return res.redirect('back')
    }
    else {
        let createShow = await Show.create(req.body);

        if (createShow) {
            return res.redirect('back');
        }
        console.log('Can not add');
        return res.redirect('back');
    }
}

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err)
        {
            console.log(err)
        }
        return  res.redirect('/admin/adminlogin')
    })
}