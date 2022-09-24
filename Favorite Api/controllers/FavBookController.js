const repo = require ('../Repository/favoriteRepo')
const GetFavorite=(req,res)=>{
    repo.GetFavorite(req.params.email).then(data=>{
        res.status(200).send(data);
    })
}
const AddFavorite=(req,res)=>{
    repo.AddFavorite(req.body).then(data=>{
        res.status(201).send(data)
    }).catch((err)=>{
        res.status(404).send(err);
    })
}
const DeleteFavorite=(req,res)=>{
    repo.RemoveFavorite(req.params.id).then(data =>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(404).send(err)
    })
}
module.exports = {GetFavorite,AddFavorite,DeleteFavorite}