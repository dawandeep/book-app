const router = require('express').Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname)

    }
})
const upload = multer({storage:storage})
const passport = require('passport');
const { RegisterUser, LoginUser, VerifyToken, GetUser, verifyMail, forgotPassword, reset_password, ChangePassword } = require('../controllers/AuthController');
router.post('/register',upload.single('myFile'),RegisterUser);
router.post('/isAuthenticated', VerifyToken);
router.post('/login', passport.authenticate('local'), LoginUser);
router.get('/user/:email',GetUser)
router.get('/verify/:id',verifyMail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',reset_password)
router.put('/change-password/:id',ChangePassword)
module.exports = router;


