const mongoose = require('mongoose')

const photo = new mongoose.Schema({
    originalName:{type:String,default:""},
    name:{type:String,required:true},
    tags:[{type:String}],
    createdAt:{type:Date,default:Date.now(),immutable:true},
    updatedAt:{type:Date,default:Date.now()},
    fileData:{type:Buffer},
})

const photoModel = mongoose.model("photo",photo)

module.exports = photoModel