const mongoose = require('mongoose')

const multer = require('multer')

const path = require('path')

const imagepath = ('/img/movie')



const movieschima = mongoose.Schema({

    moviename:{
        type: String,
        require: true
    },
    launge:{
        type: String,
        require: true
    },
    movieprice:{
        type: String,
        require: true
    },
    movietype:{
        type: String,
        require: true
    },
    runtime:{
        type: String,
        require: true
    },
    screen:{
        type: String,
        require: true
    },
    banner:{
        type: String,
        require: true
    },
    poster:{
        type: String,
        require: true
    },
    runtime:{
        type: String,
        require: true
    },

})



const storade = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, path.join(__dirname,'../assets',imagepath))
    },
    filename:(req, file, cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

const  storage = multer({storage : storade}).fields([
    {
        name:'banner'
    },
    {
        name:'poster'
    }
])

movieschima.statics.uplodemultiimage = storage
movieschima.statics.imagepath = imagepath

const movie = mongoose.model('movie',movieschima)

module.exports = movie 