const mongoose = require('mongoose')
const Movie = require('./Movie')
const showSchema = mongoose.Schema({
    movie : {
        type : mongoose.Types.ObjectId,
        ref : 'Movie',
        required : true
    },
    showDate : {
        type : Date,
        required : true
    },
    seats : {
        type : [],
        require : true
    }
})

module.exports = mongoose.model('Show',showSchema)