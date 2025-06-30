const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    Email:{type:String, required:true},
    Password:{type:String, required:true},
    Name:{type:String, required:true},
    PhoneNumber:{type:Number, required:true},
    Age:{type:Number, required:true},
},{
    timestamps:true,
})

module.exports = mongoose.model('user', createSchema);