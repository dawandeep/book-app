const FavModel = require('../model/favoriteModel')
const {v4:uuidv4}= require('uuid')
const GetFavorite=(email)=>{
    return new Promise((resolve,reject)=>{
        FavModel.find({'email':email},(err,data)=>{
        if(!err)
        {
          resolve(data)
        }
        else{
            reject(err)
        }
    })
    })
}
const AddFavorite=(favbook)=>{
    return new Promise((resolve,reject)=>{
        FavModel.findOne({key:favbook.key,email:favbook.email},(err,data)=>{
            if(data){
                resolve({status:201,message:"This book is already added to your favourite"})
            }
            else{
            let newFavorite = new FavModel({
            _id:uuidv4(),
            coverImage:favbook.coverImage,
            title:favbook.title,
            key:favbook.key,
            email:favbook.email
           })
            newFavorite.save((err,data)=>{
                if(!err){
                    resolve({status:201,data,message:"Favorite Book Saved"})
                }
                else{
                    reject(err)
                }
            })
                }
        })
    })
}
const RemoveFavorite=(id)=>{
    return new Promise((resolve, reject) => {
        FavModel.deleteOne({ _id: id }, (err, data) => {
            if (!err) {
                if(data.deletedCount === 0){
                    reject({message:"Book is not found"},data)
                }
                else{
                resolve({message:"Book successfully deleted!",data});
                }
            } else {
                reject(err);
            }
        });
    });
}
module.exports={GetFavorite,AddFavorite,RemoveFavorite}