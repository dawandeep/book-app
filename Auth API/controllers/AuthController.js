const repo = require('../repository/UserRepository');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'this is my secret key for jsonwebtoken';
const RegisterUser = (req, res) => {
    let profile = (req.file) ? req.file.filename : null
    repo.RegisterUser(req.body,profile).then((data) => {
        res.send(data);
    }).catch((err)=>{
        res.status(404).send(err)
    });
}
const LoginUser = (req, res) =>{
    res.send({ status: 200, token: jwt.sign(req.session.passport, SECRET_KEY, { expiresIn: '1h' }) });
}
const VerifyToken = (req, res) =>{
    let result = jwt.verify(req.headers.authorization, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
    if (result instanceof Error) {
        res.send({ status: 401, isAuthenticated: false });
    } else {
        res.send({ status: 200, isAuthenticated: true });
    }
}
const GetUser =(req,res)=>{
    repo.GetUser(req.params.email)
    .then(data => {
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(404).send(err)
    })
}
const verifyMail=(req,res)=>{
    repo.verifyMail(req.params.id)
    .then(data =>{
        res.status(200).send(data)
    })
}
const forgotPassword=(req,res)=>{
    repo.forgotPassword(req.body.email)
    .then(data =>{
        res.send(data)
    })
}
const reset_password=(req,res)=>{
    repo.reset_password(req.params.token,req.body.password)
    .then(data =>{
        res.send(data)
    })
}
const ChangePassword=(req,res)=>{
    repo.ChangePassword(req.params.id,req.body)
    .then(data =>{
        res.status(200).send(data)
    }).catch(data =>{
        res.status(401).send(data);
    })
}
module.exports = { RegisterUser, LoginUser, VerifyToken,GetUser,verifyMail,forgotPassword,reset_password,ChangePassword}