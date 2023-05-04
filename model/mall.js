const mongoose = require('mongoose');

const mallSchema = mongoose.Schema({
    mall :{
        type : String,
        required :true
    }
});


module.exports = mongoose.model('Mall',mallSchema);