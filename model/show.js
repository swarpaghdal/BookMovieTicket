const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
    movieID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie',
        required :true
    },
    mallID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Mall',
        required :true
    },
    time :{
        type : Array,
        required : true
    }
});


module.exports = mongoose.model('Show',showSchema);