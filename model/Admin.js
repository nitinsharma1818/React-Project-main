const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const AdminSchema = new mongoose.Schema({
    adminName : {
        type : String,
        required : false
    },
    adminEmail : {
        type : String,
        lowercase :true,
        required : true
    },
    adminPassword : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'admin',
        required : false
    }
})

AdminSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({ id:this._id, role : this.role },process.env.SECRET_KEY,{
        expiresIn:'30m',
    });
}

module.exports = mongoose.model('Admin',AdminSchema)