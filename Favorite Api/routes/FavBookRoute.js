const router = require('express').Router();
const {GetFavorite, AddFavorite, DeleteFavorite} = require('../controllers/FavBookController')
const {VerifyToken}= require('../middlewares/authToken')
router.get('/favbooks/:email',VerifyToken,GetFavorite)
router.post('/favbooks/addfavorite',VerifyToken,AddFavorite)
router.delete('/favbooks/:id',VerifyToken,DeleteFavorite)
module.exports = router