
const mongoose = require('mongoose')


const userschima = mongoose.Schema({
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

})


const user = mongoose.model('user',userschima)
module.exports = user