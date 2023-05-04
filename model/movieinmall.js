const mongoose = require('mongoose');

const mallSchema = mongoose.Schema({
    movieid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie',
        required :true
    },
    mallid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Mall',
        required :true
    }
});


module.exports = mongoose.model('movieinmall',mallSchema);