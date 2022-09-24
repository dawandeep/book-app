const UserModel = require('../models/UserModel');
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local');
const randomstring = require("randomstring")
const nodemailer = require('nodemailer')
//for send verify mail
const sendVerifyMail=(name,email,user_id)=>{
    try {
     const transporter =  nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:"bookapp03@gmail.com",
            pass:"mluhogoeekjhgpzj"
        }
      });
      const mailOptions = {
        from:"bookapp03@gmail.com",
        to:email,
        subject:"For Verification mail",
        html: `<h3 style="color:blue">Welcome to the Book App</h3><p>Hii ${name}, Please click here to  <a href="http://localhost:3000/api/v1/auth/verify/${user_id}">Verify </a>your mail</p>`
     }
     transporter.sendMail(mailOptions,(err,info)=>{
         if(err)
         {
            console.log(err);
         }
         else{
            console.log("Email has been sent :-",info.response);
         }
     })
    }
    catch(error){
        console.log(error.message);
   }
}
//for send reset mail
const sendResetPasswordMail=(name,email,token)=>{
    try {
     const transporter =  nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:"bookapp03@gmail.com",
            pass:"mluhogoeekjhgpzj"
        }
      });
      const mailOptions = {
        from:"bookapp03@gmail.com",
        to:email,
        subject:"For Reset Password",
        html: `<h3 style="color:blue">Welcome to the Book App</h3><p>Hii ${name}, Please copy the link and <a href="http://localhost:3000/api/v1/auth/reset-password/${token}">reset your password.</a></p>`
     }
     transporter.sendMail(mailOptions,(err,info)=>{
         if(err)
         {
            console.log(err);
         }
         else{
            console.log("Email has been sent :-",info.response);
         }
     })
    }
    catch(error){
        console.log(error.message);
   }
}
const RegisterUser = (userdata,profile) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: userdata.email }, (err, user) => {
            if (user) {
                resolve({ status: 409, message: 'User with specified email already exists' });
            } else if (!user) {
                let usermodel = new UserModel();
                usermodel.firstname = userdata.firstname;
                usermodel.lastname = userdata.lastname;
                usermodel.city = userdata.city;
                usermodel.phone = userdata.phone;
                usermodel.email = userdata.email;
                usermodel.password = bcrypt.hashSync(userdata.password, 10);
                usermodel.image = profile
                usermodel.save((err) => {
                    if (!err) {
                        console.log(usermodel._id);
                        sendVerifyMail(userdata.firstname,userdata.email,usermodel._id);
                        resolve({ status: 200, message: 'User registered successfully and Please verify your mail id' });
                    } else {
                        throw err;
                    }
                });
            } else {
                reject(err);
            }
        });
    });
}
// Middleware for passportjs login
const LoginUser = () => {
    return new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function (username, password, done) {
        UserModel.findOne({ email: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect Email' });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, user);
        });
    });
}
const GetUser = (email) => {
    return new Promise((resolve,reject)=>{
      UserModel.findOne({'email':email},(err,data)=>{
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
const verifyMail = (id)=>{
    return new Promise((resolve,reject)=>{
    UserModel.updateOne({_id:id},{$set:{ is_verified:true}},(err,data)=>{
        if(!err){
          resolve({message:"Your mail is verified"})
        }
        else{
            reject(err)
        }
    })
})
}
const forgotPassword = (email)=>{
    return new Promise ((resolve,reject)=>{
           const randomString = randomstring.generate();
           UserModel.findOneAndUpdate({email:email},{$set:{token:randomString}},(err,data)=>{
             if(err){
              reject({status:400,message:err.message})   
            }
             else if(data){
                console.log(data.email);
                sendResetPasswordMail(data.firstname,data.email,randomString)
                resolve({status:200,message:"Please check your mail and reset your password"})
             }
             else{
                resolve({status:404,message:"This email does not exists"})
             }
           })
        })
    }
const reset_password = (token,password)=>{
    return new Promise(async(resolve,reject)=>{
        UserModel.findOne({token:token},(err,data)=>{
            if(!data){
                resolve({status:400,message:"The link has been expired"})
            }
            else if(data){
              const newpassword=bcrypt.hashSync(password, 10);
                UserModel.findByIdAndUpdate({_id:data._id},{$set:{password:newpassword,token:''}},(err,data)=>{
                    if(!err){
                        resolve({status:200,message:"User Password has been reset"})
                    }
                    else{
                        resolve=({status:400,message:"This link has been expired"})
                    }
                })
            }
          else{
                reject({status:400,message:err.message})
            }
        })
    })
}
function ChangePassword(id,user){
 return new Promise((resolve,reject)=>{
    console.log(user.password);
    UserModel.findOne({_id:id},(err,data)=>{
         console.log(data.password);
        if(!err){
            if(bcrypt.compareSync(user.password,data.password)){      
                if(bcrypt.compareSync(user.newpassword,data.password)){
                    resolve({status:400,message:"Your Old and New Password are same"})
                }
                else{
                UserModel.findOneAndUpdate({_id:id},{password: bcrypt.hashSync(user.newpassword,10) },(err,data)=>{
                    if(!err){
                        resolve({status:200,message:"Your Password Change Successfully"})
                    }
                    else{
                        reject(err);
                    }
                })
            }
            }
            else{
                reject({status:401,message:'Please check your current password'})
            }
        }
    })
 })
}
module.exports = {RegisterUser,LoginUser,GetUser,verifyMail,forgotPassword,reset_password,ChangePassword}