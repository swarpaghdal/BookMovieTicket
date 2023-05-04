
const mongoose = require('mongoose')

const multer = require('multer')

const path = require('path')

const imagepath = ('/img/admin')

const adminschima = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require:true
    },
    avatar:{
        type:String,
        
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

adminschima.statics.uplodephoto = multer({storage:storade}).single('avatar')

adminschima.statics.imgpath = imagepath

const admindata = mongoose.model('admin',adminschima)
module.exports = admindata