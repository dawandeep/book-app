const mongoose = require('mongoose')
const FavoriteSchema = mongoose.Schema({
    _id:{
       type:String,
       required:true
    },
    coverImage:{
        type:Number,
        required:false
    },
    title:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model('FavModel',FavoriteSchema,'favbooks')